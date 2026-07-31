import { z } from 'zod';
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password should be at least 6 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
