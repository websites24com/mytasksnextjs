// This file defines a TypeScript interface for one user row
// It helps TypeScript know what shape your DB rows have

import { RowDataPacket } from 'mysql2';

// The interface describes a user as stored in MySQL
export interface UserRow extends RowDataPacket {
  id: number;            // Primary key
  email: string;         // User's email
  password: string;      // Hashed password
}
