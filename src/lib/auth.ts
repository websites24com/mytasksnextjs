import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

/**
 * Get a user by email from the database.
 */
export async function getUserByEmail(email: string) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = (rows as any)[0];
  return user || null;
}

/**
 * Compare a plain password with a hashed password.
 */
export async function validatePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
