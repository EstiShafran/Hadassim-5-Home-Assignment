from collections import Counter


def find_the_n_most_common_errors(file_path, n):
    """
    סופר את קודי השגיאה בקובץ גדול באמצעות פיצול לחלקים בזיכרון בלבד.

    :param file_path: נתיב לקובץ הלוג הגדול.
    :param n: מספר קודי השגיאה השכיחים ביותר להחזיר.
    :return: רשימה של זוגות (קוד שגיאה, שכיחות), ממויינת מהשכיח ביותר.
     סיבוכיות זמן:
        O(L + E log E)
        כאשר:
            L - מספר השורות בקובץ הלוג
            E - מספר קודי השגיאה הייחודיים (שונות בקובץ)

    סיבוכיות מקום (זיכרון):
        O(E + B)
        כאשר:
            E - מספר קודי השגיאה הייחודיים
            B - מספר השורות בכל חלק (chunk) שנשמרים זמנית בזיכרון, לדוגמה 100,000
    """
    lines_per_chunk = 100000  # גודל כל חלק (למשל: 100 אלף שורות)
    total_count = Counter()
    current_lines = []

    with open(file_path, "r") as f:
        for i, line in enumerate(f, start=1):
            current_lines.append(line.strip().strip('"'))
            if i % lines_per_chunk == 0:
                total_count.update(process_chunk(current_lines))
                current_lines = []

        # עיבוד החלק האחרון אם נשארו שורות
        if current_lines:
            total_count.update(process_chunk(current_lines))

    return total_count.most_common(n)


def process_chunk(lines):
    """
    מקבל רשימת שורות, ומחזיר Counter עם שכיחויות קודי השגיאה.
    """
    errors = []
    for line in lines:
        if "Error: " in line:
            parts = line.split("Error: ")
            if len(parts) == 2:
                error = parts[1].strip()
                errors.append(error)
    return Counter(errors)


if __name__ == '__main__':
    results = find_the_n_most_common_errors("logs1.txt", 5)
    for code, count in results:
        print(f"{code}: {count}")
