import mysql, { Connection } from 'mysql2/promise';
import logger from './logger'; // Import logger
import ConfigEnv from './config';

// Load environment variables from .env file


/**
 * Establishes and returns a new MySQL database connection.
 * @returns {Promise<Connection>} A promise that resolves to a MySQL connection object.
 */


export async function getConnection(): Promise<Connection> {
  try {
    const connection = await mysql.createConnection(ConfigEnv.dbConfig);
    //console.log('Connected to MySQL database!');
    return connection;
  } catch (error: any) {
    console.error('Error connecting to database:', error.message);
    logger.error('Error connecting to database:', error.message);
    throw new Error('Database connection failed');
  }
}

export async function closeConnection(connection: Connection): Promise<void> {
  try {
    await connection.end();
    //console.log('Database connection closed.');
  } catch (error: any) {
    console.error('Error closing database connection:', error.message);
    logger.error('Error closing database connection:', error.message);
    throw new Error('Failed to close database connection');
  }
}

export async function callSP(query:string, param: any[]): Promise<any>{
      const connection = await getConnection();
      const spQuery = addParams(query, param);
      try{
          if (spQuery.length == 0) {
              throw new Error('Stored procedure query is empty');
          }
          console.log(`Executing:  ${mysql.format(spQuery, param)}`);
          const [rows] = await connection.execute(spQuery, param);
          return rows;
      }
      catch (error: any) {
          console.error(`Error executing stored procedure: `, error.message);
          logger.error(`Error executing stored procedure: `, error.message);
          throw new Error('Stored procedure execution failed');
      } finally {
          await closeConnection(connection);
      } 
      
}

export async function callSPNoParam(query:string): Promise<any>{
      const connection = await getConnection();
       try{
          if (query.length == 0) {
              throw new Error('Stored procedure query is empty');
          }
          console.log(`Executing:  ${mysql.format(query)}`);
          const [rows] = await connection.execute(query);
          return rows;
      }
      catch (error: any) {
          console.error(`Error executing stored procedure: `, error.message);
          logger.error(`Error executing stored procedure: `, error.message);
          throw new Error('Stored procedure execution failed');
      } finally {
          await closeConnection(connection);
      } 
}

export async function executeQuery(query: string, params: any[] = []): Promise<any> {
  const connection = await getConnection(); 
  try {
    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (error: any) {
    console.error('Error executing query:', error.message);   
    logger.error('Error executing query:', error.message);   
    throw new Error('Query execution failed');
  } finally {
    await closeConnection(connection);
  }
}

export async function testConnection(): Promise<void> {
  try {
    const connection = await getConnection();
    await connection.query('SELECT 1'); // Simple query to test connection
    console.log('Database connection is valid.');
    await closeConnection(connection);
  } catch (error: any) {
    console.error('Database connection test failed:', error.message);
    logger.error('Database connection test failed:', error.message);
    throw new Error('Database connection test failed');
  }
}

function addParams(query: string, param: any[]): string {
    if (query.length == 0) return '';
    query += '(';
    param.forEach(item => {
      query += '?, ';
    });
    if(param.length > 0){
      query = query.substring(0, query.length - 2) + ')';
    }
    else{
      query = query + ')';
    }
    return query
  }

