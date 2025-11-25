import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

interface ValidationError {
  path: string;
  message: string;
}

export const validate = (schema: yup.AnySchema) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const errors = err.inner.reduce((acc: Record<string, string>, error: ValidationError) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'An error occurred during validation',
      });
    }
  };
