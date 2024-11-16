import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'any.required': 'Please provide a name.',
    'string.min': 'Your field name should have at least 3 characters.',
    'string.max': 'Your field name should have no more than 20 characters.',
  }),
  phoneNumber: Joi.string().required().min(3).max(20).messages({
    'any.required': 'Please provide a phone number.',
    'string.min':
      'Your field with phone number should have at least 3 characters.',
    'string.max':
      'Your field with phone number should have no more than 20 characters.',
  }),
  email: Joi.string().messages({
    'string.email': 'Please provide a valid email address.',
  }),
  contactType: Joi.string().valid(...typeList),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'The isFavourite field must be true or false.',
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'any.required': 'Please provide a phone number.',
    'string.min':
      'Your field with phone number should have at least 3 characters.',
    'string.max':
      'Your field with phone number should have no more than 20 characters.',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'any.required': 'Please provide a phone number.',
    'string.min':
      'Your field with phone number should have at least 3 characters.',
    'string.max':
      'Your field with phone number should have no more than 20 characters.',
  }),
  email: Joi.string().messages({
    'string.email': 'Please provide a valid email address.',
  }),
  contactType: Joi.string().valid(...typeList),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'The isFavourite field must be true or false.',
  }),
});
