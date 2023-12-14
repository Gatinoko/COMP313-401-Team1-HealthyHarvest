'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  deleteRecipe,
  getRecipesByUser,
} from '@/server/actions/recipe-actions';
import { Recipe, Review, User } from '@prisma/client';
import { getUserById } from '@/server/actions/user-actions';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { RecipeWithUserAndReviews } from '@/types/action-types';
import StarRating from '@/components/rating/starRating';

const ViewUserRecipesPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<RecipeWithUserAndReviews[]>([]);
  const userId = params.id;
  const { authInformation } = useContext(AuthContext);

  useEffect(() => {
    async function user() {
      if (!userId) return;
      try {
        console.log(userId);
        const user = (await getUserById(userId)) as User;
        if (!user.id) throw new Error(`Unable to find user with id: ${userId}`);

        setUser(user);
      } catch (error) {
        console.error(error);
        router.push('/');
      }
    }
    user();
  }, []);

  useEffect(() => {
    async function recipes() {
      if (user) {
        const allRecipes = (await getRecipesByUser(
          userId
        )) as RecipeWithUserAndReviews[];
        setRecipes(allRecipes);
      }
    }
    recipes();
  }, [user]);

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

  async function handleDelete(recipeId: string, userId: string) {
    await deleteRecipe(recipeId, userId);
    const filterRecipes = recipes.filter((recipe) => recipe.id != recipeId);
    setRecipes(filterRecipes);
  }

  return (
    <main className='mt-4 container mx-auto'>
      {user && (
        <div>
          <h1 className='text-4xl text-center font-bold'>
            {authInformation?.id === user.id
              ? 'Your Recipes'
              : `${user.firstName}'s Recipes`}
          </h1>
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
                {authInformation?.id === user.id && (
                  <div className='flex gap-2 mt-4'>
                    <Button
                      as={Link}
                      href={`/edit-recipe/${id}`}
                      color='primary'
                      variant='bordered'
                    >
                      Edit
                    </Button>
                    <Button
                      color='danger'
                      onClick={() => handleDelete(id, user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewUserRecipesPage;
