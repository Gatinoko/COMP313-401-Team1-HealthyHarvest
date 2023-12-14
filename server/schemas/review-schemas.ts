import { z } from 'zod';

/**
 * Zod schema for validating the `createUser` server action.
 */
export const createReviewSchema = z.object({
  text: z.string(),
  rating: z.number(),
  userId: z.string(),
  recipeId: z.string(),
});

export const updateReviewSchema = z.object({
  text: z.string(),
  rating: z.number(),
});
