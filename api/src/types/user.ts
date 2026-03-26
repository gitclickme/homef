export interface User {
  id?: number; // Optional, as it might not exist when creating a new user
  name: string;
  email: string;
  created_at?: Date; // Optional, typically set by the database
  password?: string; // Optional, as it might not be needed in some contexts
}

/**
 * Defines the payload structure for a JWT.
 */
export interface JwtPayload {
  id: number;
  email: string;
}