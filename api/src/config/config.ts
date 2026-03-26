import dotenv from 'dotenv';
import path from 'path';

// Determine environment
const env = process.env.NODE_ENV || 'development';

 console.log('NODE_ENV Config', env);

// Load .env and .env.development files
dotenv.config({ path: path.resolve(process.cwd(), '.env.'+env) });
if (env === 'development') {
    dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });
}

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


