import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
export async function POST(req: Request) {
    const {email, password } = await req.json();
    
    if (!email || !password) {
        return  NextResponse.json({error: "Missing email or password"}, {status:400});
    }

    // Check if user already exists

    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email] );
    const existingUser = (rows as any[])[0];


    if(existingUser) {
        return NextResponse.json({error: 'User already exists'}, {status: 400})
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user

     await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    return NextResponse.json({success:true, message: 'User registered successfully'});
}