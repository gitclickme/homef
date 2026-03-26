// File: src/repository/userRepository.ts
import { Connection, QueryResult } from 'mysql2/promise';
import { getConnection } from '../config/db';
import { User } from '../types/user';
import logger from '../config/logger';

/**
 * Repository layer for user-related database operations.
 * This layer directly interacts with the database.
 */
class UserRepository {
  private table: string;

  constructor() {
    this.table = 'users'; // Assuming a 'users' table in your database
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<User[]>} A promise that resolves to an array of user objects.
   */
  async getAllUsers(): Promise<User[]> {
    let connection: Connection | undefined;
    try {
      connection = await getConnection();
      const [rows] = await connection.execute(`SELECT * FROM ${this.table}`);
      logger.info('Retrieved all users from database.');
      return rows as User[];
    } catch (error: any) {
      logger.error(`Error in getAllUsers: ${error.message}`);
      throw new Error('Could not retrieve users');
    } finally {
      if (connection) connection.end(); // Close the connection
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {number} id The ID of the user to retrieve.
   * @returns {Promise<User | null>} A promise that resolves to the user object or null if not found.
   */
  async getUserById(id: number): Promise<User | null> {
    let connection: Connection | undefined;
    try {
      connection = await getConnection();
      const [rows] = await connection.execute(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
      logger.info(`Attempted to retrieve user by ID: ${id}`);
      return (rows as User[]).length > 0 ? (rows as User[])[0] : null;
    } catch (error: any) {
      logger.error(`Error in getUserById (ID: ${id}): ${error.message}`);
      throw new Error('Could not retrieve user by ID');
    } finally {
      if (connection) connection.end();
    }
  }

  /**
   * Retrieves a user by their email address.
   * @param {string} email The email of the user to retrieve.
   * @returns {Promise<User | null>} A promise that resolves to the user object or null if not found.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    let connection: Connection | undefined;
    try {
      //connection = await getConnection();
      //const [rows] = await connection.execute(`SELECT * FROM ${this.table} WHERE email = ?`, [email]);
      logger.info(`Attempted to retrieve user by email: ${email}`);
      // return (rows as User[]).length > 0 ? (rows as User[])[0] : null;
      return { name:'PAR', email:'mail.com', password:'123456', id:1 }
    } 
    catch (error: any) {
      logger.error(`Error in getUserByEmail (Email: ${email}): ${error.message}`);
      throw new Error('Could not retrieve user by email');
    } 
    finally {
      if (connection) connection.end();
    }
  }

  /**
   * Creates a new user in the database.
   * @param {Omit<User, 'id' | 'created_at'>} userData The user data to create (e.g., { name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' }).
   * @returns {Promise<User>} A promise that resolves to the created user object (with ID).
   */
  async createUser(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    let connection: Connection | undefined;
    try {
      connection = await getConnection();
      const [result] = await connection.execute(
        `INSERT INTO ${this.table} (name, email, password) VALUES (?, ?, ?)`, // Adjust columns as per your table schema
        [userData.name, userData.email, userData.password]
      );
      // @ts-ignore - insertId is present on OkPacketHeader
      const newUser = { id: result.insertId, ...userData };
      logger.info(`Created new user with ID: ${newUser.id}`);
      return newUser;
    } catch (error: any) {
      logger.error(`Error in createUser (Email: ${userData.email}): ${error.message}`);
      throw new Error('Could not create user');
    } finally {
      if (connection) connection.end();
    }
  }

  /**
   * Updates an existing user in the database.
   * @param {number} id The ID of the user to update.
   * @param {Partial<Omit<User, 'id' | 'created_at'>>} userData The new user data.
   * @returns {Promise<boolean>} A promise that resolves to true if updated, false otherwise.
   */
  async updateUser(id: number, userData: Partial<Omit<User, 'id' | 'created_at'>>): Promise<boolean> {
    let connection: Connection | undefined;
    try {
      connection = await getConnection();
      // Dynamically build the SET clause for update
      const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(userData);

      if (fields.length === 0) {
        logger.warn(`No fields to update for user ID: ${id}`);
        return false; // No fields to update
      }

      const [result] = await connection.execute(
        `UPDATE ${this.table} SET ${fields} WHERE id = ?`,
        [...values, id]
      );
      // @ts-ignore - affectedRows is present on OkPacketHeader
      const updated = result.affectedRows > 0;
      if (updated) {
        logger.info(`Updated user with ID: ${id}`);
      } else {
        logger.warn(`User with ID: ${id} not found or no changes made during update.`);
      }
      return updated;
    } catch (error: any) {
      logger.error(`Error in updateUser (ID: ${id}): ${error.message}`);
      throw new Error('Could not update user');
    } finally {
      if (connection) connection.end();
    }
  }

  /**
   * Deletes a user from the database.
   * @param {number} id The ID of the user to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if deleted, false otherwise.
   */
  async deleteUser(id: number): Promise<boolean> {
    let connection: Connection | undefined;
    try {
      connection = await getConnection();
      const [result] = await connection.execute(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
      // @ts-ignore - affectedRows is present on OkPacketHeader
      const deleted = result.affectedRows > 0;
      if (deleted) {
        logger.info(`Deleted user with ID: ${id}`);
      } else {
        logger.warn(`User with ID: ${id} not found during deletion.`);
      }
      return deleted;
    } catch (error: any) {
      logger.error(`Error in deleteUser (ID: ${id}): ${error.message}`);
      throw new Error('Could not delete user');
    } finally {
      if (connection) connection.end();
    }
  }
}

export default new UserRepository();