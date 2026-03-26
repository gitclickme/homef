// File: src/routes/authRoutes.ts
import { Router, Request, Response } from 'express';
import authService from '../service/authService';
import { User } from '../types/user';
import logger from '../config/logger';
import validationMiddleware from '../middleware/validation/validationMiddleware';
import { loginUserSchema, registerUserSchema } from '../middleware/validation/userSchema';


/**
 * Creates and returns an Express Router for authentication-related routes.
 */

const createAuthRoutes = (): Router => {
  const router = Router();


  // POST /api/auth/register - Register a new user
  router.post('/register', validationMiddleware(registerUserSchema), async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
         res.status(400).json({ message: 'Name, email, and password are required.' });
         return;
      }
      const newUser: User = await authService.register({ name, email, password });
      logger.info(`AuthRoutes: User registration request for email: ${email}`);
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } 
    catch (error: any) {
      logger.error(`AuthRoutes: Registration error: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  });



  // POST /api/auth/login - Login a user and get a JWT
  router.post('/login', validationMiddleware(loginUserSchema), async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
       if (typeof email !== 'string' || typeof password !== 'string') {
         res.status(400).json({ message: 'email, and password are required.' });
         return;
      }
      const { token, user } = await authService.login(email, password);
      logger.info(`AuthRoutes: User login request for email: ${email}`);
      res.json({ token, user });
    } 
    catch (error: any) {
      logger.error(`AuthRoutes: Login error: ${error.message}`);
      res.status(401).json({ message: error.message });
    }
  });

  return router;
};
export default createAuthRoutes;