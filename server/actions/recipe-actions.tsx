'use server';
import prismaClient from '@/prisma/prisma';
import { createRecipeSchema } from '../schemas/recipe-schemas';
import { RecipeForm } from '@/types/action-types';

/**
 * Server action for the create recipe form
 *
 */
export async function createRecipe(data: RecipeForm) {
  const {
    title,
    imageUrl,
    description,
    servings,
    yieldAmount,
    prepTime,
    cookTime,
    isPublic,
    userId,
    ingredients,
    directions,
    note,
  } = data;
  const formValues = {
    title,
    imageUrl,
    description,
    servings: parseInt(servings + ''),
    yieldAmount: parseInt(yieldAmount + ''),
    prepTime,
    cookTime,
    isPublic,
    userId,
    ingredients: JSON.stringify(ingredients),
    directions: JSON.stringify(directions),
    note,
  };

  createRecipeSchema.parse(formValues);
  try {
    console.log('reaching recipe');
    const recipe = await prismaClient().recipe.create({
      data: formValues,
    });
    console.log('created recipe', recipe);
    return recipe;
  } catch (error: any) {
    console.log('error', error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
}

//Get single recipe by ID
export async function getRecipeById(id: string) {
  try {
    const recipe = await prismaClient().recipe.findUnique({
      where: { id },
      include: { user: true, reviews: true },
    });
    return recipe;
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
}

//Get recipes by user
export async function getRecipesByUser(userId: string) {
  try {
    console.log('getRecipesByUser ' + userId);
    const recipes = await prismaClient().recipe.findMany({
      where: { userId: userId },
      include: { user: true, reviews: true },
    });
    console.log("return user's recipes " + userId);
    return recipes;
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
}

export async function getAllRecipes() {
  try {
    console.log('getAllRecipes');
    const recipes = await prismaClient().recipe.findMany({
      include: { user: true, reviews: true },
    });
    console.log('return recipes');
    return recipes;
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
}

//update a recipe
export async function updateRecipe(recipeId: string, data: RecipeForm) {
  const {
    title,
    imageUrl,
    description,
    servings,
    yieldAmount,
    prepTime,
    cookTime,
    isPublic,
    userId,
    ingredients,
    directions,
    note,
  } = data;

  const formValues = {
    title,
    imageUrl,
    description,
    servings: parseInt(servings + ''),
    yieldAmount: parseInt(yieldAmount + ''),
    prepTime,
    cookTime,
    isPublic,
    userId,
    ingredients: JSON.stringify(ingredients),
    directions: JSON.stringify(directions),
    note,
  };

  const recipe = await prismaClient().recipe.findUnique({
    where: { id: recipeId },
  });

  //check that recipe exists and if the currentUser is the publisher
  if (!recipe) {
    return { message: 'Recipe not found.', cause: 'NOT_FOUND' };
  } else if (recipe.userId !== formValues.userId) {
    return { message: 'Unauthorized access.', cause: 'UNAUTHORIZED' };
  }
  try {
    await prismaClient().recipe.update({
      where: { id: recipeId },
      data: formValues,
    });
  } catch (error: any) {
    console.error(error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
  //redirect or send response tbd
}

//delete a recipe
export async function deleteRecipe(
  recipeId: string,
  currentUser: { userId: string }
) {
  const recipe = await prismaClient().recipe.findUnique({
    where: { id: recipeId },
  });

  if (!recipe) {
    return { message: 'Recipe not found.', cause: 'NOT_FOUND' };
  } else if (recipe.userId !== currentUser.userId) {
    return { message: 'Unauthorized access.', cause: 'UNAUTHORIZED' };
  }
  try {
    await prismaClient().recipe.delete({
      where: { id: recipeId },
    });
  } catch (error: any) {
    console.error(error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
}
