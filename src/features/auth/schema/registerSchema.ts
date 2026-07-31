import z from 'zod';

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email format'),
    phone: z
      .string()
      .trim()
      .min(1, 'Phone number is required')
      .regex(/^(?:\+62|0)8[1-9][0-9]{6,11}$/, {
        message: 'Invalid phone number',
      }),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password should be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm password is required')
      .min(6, 'Confirm password should be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
