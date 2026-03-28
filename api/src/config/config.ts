
import path from 'path';
import 'dotenv/config';
import logger from './logger';

logger.info(`Reading env, ${process.env.ENVIRONMENT}`)

// Export configuration object
export const ConfigEnv = {
    environment: process.env.ENVIRONMENT,
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL || '',
    apiUrl: process.env.URL,
    jwtSecret: process.env.JWT_SECRET || '',
    dbConfig:{
        host: process.env.DB_HOST || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || ''
    },
        
    }
    // Add more config variables as needed
export default ConfigEnv;
// Example usage:
