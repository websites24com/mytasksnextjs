// app/api/auth/register/route.ts

import { db } from '@/app/lib/db'; // MySQL connection pool
import bcrypt from 'bcrypt'; // To hash the password
import { NextResponse } from 'next/server'; // To send HTTP responses
import type { UserRow } from '@/app/lib/types'; // Type for user rows

// ✅ This is the required HTTP method export for App Router
export async function POST(request: Request) {
  try {
    // Parse the request body JSON into a JavaScript object
    const body = await request.json();
    const { email, password } = body;

    // Validate input: make sure both fields are present
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Check if a user already exists with this email
    const [existing] = await db.query<UserRow[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      // A user already exists with this email → return conflict
      return NextResponse.json(
        { error: 'User already exists.' },
        { status: 409 }
      );
    }

    // Hash the password using bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user to the database
    await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    // Return success response
    return NextResponse.json(
      { message: 'Registration successful. You can now log in.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Server error during registration.' },
      { status: 500 }
    );
  }
}
