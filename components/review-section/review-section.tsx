'use client';

import { getReviewsByRecipe } from '@/server/actions/review-actions';
import { Button, Input } from '@nextui-org/react';
import { Review } from '@prisma/client';
import React, { useEffect, useState } from 'react';

const ReviewSection = ({ recipeId }: { recipeId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function init() {
      if (!recipeId) return;
      const foundReviews = (await getReviewsByRecipe(recipeId)) as Review[];
      setReviews(foundReviews);
    }

    init();
  }, [recipeId]);

  return (
    <section className='md:w-1/2'>
      <div>
        {reviews.map(({ id, text, rating }) => (
          <div key={id}>{text}</div>
        ))}
      </div>
      <div>
        <form className='border p-3'>
          <h3 className='text-4xl font-semibold my-3'>Create Review</h3>
          <Input
            key='text'
            type='text'
            label='Message'
            name='text'
            isRequired={true}
          />
          <Button type='submit' color='primary' className='mt-2'>
            Post
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ReviewSection;
