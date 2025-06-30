import pandas as pd
from collections import defaultdict
import os


"""------------------------section 1------------------------------"""

#
# def load_and_validate_series(file_path):
#     """
#     קורא את קובץ סדרת הזמן, מבצע בדיקות וניקוי נתונים.
#
#     :param file_path: הנתיב לקובץ CSV.
#     :return: DataFrame נקי לאחר בדיקות.
#     """
#
#     # קריאת הקובץ תוך ניסיון להמיר את timestamp לזמן אמיתי
#     df = pd.read_csv(file_path)
#
#     # ניסיון להמיר את העמודה timestamp לתבנית datetime
#     try:
#         df['timestamp'] = pd.to_datetime(df['timestamp'], dayfirst=True)
#     except Exception as e:
#         raise ValueError(f"שגיאה בהמרת תאריכים: {e}")
#
#     # הסרת כפילויות מוחלטות
#     df = df.drop_duplicates()
#
#     # בדיקה נוספת: הסרת שורות עם ערכים חסרים
#     df = df.dropna(subset=['timestamp', 'value'])
#
#     # בדיקה נוספת: ודא שהעמודה value היא מספרית
#     df['value'] = pd.to_numeric(df['value'], errors='coerce')
#     df = df.dropna(subset=['value'])
#
#     return df
#

"""------------------------section 2------------------------------"""


def compute_hourly_averages(df):
    """
    מקבל DataFrame עם עמודות timestamp ו־value,
    ומחזיר טבלת ממוצעים שעתיים לפי תאריך ושעה.

    :param df: DataFrame נקי לאחר בדיקות
    :return: DataFrame חדש עם ממוצעים שעתיים
    """
    # df = load_and_validate_series(file_path)

    # קובעים את העמודה timestamp כאינדקס לזמן
    df = df.set_index('timestamp')

    # קבוצות לפי שעה (לפי זמן עגול)
    hourly_avg = df.resample('H').mean().reset_index()

    # הוספת עמודה של 'תאריך התחלה' רק אם נדרש בפלט הסופי
    hourly_avg['StartTime'] = hourly_avg['timestamp'].dt.strftime('%H:%M:%S %Y-%m-%d')

    # סידור מחדש של העמודות
    result = hourly_avg[['value', 'StartTime']].rename(columns={'value': 'Average'})

    return result


def compute_hourly_averages_by_chunks(df):
    """
    מממש פתרון לחישוב ממוצעים שעתיים בנתונים מרובים
    על ידי פיצול לפי טווחי זמן (כל יומיים), עיבוד בנפרד ואיחוד תוצאות.

    :param file_path: נתיב לקובץ המקורי (CSV).
    :return: DataFrame מאוחד של ממוצעים שעתיים.
    """

    #  מיון לפי זמן (למקרה שלא ממויין)
    df = df.sort_values(by='timestamp')

    #  קביעה של timestamp כאינדקס
    df = df.set_index('timestamp')

    # חלוקה לקטעים של יומיים
    chunks = df.groupby(pd.Grouper(freq='2D'))

    # נחשב ממוצעים לכל חלק בנפרד
    all_results = []
    for _, chunk in chunks:
        if not chunk.empty:
            hourly = compute_hourly_averages(chunk.reset_index())
            all_results.append(hourly)

    #  איחוד התוצאות
    final_df = pd.concat(all_results, ignore_index=True)

    return final_df


"""------------------------section 3------------------------------"""

STATS_FILE = "stream_hourly_avg.csv"
hourly_stats = defaultdict(lambda: [0.0, 0])


def load_existing_stats():
    """
    טוען נתונים קיימים מהקובץ (אם יש) אל תוך hourly_stats.
    """
    if os.path.exists(STATS_FILE):
        df = pd.read_csv(STATS_FILE)
        for _, row in df.iterrows():
            hour = pd.to_datetime(row['StartTime'])
            total = float(row['Sum'])
            count = int(row['Count'])
            hourly_stats[hour] = [total, count]


def process_new_record(timestamp_str, value):
    """
    מקבל רשומת זמן חדשה ומעדכן את הנתונים לשעה הרלוונטית.
    """
    timestamp = pd.to_datetime(timestamp_str)
    hour_key = timestamp.replace(minute=0, second=0, microsecond=0)
    hourly_stats[hour_key][0] += value
    hourly_stats[hour_key][1] += 1


def save_stats_to_file():
    """
    שומר את נתוני השעה, הסכום, הכמות והממוצע לקובץ CSV.
    """
    data = []
    for hour, (total, count) in sorted(hourly_stats.items()):
        avg = round(total / count, 2) if count else 0
        data.append({
            'StartTime': hour.strftime('%Y-%m-%d %H:%M:%S'),
            'Sum': total,
            'Count': count,
            'Average': avg
        })
    pd.DataFrame(data).to_csv(STATS_FILE, index=False, encoding='utf-8-sig')


"""------------------------section 4------------------------------"""


def load_and_validate_series(file_path):
    """
    קורא קובץ סדרת זמן (CSV או Parquet), מבצע בדיקות וניקוי נתונים.

    :param file_path: הנתיב לקובץ CSV או Parquet.
    :return: DataFrame נקי לאחר בדיקות.
    """
    # זיהוי סוג הקובץ לפי סיומת
    if file_path.endswith(".parquet"):
        df = pd.read_parquet(file_path)
    elif file_path.endswith(".csv"):
        df = pd.read_csv(file_path, encoding="ISO-8859-8")
    else:
        raise ValueError("Unsupported file format. Please use CSV or Parquet.")

    # ניסיון להמיר את העמודה timestamp לתבנית datetime
    try:
        df['timestamp'] = pd.to_datetime(df['timestamp'], dayfirst=True)
    except Exception as e:
        raise ValueError(f"שגיאה בהמרת תאריכים: {e}")

    # הסרת כפילויות מוחלטות
    df = df.drop_duplicates()

    # הסרת שורות עם ערכים חסרים
    df = df.dropna(subset=['timestamp', 'value'])

    # ודא שהעמודה value היא מספרית
    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    df = df.dropna(subset=['value'])

    return df


"""
---------------------------------------------------------
יתרונות פורמט Parquet (בהשוואה ל־CSV):

- יעילות: גישה עמודתית שמאפשרת קריאה וכתיבה מהירה יותר.
- חיסכון בנפח: כולל דחיסה פנימית, מה שחוסך מקום אחסון.
- טיפוסי נתונים: שומר את הסוגים (מספרים, תאריכים וכו'), ולכן הטעינה מדויקת יותר.
- תמיכה בטעינה חלקית: אפשר לטעון רק עמודות או טווחי זמן מסוימים.
- תאימות גבוהה: נתמך במערכות עיבוד נתונים גדולות ובספריות פייתון נפוצות.

---------------------------------------------------------
"""


if __name__ == '__main__':
    df1 = load_and_validate_series("time_series.csv")
    df2 = load_and_validate_series("time_series.parquet")
    print(compute_hourly_averages(df1))
    print(compute_hourly_averages_by_chunks(df2))

    load_existing_stats()
    records = [
        ("2025-06-25 21:15:00", 10.0),
        ("2025-06-25 21:47:00", 20.0),
        ("2025-06-25 23:02:00", 5.0),
        ("2025-06-25 23:45:00", 7.0)
    ]
    for ts, val in records:
        process_new_record(ts, val)
    save_stats_to_file()
