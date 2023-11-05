import { z } from 'zod';

/**
 * Zod schema for validating the `createUser` server action.
 */
export const createUserSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	username: z.string(),
	password: z.string(),
});

/**
 * Zod schema for validating the `loginUser` server action.
 */
export const loginUserSchema = z.object({
	email: z.string(),
	password: z.string(),
});
