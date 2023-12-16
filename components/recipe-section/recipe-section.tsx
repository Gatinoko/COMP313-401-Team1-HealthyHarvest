'use server';

import React from 'react';
import Image from 'next/image';
import { StarRating } from '@/components/rating/starRating';
import { RecipeWithUserAndReviews } from '@/types/action-types';

export type RecipeSectionProps = {
	recipe: RecipeWithUserAndReviews;
};

export async function RecipeSection({ recipe }: RecipeSectionProps) {
	// Function which turns a string database element (used in ingredients and directions) into an array of strings
	function serializeStringArray(rawStringArray: string) {
		return JSON.parse(rawStringArray) as string[];
	}

	// Function that calculates the average rating for each recipe
	function calculateReviewScore() {
		if ('id' in recipe) {
			let total = 0;
			recipe.reviews.forEach((review) => {
				total += review.rating;
			});
			const result = Math.floor(total / recipe.reviews.length);
			return result;
		} else return 0;
	}

	return (
		<section className='flex flex-col bg-success-100 p-6 rounded-3xl gap-4 w-full'>
			{/* Title */}
			<h1 className='text-6xl font-medium'>{recipe.title}</h1>

			{/* Horizontal separator */}
			<hr className='border-success-500' />

			{/* Description */}
			<h2 className='text-2xl'>{recipe.description}</h2>

			{/* Rating information and metadata */}
			<div className='flex flex-col'>
				{/* Rating information */}
				<StarRating
					totalStars={5}
					isReadOnly={true}
					defaultRatingValue={calculateReviewScore()}
					numberOfReviews={recipe.reviews.length}
					rightSideText='Reviews'
				/>

				{/* Recipe metadata information */}
				<div className='flex gap-3 text-xl text-default-400'>
					{/* Profile link */}
					<a href={`/view-user-recipes/${recipe.userId}`}>
						Recipe by <span className='underline'>{recipe.user.username}</span>
					</a>

					{'|'}

					{/* "Updated on" text */}
					<p>{`Updated on ${recipe.createdAt.toLocaleDateString()}`}</p>
				</div>
			</div>

			{/* Recipe image */}
			<div className='bg-default-100 rounded-3xl '>
				{recipe.imageUrl ? (
					<div
						className='overflow-hidden rounded-2xl select-none'
						style={{ position: 'relative', width: '100%', height: '300px' }}>
						<Image
							src={recipe.imageUrl}
							alt='recipe'
							sizes='100%'
							fill
							style={{
								objectFit: 'cover',
							}}
						/>
					</div>
				) : (
					<p
						style={{
							height: '300px',
							width: '100%',
							lineHeight: '12.5',
						}}
						className='text-center text-default-400'>
						No image loaded.
					</p>
				)}
			</div>

			{/* Prep time, servings, cook time, and yields */}
			<div className='flex gap-2 bg-green-50 p-4 text-xl rounded-2xl'>
				{/* Prep time and cook time */}
				<div className='flex flex-col gap-4 w-full'>
					{/* Prep time */}
					<div>
						<h3 className='font-semibold'>Prep Time:</h3>
						<p>{recipe.prepTime}</p>
					</div>

					{/* Cook time */}
					<div>
						<h3 className='font-semibold'>Cook Time:</h3>
						<p>{recipe.cookTime}</p>
					</div>
				</div>

				{/* Servings and yields */}
				<div className='flex flex-col gap-4 w-full'>
					{/* Servings */}
					<div>
						<h3 className='font-semibold'>Servings:</h3>
						<p>{recipe.servings} servings</p>
					</div>

					{/* Yields */}
					<div>
						<h3 className='font-semibold'>Yields:</h3>
						<p>{recipe.yieldAmount} yields</p>
					</div>
				</div>
			</div>

			{/* Ingredients */}
			<div className='flex flex-col gap-2'>
				{/* Section Title */}
				<h2 className='text-2xl font-medium'>Ingredients</h2>

				{/* Horizontal separator */}
				<hr className='border-success-500' />

				{/* Ingredient list */}
				<ul className='list-disc list-inside flex flex-col'>
					{serializeStringArray(recipe.ingredients!)?.map(
						(ingredient, index) => (
							<li
								key={ingredient + index}
								className='text-xl'>
								{ingredient}
							</li>
						)
					)}
				</ul>
			</div>

			{/* Directions */}
			<div className='flex flex-col gap-2'>
				{/* Title */}
				<h2 className='text-2xl font-medium'>Directions</h2>

				{/* Horizontal separator */}
				<hr className='border-success-500' />

				{/* Directions list */}
				<ul className='flex flex-col text-xl'>
					{serializeStringArray(recipe.directions!)?.map((direction, index) => (
						<li key={index}>
							<span className='font-bold'>Step {index + 1}:</span> {direction}
						</li>
					))}
				</ul>
			</div>

			<div className='flex flex-col gap-2'>
				{/* Section Title */}
				<h2 className='text-2xl font-medium'>Extra Notes</h2>

				{/* Horizontal separator */}
				<hr className='border-success-500' />

				{recipe.note && <p className='text-xl'>{recipe.note}</p>}
			</div>
		</section>
	);
}
