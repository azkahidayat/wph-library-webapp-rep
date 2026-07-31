import z from 'zod';

export const reviewSchema = z.object({
  star: z.number(),
  comment: z.string().trim(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
