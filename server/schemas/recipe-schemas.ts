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
    step: z.string(),
});

/**
*Zod schema for creating a recipe
*/
export const createRecipeSchema = z.object({
    title: z.string(),
    imageUrl: z.string().optional(),
    desc: z.string().optional(),
    servings: z.number().optional(),
    yield: z.string().optional(),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    public: z.boolean(),
    userId: z.string(),
    ingredients: z.array(ingredientSchema),
    directions: z.array(directionSchema),
    note: z.string().optional()
});
