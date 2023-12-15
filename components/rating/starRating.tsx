import React, { useState } from 'react';
import { Star } from './star';

export type StarRatingProps = {
	totalStars: number;
	isReadOnly: boolean;
	defaultRatingValue: number;
	numberOfReviews: number;
	onRatingChange?: (rating: number) => void;
};

export function StarRating({
	totalStars = 5,
	defaultRatingValue = 0,
	isReadOnly = false,
	numberOfReviews,
	onRatingChange = undefined,
}: StarRatingProps) {
	// State variable with user rating value
	const [rating, setRating] = useState(defaultRatingValue);

	// Function for handling click event on each individual star
	function handleChangeRating(index: number) {
		if (!isReadOnly) {
			const newRating = index + 1;
			setRating(newRating);
			if (onRatingChange) onRatingChange(newRating);
		}
	}

	return (
		<div className='flex gap-2 items-center'>
			{/* Array of star elements */}
			<div className='flex items-center select-none'>
				{[...Array(totalStars)].map((_, index) => (
					<Star
						key={index}
						size='lg'
						isHollow={!(index < rating)}
						onClick={() => handleChangeRating(index)}
					/>
				))}
			</div>

			{/* Review number text */}
			<span className='text-lg font-medium text-warning-400'>
				({numberOfReviews})
			</span>
		</div>
	);
}
