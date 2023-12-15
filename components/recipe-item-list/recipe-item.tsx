'use client';

import { StarRating } from '../rating/starRating';
import Image from 'next/image';
import { Review, User } from '@prisma/client';
import { useRouter } from 'next/navigation';

export type RecipeItemProps = {
	id: string;
	title: string;
	user: User;
	reviews: Review[];
	imageUrl: string;
};

export function RecipeItem({
	id,
	title,
	user,
	reviews,
	imageUrl,
}: RecipeItemProps) {
	// Next router instance
	const router = useRouter();

	// Function for calculating the review scores
	function calculateReviewScore(reviews: Review[]) {
		if (!reviews) return 0;
		if (reviews.length === 0) return 0;
		else {
			let total = 0;
			reviews.forEach((review) => {
				total += review.rating;
			});
			const result = Math.floor(total / reviews.length);
			return result;
		}
	}

	// Handler for the onClick event on a recipe item
	function recipeItemClickHandler() {
		router.push('/view-recipe/' + id);
	}

	return (
		<li
			key={id}
			className='flex flex-col w-full h-fit gap-2 p-4 bg-success-100 rounded-3xl cursor-pointer'
			onClick={recipeItemClickHandler}>
			{/* Item image */}
			<div
				className='overflow-hidden rounded-2xl select-none'
				style={{ position: 'relative', width: '100%', height: '200px' }}>
				<Image
					src={imageUrl}
					alt='recipe'
					sizes='100%'
					fill
					style={{
						objectFit: 'cover',
					}}
				/>
			</div>

			{/* Item title */}
			<h4 className='font-semibold text-xl truncate'>{title}</h4>

			{/* Star rating and recipe creator text */}
			<div className='flex flex-col rounded-2xl p-2 bg-success-50 '>
				{/* Star rating */}
				<StarRating
					totalStars={5}
					isReadOnly={true}
					defaultRatingValue={calculateReviewScore(reviews)}
					numberOfReviews={reviews.length}
				/>

				{/* "Made by" text */}
				<p className='truncate'>Made by {user.username}</p>
			</div>
		</li>
	);
}
