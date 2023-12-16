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

/**
 * Custom type for back-end operations utilizing JWT tokens.
 *
 * @param {string} id - User object's unique identifier.
 * @param {string} email - User email.
 * @param {string} username - The account's chosen username.
 */
export type DecodedJwtPayload = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
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
