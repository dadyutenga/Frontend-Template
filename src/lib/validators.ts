import { z } from 'zod';
export const emailSchema = z.email('Enter a valid email address');
export const passwordSchema = z.string().min(8, 'Use at least 8 characters');
