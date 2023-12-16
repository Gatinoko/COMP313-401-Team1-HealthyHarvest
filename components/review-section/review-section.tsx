'use client';

import {
	createReview,
	deleteReview,
	getReviewsByRecipe,
} from '@/server/actions/review-actions';
import { Button, Input } from '@nextui-org/react';
import { Review } from '@prisma/client';
import React, { FormEvent, useEffect, useState } from 'react';
import { StarRating } from '../rating/starRating';
import { ReviewsWithUser } from '@/types/action-types';
import { useRouter } from 'next/navigation';

const ReviewSection = ({
	userId,
	recipeId,
}: {
	userId: string | undefined;
	recipeId: string | undefined;
}) => {
	const router = useRouter();

	const [text, setText] = useState('');
	const [rating, setRating] = useState(0);
	const [reviews, setReviews] = useState<ReviewsWithUser[]>([]);

	useEffect(() => {
		init();
	}, [recipeId]);

	async function init() {
		if (recipeId) {
			const reviewsWithUsers = (await getReviewsByRecipe(
				recipeId
			)) as ReviewsWithUser[];
			setReviews(reviewsWithUsers);
		}
	}

	function userHaveReview() {
		if (!userId) return true;

		let result = false;
		reviews.forEach((review) => {
			if (review.userId === userId) {
				result = true;
			}
		});
		return result;
	}

	async function reviewSubmission(e: FormEvent) {
		e.preventDefault();

		if (!userId) return;
		if (!recipeId) return;

		const review = (await createReview({
			text,
			rating,
			userId,
			recipeId,
		})) as ReviewsWithUser;
		setReviews((prev) => [...prev, review]);
	}

	async function onDeleteReview(reviewId: string, userId: string) {
		try {
			await deleteReview(reviewId, userId);
			const reviewsClone = reviews.filter((review) => review.id != reviewId);
			setReviews(reviewsClone);
			router.refresh();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<section className='md:w-1/2'>
			<div>
				{reviews &&
					reviews.map(({ id, text, rating, user }) => (
						<div
							key={id}
							className='border p-3 rounded-md my-2 flex flex-col gap-3'>
							<div className='flex items-center gap-2'>
								<a href={`/view-user-recipes/${user.id}`}>{user.username}</a>
								<StarRating
									totalStars={5}
									isReadOnly={true}
									defaultRatingValue={rating}
									numberOfReviews={false}
								/>
							</div>
							<h4>{text}</h4>
							{user.id === userId && (
								<Button
									onClick={() => onDeleteReview(id, user.id)}
									color='danger'>
									Delete
								</Button>
							)}
						</div>
					))}
			</div>
			{!userHaveReview() && (
				<form
					onSubmit={reviewSubmission}
					className='border p-3 flex flex-col gap-4'>
					<h3 className='text-4xl font-semibold my-3'>Create Review</h3>
					<Input
						key='text'
						type='text'
						label='Message'
						name='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
						isRequired={true}
					/>
					<StarRating
						totalStars={5}
						isReadOnly={false}
						onRatingChange={(rating) => setRating(rating)}
						defaultRatingValue={0}
						numberOfReviews={false}
					/>
					<Button
						type='submit'
						color='primary'
						className='mt-2'>
						Post
					</Button>
				</form>
			)}
		</section>
	);
};

export default ReviewSection;
