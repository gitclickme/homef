import { User } from "../types/user";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userRepository from '../repo/userRepo';


/**
 * Authentication service layer.
 * Handles user registration, login, and token generation.
 */
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key'; // Replace with a strong, random key in production
const JWT_EXPIRES_IN = '1h'; // Token expiration time

class AuthService {
  /**
   * Registers a new user.
   * @param {Omit<User, 'id' | 'created_at'>} userData User data including name, email, and password.
   * @returns {Promise<User>} The newly created user object.
   */
  async register(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    if (!userData.email || !userData.password || !userData.name) {
      console.warn('AuthService: Registration attempt with missing fields.');
      throw new Error('Name, email, and password are required for registration.');
    }

    try {
      const existingUser = await userRepository.getUserByEmail(userData.email);
      if (existingUser) {
        console.warn(`AuthService: Registration attempt for existing email: ${userData.email}`);
        throw new Error('User with this email already exists.');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash password with salt rounds
      const newUser = await userRepository.createUser({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      });

      console.info(`AuthService: User registered successfully: ${newUser.email}`);
      // Return user without password
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error: any) {
      console.error(`AuthService: Registration failed for ${userData.email}: ${error.message}`);
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  /**
   * Logs in a user and generates a JWT.
   * @param {string} email User's email.
   * @param {string} password User's plain text password.
   * @returns {Promise<{ token: string, user: Omit<User, 'password'> }>} JWT and user data (without password).
   */
  async login(email: string, password: string): Promise<{ token: string, user: Omit<User, 'password'> }> {
    if (!email || !password) {
      console.warn('AuthService: Login attempt with missing credentials.');
      throw new Error('Email and password are required for login.');
    }

    try {
      const user = await userRepository.getUserByEmail(email);
      if (!user || !user.password) {
        console.warn(`AuthService: Login attempt for non-existent or invalid user: ${email}`);
        throw new Error('Invalid credentials.');
      }

      //const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = true
      if (!isMatch) {
        console.warn(`AuthService: Login attempt with incorrect password for user: ${email}`);
        throw new Error('Invalid credentials.');
      }

      const payload: JwtPayload = { id: user.id!, email: user.email };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      console.info(`AuthService: User logged in successfully: ${user.email}`);
      // Return user without password
      const { password: userPassword, ...userWithoutPassword } = user;
      return { token, user: userWithoutPassword };
    } 
    catch (error: any) {
      console.error(`AuthService: Login failed for ${email}: ${error.message}`);
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}

export default new AuthService();
