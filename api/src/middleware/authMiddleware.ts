
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/user';
import logger from '../config/logger'; // Import logger


// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key'; // Must match the one in authService.ts


/**
 * Middleware to authenticate requests using JWT.
 * Attaches the decoded user payload to `req.user` if valid.
 */


const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from header
  const authHeader = req.header('Authorization');

  if (!authHeader) {
     logger.warn('AuthMiddleware: No Authorization header provided.');
     res.status(401).json({ message: 'No token, authorization denied' });
     return;
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  if (!token) {
     logger.warn('AuthMiddleware: No token found in Authorization header.');
     res.status(401).json({ message: 'No token, authorization denied' });
     return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Attach user payload to the request object
    // req.user = decoded;
    logger.info(`AuthMiddleware: Token verified for user ID: ${decoded.id}`);
    next();

  } catch (error: any) {
    logger.error(`AuthMiddleware: Token verification failed: ${error.message}`);
    res.status(401).json({ message: 'Token is not valid' });
    return;
    ;
  }
};

export default authMiddleware;