'use server';

import React from 'react';
import { RecipeSection } from '@/components/recipe-section/recipe-section';
import { getRecipeById } from '@/server/actions/recipe-actions';
import ReviewSection from '@/components/review-section/review-section';

export default async function ViewRecipePage({
	params,
}: {
	params: { id: string };
}) {
	// User recipe
	const recipe = await getRecipeById(params.id);

	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			{recipe && 'id' in recipe && (
				<>
					{/* Recipe information section */}
					<RecipeSection recipe={recipe} />

					<section className='flex flex-col bg-success-100 p-6 rounded-3xl gap-4 w-full'>
						{/* Reviews */}
						<h2 className='text-5xl font-bold mt-8 mb-4'>
							Reviews ({recipe.reviews.length})
						</h2>

						<ReviewSection
							userId={recipe.userId}
							recipeId={recipe.id}
						/>
					</section>
				</>
			)}
		</main>
	);
}
