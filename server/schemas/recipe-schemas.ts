import { z } from 'zod';

/**
 * Zod schema for ingredients object
 */
const ingredientSchema = z.object({
  text: z.string(),
});

/**
 * Zod schema for directions object
 */
const directionSchema = z.object({
  text: z.string(),
});

/**
 *Zod schema for creating a recipe
 */
export const createRecipeSchema = z.object({
  title: z.string(),
  imageUrl: z.string().optional(),
  description: z.string(),
  servings: z.number(),
  yieldAmount: z.number(),
  prepTime: z.string(),
  cookTime: z.string(),
  isPublic: z.boolean(),
  userId: z.string(),
  ingredients: z.string(),
  directions: z.string(),
  note: z.string().optional(),
});
