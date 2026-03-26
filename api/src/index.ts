// File: src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import UserService from './service/userService';
import logger from './config/logger';
import userRoutes from './routes/userRoutes';
import createAuthRoutes from './routes/authRoute';
import authMiddleware from './middleware/authMiddleware';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'; // Import swagger-ui-express
import YAML from 'yamljs';               // Import yamljs

// Load environment variables from .env file
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;


// Load Swagger YAML file
const swaggerDocument = YAML.load('./src/swagger/swagger.yaml');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
logger.info('Swagger UI available at /api-docs');

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Basic route for the root URL
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to your Node.js API with TypeScript!');
});

// Example API route (existing)
app.get('/api/data', (req: Request, res: Response) => {
  res.json({
    message: 'This is some sample data from your API',
    timestamp: new Date().toISOString()
  });
});

// --- Dependency Injection Setup ---
// Instantiate the UserService
const userService = new UserService();


//Public api routes
app.use('/api/auth', createAuthRoutes());

//Restricted api routes
 app.use(authMiddleware);
// Mount the routes
 
  // // Authentication routes
  app.use('/api/users', userRoutes(userService));

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





