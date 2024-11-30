import Joi from 'joi';
import { emailRegex } from '../constants/auth.js';

export const authRegisterSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Please provide a name.',
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'The password should have at least 6 characters.',
    'any.required': 'Password is required.',
  }),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'The password should have at least 6 characters.',
    'any.required': 'Password is required.',
  }),
});

export const resetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required().messages({
    'string.min': 'The password should have at least 6 characters.',
    'any.required': 'Password is required.',
  }),
  token: Joi.string().required()
});
