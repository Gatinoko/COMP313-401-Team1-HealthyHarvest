'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className='mt-4 container mx-auto'>
      <h1 className='text-4xl text-center font-bold'>All Recipes</h1>
      <div className='grid grid-cols-3 mt-4 gap-2'>
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className='cursor-pointer border w-fit p-3'
            onClick={() => router.push('/view-recipe')}
          >
            <Image
              src='/recipeBeef.webp'
              alt='recipe'
              height={200}
              width={350}
            />
            <h2 className='font-semibold mt-2'>BEEF</h2>
            <h3 className='font-semibold text-xl'>Beef Tips and Tots</h3>
            <p>⭐⭐⭐⭐⭐ 20 Ratings</p>
          </div>
        ))}
      </div>
    </main>
  );
}
