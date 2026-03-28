"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
exports.closeConnection = closeConnection;
exports.callSP = callSP;
exports.callSPNoParam = callSPNoParam;
exports.executeQuery = executeQuery;
exports.testConnection = testConnection;
const promise_1 = __importDefault(require("mysql2/promise"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("./config"));
async function getConnection() {
    try {
        const connection = await promise_1.default.createConnection(config_1.default.dbConfig);
        return connection;
    }
    catch (error) {
        console.error('Error connecting to database:', error.message);
        logger_1.default.error('Error connecting to database:', error.message);
        throw new Error('Database connection failed');
    }
}
async function closeConnection(connection) {
    try {
        await connection.end();
    }
    catch (error) {
        console.error('Error closing database connection:', error.message);
        logger_1.default.error('Error closing database connection:', error.message);
        throw new Error('Failed to close database connection');
    }
}
async function callSP(query, param) {
    const connection = await getConnection();
    const spQuery = addParams(query, param);
    try {
        if (spQuery.length == 0) {
            throw new Error('Stored procedure query is empty');
        }
        console.log(`Executing:  ${promise_1.default.format(spQuery, param)}`);
        const [rows] = await connection.execute(spQuery, param);
        return rows;
    }
    catch (error) {
        console.error(`Error executing stored procedure: `, error.message);
        logger_1.default.error(`Error executing stored procedure: `, error.message);
        throw new Error('Stored procedure execution failed');
    }
    finally {
        await closeConnection(connection);
    }
}
async function callSPNoParam(query) {
    const connection = await getConnection();
    try {
        if (query.length == 0) {
            throw new Error('Stored procedure query is empty');
        }
        console.log(`Executing:  ${promise_1.default.format(query)}`);
        const [rows] = await connection.execute(query);
        return rows;
    }
    catch (error) {
        console.error(`Error executing stored procedure: `, error.message);
        logger_1.default.error(`Error executing stored procedure: `, error.message);
        throw new Error('Stored procedure execution failed');
    }
    finally {
        await closeConnection(connection);
    }
}
async function executeQuery(query, params = []) {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute(query, params);
        return rows;
    }
    catch (error) {
        console.error('Error executing query:', error.message);
        logger_1.default.error('Error executing query:', error.message);
        throw new Error('Query execution failed');
    }
    finally {
        await closeConnection(connection);
    }
}
async function testConnection() {
    try {
        const connection = await getConnection();
        await connection.query('SELECT 1');
        console.log('Database connection is valid.');
        await closeConnection(connection);
    }
    catch (error) {
        console.error('Database connection test failed:', error.message);
        logger_1.default.error('Database connection test failed:', error.message);
        throw new Error('Database connection test failed');
    }
}
function addParams(query, param) {
    if (query.length == 0)
        return '';
    query += '(';
    param.forEach(item => {
        query += '?, ';
    });
    if (param.length > 0) {
        query = query.substring(0, query.length - 2) + ')';
    }
    else {
        query = query + ')';
    }
    return query;
}
