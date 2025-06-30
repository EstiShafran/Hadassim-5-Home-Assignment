import bcrypt from 'bcryptjs';

async function generateHashedPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Original password: ${password}`);
        console.log(`Hashed password: ${hashedPassword}`);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}

// שנה את הסיסמה כאן לסיסמה שאת רוצה לגבב
generateHashedPassword("hadasim2025!");