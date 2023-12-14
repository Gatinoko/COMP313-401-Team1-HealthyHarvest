'use client';

import StarRating from '@/components/rating/starRating';
import { getAllRecipes } from '@/server/actions/recipe-actions';
import { RecipeWithUserAndReviews } from '@/types/action-types';
import { Recipe, Review, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<RecipeWithUserAndReviews[]>([]);

  useEffect(() => {
    async function recipes() {
      try {
        const allRecipes = await getAllRecipes();
        if (Array.isArray(allRecipes)) {
          setRecipes(allRecipes);
        }
      } catch (error) {
        console.log(error);
      }
    }
    recipes();
  }, []);

  function calculateReviewScore(reviews: Review[]) {
    if (!reviews) return 0;
    if (reviews.length === 0) return 0;

    let total = 0;
    reviews.forEach((review) => {
      total += review.rating;
    });

    const result = Math.floor(total / reviews.length);
    return result;
  }

  return (
    <main className='mt-4 container mx-auto'>
      <h1 className='text-4xl text-center font-bold'>All Recipes</h1>
      <div className='grid grid-cols-3 mt-4 gap-2'>
        {recipes.map(({ id, title, imageUrl, user, reviews }) => (
          <div
            key={id}
            className='cursor-pointer border w-fit p-3'
            onClick={() => router.push('/view-recipe/' + id)}
          >
            <Image
              src={imageUrl ? imageUrl : '/recipeBeef.webp'}
              alt='recipe'
              height={200}
              width={350}
            />
            <h2 className='font-semibold mt-2'>{title}</h2>
            <div className='flex gap-2 items-center'>
              <StarRating
                totalStars={5}
                readOnly={true}
                ratingValue={calculateReviewScore(reviews)}
                onRatingChange={null}
              />
              <span className='text-2xl'>({reviews.length})</span>
            </div>
            <p>Made by {user.username}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
