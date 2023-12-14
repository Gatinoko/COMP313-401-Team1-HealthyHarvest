'use client';

import StarRating from '../rating/starRating';
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

	return (
		<li
			key={id}
			className='cursor-pointer border w-fit p-3'
			onClick={() => router.push('/view-recipe/' + id)}>
			{/* Item image */}
			<Image
				src={imageUrl}
				alt='recipe'
				height={200}
				width={350}
			/>

			{/* Item title */}
			<h2 className='font-semibold mt-2'>{title}</h2>

			{/* Star rating */}
			<div className='flex gap-2 items-center'>
				<StarRating
					totalStars={5}
					readOnly={true}
					ratingValue={calculateReviewScore(reviews)}
					onRatingChange={null}
				/>
				<span className='text-2xl'>({reviews.length})</span>
			</div>

			{/* "Made by" text */}
			<p>Made by {user.username}</p>
		</li>
	);
}
