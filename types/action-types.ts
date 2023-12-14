import { Recipe, Review, User } from '@prisma/client';

/**
 * Custom error type for use in server actions.
 *
 * @param message - Error message.
 * @param cause - Cause of error.
 */
export type Error = {
  message: string;
  cause: string;
};

/**
 * Custom success response type for use in server actions.
 *
 * @param message - Success message to be displayed in client-side.
 */
export type SuccessResponse = {
  message: string;
};

export type RecipeForm = {
  title: string;
  imageUrl: string | null;
  description: string;
  servings: number;
  yieldAmount: number;
  prepTime: string;
  cookTime: string;
  isPublic: boolean;
  userId: string;
  ingredients: string[];
  directions: string[];
  note: string | null;
};

export type CreateReviewForm = {
  text: string;
  rating: number;
  userId: string;
  recipeId: string;
};

export type UpdateReviewForm = {
  text: string;
  rating: number;
};

export type RecipeWithUser = Recipe & {
  user: User;
};

export type ReviewsWithUser = Review & {
  user: User;
};

export type RecipeWithUserAndReviews = Recipe & {
  user: User;
  reviews: Review[];
};
