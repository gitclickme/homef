// File: src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import logger from '../../config/logger'; // Import logger

/**
 * Middleware to validate request body against a Joi schema.
 * @param {Joi.ObjectSchema} schema The Joi schema to validate against.
 */
const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Include all errors, not just the first one
      allowUnknown: true // Allow unknown keys, but still validate known ones
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      logger.warn(`Validation Error for ${req.method} ${req.originalUrl}: ${errors.join(', ')}`);
      res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
  };
};

export default validationMiddleware;