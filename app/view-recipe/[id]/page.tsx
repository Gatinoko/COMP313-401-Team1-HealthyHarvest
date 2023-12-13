'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getRecipeById } from '@/server/actions/recipe-actions';
import { RecipeWithUser, RecipeWithUserAndReviews } from '@/types/action-types';
import ReviewSection from '@/components/review-section/review-section';
import StarRating from '@/components/rating/starRating';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';

const ViewRecipePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeWithUserAndReviews | null>(null);
  const { authInformation } = useContext(AuthContext);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const recipe = (await getRecipeById(
        params.id
      )) as RecipeWithUserAndReviews;
      setRecipe(recipe);
      if (!recipe) router.push('/');
    } catch (error) {
      router.push('/');
    }
  }

  function serializeStringArray(rawStringArray: string | null) {
    if (rawStringArray == null) return null;
    const stringArray = JSON.parse(rawStringArray) as string[];
    return stringArray;
  }

  function calculateReviewScore() {
    if (!recipe) return 0;
    if (recipe.reviews.length === 0) return 0;

    let total = 0;
    recipe.reviews.forEach((review) => {
      total += review.rating;
    });

    const result = Math.floor(total / recipe.reviews.length);
    return result;
  }

  return (
    <main className='mt-12 container p-10 flex flex-col gap-4 text-2xl'>
      {recipe && (
        <React.Fragment>
          <h1 className='text-6xl font-bold'>{recipe.title}</h1>
          <div className='flex gap-3'>
            <StarRating
              totalStars={5}
              readOnly={true}
              ratingValue={calculateReviewScore()}
              onRatingChange={null}
            />
            |<p>{recipe.reviews.length} Reviews</p>
          </div>
          <p>{recipe.description}</p>
          <div className='flex gap-3 text-xl'>
            <a href={`/view-user-recipes/${recipe.userId}`}>
              Recipe by{' '}
              <span className='underline'>Chef {recipe.user.username}</span>
            </a>
            |<p>Updated on {recipe.createdAt.toLocaleDateString()}</p>
          </div>
          <Image
            alt='food image'
            src={recipe.imageUrl ? recipe.imageUrl : '/recipeBeef.webp'}
            className='w-9/12'
            width={400}
            height={300}
          />
          <div className='bg-green-50 w-9/12 flex justify-between flex-wrap p-8'>
            <div className='w-1/2 mb-8'>
              <h3 className='font-bold'>Prep Time:</h3>
              <p>{recipe.prepTime}</p>
            </div>
            <div className='w-1/2 mb-8'>
              <h3 className='font-bold'>Cook Time:</h3>
              <p>{recipe.cookTime}</p>
            </div>
            <div className='w-1/2 mb-8'>
              <h3 className='font-bold'>Servings:</h3>
              <p>{recipe.servings}</p>
            </div>
            <div className='w-1/2 mb-8'>
              <h3 className='font-bold'>Yields:</h3>
              <p>{recipe.yieldAmount} servings</p>
            </div>
          </div>
          <h2 className='text-5xl font-bold mt-8 mb-4'>Ingredients</h2>
          <ul className='list-disc indent-10 list-inside flex flex-col gap-3'>
            {serializeStringArray(recipe.ingredients)?.map(
              (ingredient, index) => (
                <li key={ingredient + index}>{ingredient}</li>
              )
            )}
          </ul>
          <h2 className='text-5xl font-bold mt-8 mb-4'>Directions</h2>
          <ul className='mt-2 flex flex-col gap-3'>
            {serializeStringArray(recipe.directions)?.map(
              (direction, index) => (
                <li key={direction + index} className='mb-4'>
                  <h3 className='font-bold mb-2'>Step {index + 1}</h3>
                  <p>{direction}</p>
                </li>
              )
            )}
          </ul>
          {recipe.note && (
            <div>
              <h2 className='text-5xl font-bold mt-8 mb-4'>
                Chef&apos;s Notes:
              </h2>
              <p>{recipe.note}</p>
            </div>
          )}
          <h2 className='text-5xl font-bold mt-8 mb-4'>
            Reviews ({recipe.reviews.length})
          </h2>
          <ReviewSection
            userId={authInformation?.id}
            recipeId={recipe.id}
            onResetReviews={() => {
              init();
            }}
          />
        </React.Fragment>
      )}
    </main>
  );
};

export default ViewRecipePage;
