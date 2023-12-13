import React, { useState } from 'react';
import Star from './star';

interface IStarRating {
  totalStars: number;
  readOnly: boolean;
  ratingValue: number;
  onRatingChange: ((rating: number) => void) | null;
}

const StarRating = ({
  totalStars = 5,
  ratingValue = 0,
  readOnly = false,
  onRatingChange = null,
}: IStarRating) => {
  const [rating, setRating] = useState(ratingValue);

  const handleChangeRating = (index: number) => {
    if (!readOnly) {
      const newRating = index + 1;
      setRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating);
      }
    }
  };

  return (
    <div className='star-rating'>
      {[...Array(totalStars)].map((star, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleChangeRating(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
