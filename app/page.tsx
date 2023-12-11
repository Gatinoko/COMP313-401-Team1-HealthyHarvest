'use client';

import { getAllRecipes } from '@/server/actions/recipe-actions';
import { Recipe } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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

  return (
    <main className='mt-4 container mx-auto'>
      <h1 className='text-4xl text-center font-bold'>All Recipes</h1>
      <div className='grid grid-cols-3 mt-4 gap-2'>
        {recipes.map(({ id, title, imageUrl }) => (
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
            <p>⭐⭐⭐⭐⭐ 20 Ratings</p>
          </div>
        ))}
      </div>
    </main>
  );
}
