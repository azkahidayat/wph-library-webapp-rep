import z from 'zod';

export const borrowSchema = z.object({
  days: z.enum(['3', '5', '10']),
  borrowDate: z.string(),
  agreeToReturn: z.boolean().refine((value) => value, {
    message: 'You must agree to return the books on time.',
  }),

  acceptPolicy: z.boolean().refine((value) => value, {
    message: 'You must accept the library policy.',
  }),
});

export type BorrowSchema = z.infer<typeof borrowSchema>;
