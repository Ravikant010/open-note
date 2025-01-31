import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters long')
    .max(20, 'Password should not exceed 20 characters')
    .regex(/[A-Z]/, 'Password should contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password should contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password should contain at least one number')
    .min(1, 'Password is required'),
});
