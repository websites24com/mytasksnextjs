import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {

    try { 

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({message: 'Email and password requried'}, {status: 400})
        }

        // Check if user exists 

        const [rows] = await db.query('SELECT id FROM users WHERE email = ?' , [email]);

        if ((rows as any[]).length > 0 ) {
            return NextResponse.json({message: 'User already exists'}), {status:409}
        }

        // Hash password

        const hashed = await bcrypt.hash(password, 10)

        // Save new user

        await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed])

        return NextResponse.json({message: 'User registered successfully'}, {status: 201})

    } catch(err) {
        console.log('Registration error:', err)
        return NextResponse.json({message: 'Server error'}, {status:500})

    }
}