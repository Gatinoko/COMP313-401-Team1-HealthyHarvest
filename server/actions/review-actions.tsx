'use server';
import prismaClient from '@/prisma/prisma';
import { CreateReviewForm, UpdateReviewForm } from '@/types/action-types';
import {
  createReviewSchema,
  updateReviewSchema,
} from '../schemas/review-schemas';

export async function createReview(data: CreateReviewForm) {
  const { text, rating, recipeId, userId } = data;

  const formValues = {
    text,
    rating,
    recipeId,
    userId,
  };

  createReviewSchema.parse(formValues);

  try {
    console.log('reaching review');
    const foundReview = await prismaClient().review.findFirst({
      where: { userId: userId, recipeId: recipeId },
    });
    if (foundReview) {
      return {
        message: 'user already posted a review',
        cause: 'DB_ERROR',
      };
    }
    const newReview = await prismaClient().review.create({ data: formValues });
    console.log('created review', newReview);
    return newReview;
  } catch (error: any) {
    console.log('error', error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
}

export async function updateReview(reviewId: string, data: UpdateReviewForm) {
  const { text, rating } = data;

  const formValues = {
    text,
    rating,
  };

  updateReviewSchema.parse(formValues);

  try {
    console.log('reaching review');
    const review = await prismaClient().review.update({
      where: { id: reviewId },
      data: formValues,
    });
    console.log('updated review', review);
    return review;
  } catch (error: any) {
    console.log('error', error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
}

export async function getReviewsByRecipe(recipeId: string) {
  try {
    console.log('getReviewsByRecipe ' + recipeId);
    const reviews = await prismaClient().review.findMany({
      where: { recipeId: recipeId },
    });

    console.log("return recipe's reviews " + recipeId);
    return reviews;
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
}

export async function deleteReview(reviewId: string, userId: string) {
  const recipe = await prismaClient().review.findUnique({
    where: { id: reviewId },
  });

  if (!recipe) {
    return { message: 'Recipe not found.', cause: 'NOT_FOUND' };
  } else if (recipe.userId !== userId) {
    return { message: 'Unauthorized access.', cause: 'UNAUTHORIZED' };
  }
  try {
    await prismaClient().review.delete({
      where: { id: reviewId },
    });
  } catch (error: any) {
    console.error(error);
    return {
      message: error.message,
      cause: 'DB_ERROR',
    };
  }
}
