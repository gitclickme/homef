// File: src/schemas/userSchemas.ts
import Joi from 'joi';

// Schema for user registration
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password should have a minimum length of {#limit}',
    'any.required': 'Password is required'
  })
});

// Schema for user login
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required'
  })
});

// Schema for updating a user (all fields optional)
export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}'
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'Email should be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address'
  }),
  password: Joi.string().min(6).optional().messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password should have a minimum length of {#limit}'
  })
}).min(1).messages({
  'object.min': 'At least one field (name, email, or password) is required for update.'
});