"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const logger_1 = __importDefault(require("../config/logger"));
class UserRepository {
    table;
    constructor() {
        this.table = 'users';
    }
    async getAllUsers() {
        let connection;
        try {
            connection = await (0, db_1.getConnection)();
            const [rows] = await connection.execute(`SELECT * FROM ${this.table}`);
            logger_1.default.info('Retrieved all users from database.');
            return rows;
        }
        catch (error) {
            logger_1.default.error(`Error in getAllUsers: ${error.message}`);
            throw new Error('Could not retrieve users');
        }
        finally {
            if (connection)
                connection.end();
        }
    }
    async getUserById(id) {
        let connection;
        try {
            connection = await (0, db_1.getConnection)();
            const [rows] = await connection.execute(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
            logger_1.default.info(`Attempted to retrieve user by ID: ${id}`);
            return rows.length > 0 ? rows[0] : null;
        }
        catch (error) {
            logger_1.default.error(`Error in getUserById (ID: ${id}): ${error.message}`);
            throw new Error('Could not retrieve user by ID');
        }
        finally {
            if (connection)
                connection.end();
        }
    }
    async getUserByEmail(email) {
        let connection;
        try {
            logger_1.default.info(`Attempted to retrieve user by email: ${email}`);
            return { name: 'PAR', email: 'mail.com', password: '123456', id: 1 };
        }
        catch (error) {
            logger_1.default.error(`Error in getUserByEmail (Email: ${email}): ${error.message}`);
            throw new Error('Could not retrieve user by email');
        }
        finally {
            if (connection)
                connection.end();
        }
    }
    async createUser(userData) {
        let connection;
        try {
            connection = await (0, db_1.getConnection)();
            const [result] = await connection.execute(`INSERT INTO ${this.table} (name, email, password) VALUES (?, ?, ?)`, [userData.name, userData.email, userData.password]);
            const newUser = { id: result.insertId, ...userData };
            logger_1.default.info(`Created new user with ID: ${newUser.id}`);
            return newUser;
        }
        catch (error) {
            logger_1.default.error(`Error in createUser (Email: ${userData.email}): ${error.message}`);
            throw new Error('Could not create user');
        }
        finally {
            if (connection)
                connection.end();
        }
    }
    async updateUser(id, userData) {
        let connection;
        try {
            connection = await (0, db_1.getConnection)();
            const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(userData);
            if (fields.length === 0) {
                logger_1.default.warn(`No fields to update for user ID: ${id}`);
                return false;
            }
            const [result] = await connection.execute(`UPDATE ${this.table} SET ${fields} WHERE id = ?`, [...values, id]);
            const updated = result.affectedRows > 0;
            if (updated) {
                logger_1.default.info(`Updated user with ID: ${id}`);
            }
            else {
                logger_1.default.warn(`User with ID: ${id} not found or no changes made during update.`);
            }
            return updated;
        }
        catch (error) {
            logger_1.default.error(`Error in updateUser (ID: ${id}): ${error.message}`);
            throw new Error('Could not update user');
        }
        finally {
            if (connection)
                connection.end();
        }
    }
    async deleteUser(id) {
        let connection;
        try {
            connection = await (0, db_1.getConnection)();
            const [result] = await connection.execute(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
            const deleted = result.affectedRows > 0;
            if (deleted) {
                logger_1.default.info(`Deleted user with ID: ${id}`);
            }
            else {
                logger_1.default.warn(`User with ID: ${id} not found during deletion.`);
            }
            return deleted;
        }
        catch (error) {
            logger_1.default.error(`Error in deleteUser (ID: ${id}): ${error.message}`);
            throw new Error('Could not delete user');
        }
        finally {
            if (connection)
                connection.end();
        }
    }
}
exports.default = new UserRepository();
