import z from 'zod';

export const profileSchema = z.object({
  name: z.string().trim(),
  phone: z.string().trim(),
  profilePhoto: z.instanceof(File).optional().nullable(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
