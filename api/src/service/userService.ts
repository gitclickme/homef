
import userRepository from '../repo/userRepo';
import { User } from '../types/user';


/**
 * Service layer for user-related business logic.
 * This layer orchestrates operations, potentially involving multiple repositories
 * or complex business rules, and interacts with the repository layer.
 */
class UserService {
  /**
   * Fetches all users.
   * @returns {Promise<User[]>}   A promise that resolves to an array of user objects.
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await userRepository.getAllUsers();
      return users;
    } catch (error: any) {
      //console.error('Error in UserService.getAllUsers:', error.message);
      throw new Error('Failed to fetch all users');
    }
  }

    /**
   * Fetches a single user by ID.
   * @param {number} id The ID of the user.
   * @returns {Promise<User | null>} A promise that resolves to the user object or null.
   */
  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await userRepository.getUserById(id);
      if (user) {
        console.info(`UserService: Successfully fetched user by ID: ${id}`);
      } else {
        console.warn(`UserService: User with ID: ${id} not found.`);
      }
      return user;
    } catch (error: any) {
      console.error(`UserService: Failed to fetch user by ID ${id}: ${error.message}`);
      throw new Error('Failed to fetch user by ID');
    }
  }

/**
   * Creates a new user.
   * @param {Omit<User, 'id' | 'created_at'>} userData The data for the new user.
   * @returns {Promise<User>} A promise that resolves to the created user object.
   */
  async createUser(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    // Add any business logic/validation here before saving to DB
    if (!userData.name || !userData.email || !userData.password) {
      console.warn('UserService: Attempted to create user without required fields (name, email, password).');
      throw new Error('User name, email, and password are required.');
    }
    try {
      const newUser = await userRepository.createUser(userData);
      console.info(`UserService: Successfully created new user with email: ${newUser.email}`);
      return newUser;
    } catch (error: any) {
      console.error(`UserService: Failed to create user with email ${userData.email}: ${error.message}`);
      throw new Error('Failed to create user');
    }
  }

  /**
   * Updates an existing user.
   * @param {number} id The ID of the user to update.
   * @param {Partial<Omit<User, 'id' | 'created_at'>>} userData The new data for the user.
   * @returns {Promise<boolean>} A promise that resolves to true if updated, false otherwise.
   */
  async updateUser(id: number, userData: Partial<Omit<User, 'id' | 'created_at'>>): Promise<boolean> {
    // Add any business logic/validation here
    if (!id) {
      console.warn('UserService: Attempted to update user without providing an ID.');
      throw new Error('User ID is required for update.');
    }
    try {
      const updated = await userRepository.updateUser(id, userData);
      if (updated) {
        console.info(`UserService: Successfully updated user with ID: ${id}`);
      } else {
        console.warn(`UserService: User with ID: ${id} not found or no changes made during update.`);
      }
      return updated;
    } catch (error: any) {
      console.error(`UserService: Failed to update user with ID ${id}: ${error.message}`);
      throw new Error('Failed to update user');
    }
  }

  /**
   * Deletes a user.
   * @param {number} id The ID of the user to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if deleted, false otherwise.
   */
  async deleteUser(id: number): Promise<boolean> {
    if (!id) {
      console.warn('UserService: Attempted to delete user without providing an ID.');
      throw new Error('User ID is required for deletion.');
    }
    try {
      const deleted = await userRepository.deleteUser(id);
      if (deleted) {
        console.info(`UserService: Successfully deleted user with ID: ${id}`);
      } else {
        console.warn(`UserService: User with ID: ${id} not found during deletion.`);
      }
      return deleted;
    } catch (error: any) {
      console.error(`UserService: Failed to delete user with ID ${id}: ${error.message}`);
      throw new Error('Failed to delete user');
    }
  }
}

// Export the class, not an instance
export default UserService;