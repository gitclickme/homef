"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepo_1 = __importDefault(require("../repo/userRepo"));
class UserService {
    async getAllUsers() {
        try {
            const users = await userRepo_1.default.getAllUsers();
            return users;
        }
        catch (error) {
            throw new Error('Failed to fetch all users');
        }
    }
    async getUserById(id) {
        try {
            const user = await userRepo_1.default.getUserById(id);
            if (user) {
                console.info(`UserService: Successfully fetched user by ID: ${id}`);
            }
            else {
                console.warn(`UserService: User with ID: ${id} not found.`);
            }
            return user;
        }
        catch (error) {
            console.error(`UserService: Failed to fetch user by ID ${id}: ${error.message}`);
            throw new Error('Failed to fetch user by ID');
        }
    }
    async createUser(userData) {
        if (!userData.name || !userData.email || !userData.password) {
            console.warn('UserService: Attempted to create user without required fields (name, email, password).');
            throw new Error('User name, email, and password are required.');
        }
        try {
            const newUser = await userRepo_1.default.createUser(userData);
            console.info(`UserService: Successfully created new user with email: ${newUser.email}`);
            return newUser;
        }
        catch (error) {
            console.error(`UserService: Failed to create user with email ${userData.email}: ${error.message}`);
            throw new Error('Failed to create user');
        }
    }
    async updateUser(id, userData) {
        if (!id) {
            console.warn('UserService: Attempted to update user without providing an ID.');
            throw new Error('User ID is required for update.');
        }
        try {
            const updated = await userRepo_1.default.updateUser(id, userData);
            if (updated) {
                console.info(`UserService: Successfully updated user with ID: ${id}`);
            }
            else {
                console.warn(`UserService: User with ID: ${id} not found or no changes made during update.`);
            }
            return updated;
        }
        catch (error) {
            console.error(`UserService: Failed to update user with ID ${id}: ${error.message}`);
            throw new Error('Failed to update user');
        }
    }
    async deleteUser(id) {
        if (!id) {
            console.warn('UserService: Attempted to delete user without providing an ID.');
            throw new Error('User ID is required for deletion.');
        }
        try {
            const deleted = await userRepo_1.default.deleteUser(id);
            if (deleted) {
                console.info(`UserService: Successfully deleted user with ID: ${id}`);
            }
            else {
                console.warn(`UserService: User with ID: ${id} not found during deletion.`);
            }
            return deleted;
        }
        catch (error) {
            console.error(`UserService: Failed to delete user with ID ${id}: ${error.message}`);
            throw new Error('Failed to delete user');
        }
    }
}
exports.default = UserService;
