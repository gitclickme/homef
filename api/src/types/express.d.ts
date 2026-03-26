// File: src/types/express.d.ts
// This file augments the Express Request interface to provide strong typing for req.body and req.user.

// Import the Request type from Express
import { Request } from 'express';
import { User, JwtPayload } from './user'; // Import your User and JwtPayload interfaces

// Declare module augmentation for 'express'
declare module 'express' {
  // Extend the Request interface
  interface Request {
    // For POST /api/users (create user)
    // For POST /api/auth/register (register user)
    // For PUT /api/users/:id (update user)
    body: {
      name?: string;
      email?: string;
      password?: string;
    } | Partial<Omit<User, 'id' | 'created_at'>>;

    // Add a 'user' property to the Request object, which will be populated by authMiddleware
    user?: JwtPayload;
  }
}