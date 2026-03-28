"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginUserSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required().messages({
        'string.base': 'Name should be a string',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required'
    }),
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is required'
    })
});
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi_1.default.string().required().messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required'
    })
});
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).optional().messages({
        'string.base': 'Name should be a string',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}'
    }),
    email: joi_1.default.string().email().optional().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address'
    }),
    password: joi_1.default.string().min(6).optional().messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should have a minimum length of {#limit}'
    })
}).min(1).messages({
    'object.min': 'At least one field (name, email, or password) is required for update.'
});
