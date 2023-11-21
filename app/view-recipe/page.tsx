'use client';

import Image from 'next/image';
import React from 'react';

const ViewRecipe = () => {
  return (
    <main className='mt-12 container p-10 flex flex-col gap-4 text-2xl'>
      <h1 className='text-6xl font-bold'>Beef Tips and Tots</h1>
      <div className='flex gap-3'>
        <p className='text-xl'>⭐⭐⭐⭐⭐ 4.7 (20)</p>|<p>17 Reviews</p>
      </div>
      <p>
        I&apos;m going to show you this very old-school method of making beef
        tips, which, once made, can be used to top lots of things—but my
        favorite thing to top with tips is probably Tater Tots®. And if you're
        looking for new ways to prepare lean, cheap, tough cuts of beef, this is
        one of my all-time favorite methods. You can give this an upgrade by
        topping with diced red onion, grated Cheddar cheese, and freshly sliced
        green onions, or you can serve the beef tips over hot mashed potatoes
        instead of tots, if you like.
      </p>
      <div className='flex gap-3 text-xl'>
        <p>
          Recipe by <span className='underline'>Chef John</span>
        </p>
        |<p>Updated on September 14,2023</p>
      </div>
      <Image
        alt='food image'
        src='/recipeBeef.webp'
        className='w-9/12'
        width={400}
        height={300}
      />
      <div className='bg-green-50 w-9/12 flex justify-between flex-wrap p-8'>
        <div className='w-1/2 mb-8'>
          <h3 className='font-bold'>Prep Time:</h3>
          <p>15 mins</p>
        </div>
        <div className='w-1/2 mb-8'>
          <h3 className='font-bold'>Cook Time:</h3>
          <p>2 hrs</p>
        </div>
        <div className='w-1/2 mb-8'>
          <h3 className='font-bold'>Total Time:</h3>
          <p>2 hrs 15 mins</p>
        </div>
        <div className='w-1/2 mb-8'>
          <h3 className='font-bold'>Servings:</h3>
          <p>4</p>
        </div>
        <div className='w-1/2 mb-8'>
          <h3 className='font-bold'>Yields:</h3>
          <p>4 servings</p>
        </div>
      </div>
      <h2 className='text-5xl font-bold mt-8 mb-4'>Ingredients</h2>
      <ul className='list-disc indent-10 list-inside flex flex-col gap-3'>
        <li>1 ½ pounds beef round steak</li>
        <li>1 teaspoon kosher salt, or to taste</li>
        <li>½ teaspoon freshly ground black pepper</li>
        <li>2 1 tablespoon vegetable oil</li>
        <li>2 teaspoons tomato paste</li>
        <li>2 cloves garlic, minced</li>
        <li>4 tablespoons butter</li>
        <li>2 tablespoons all-purpose flour</li>
        <li>2 ¼ cups low-sodium beef broth</li>
        <li>
          1 (28 ounce) package frozen bite-size potato nuggets (such as Tater
          Tots®)
        </li>
      </ul>
      <h2 className='text-5xl font-bold mt-8 mb-4'>Directions</h2>
      <ul className='mt-2 flex flex-col gap-3'>
        <li className='mb-4'>
          <h3 className='font-bold mb-2'>Step 1</h3>
          <p>
            Slice beef into 3/4-inch strips; then slice these pieces, at an
            angle, into smaller &quot;tips.&quot; Season beef with salt and
            pepper.
          </p>
        </li>
        <li className='mb-4'>
          <h3 className='font-bold mb-2'>Step 2</h3>
          <p>
            Heat oil in a large skillet over high heat until shimmering.
            Transfer in beef, arranging in a single layer. Let the meat sear
            until browned, 3 to 5 minutes, before turning over and browning the
            other side.
          </p>
        </li>
        <li className='mb-4'>
          <h3 className='font-bold mb-2'>Step 3</h3>
          <p>
            Reduce heat to medium and add tomato paste, garlic, and butter. Stir
            everything until the butter melts, and then stir in the flour. Cook
            and stir for 1 minute.
          </p>
        </li>
        <li className='mb-4'>
          <h3 className='font-bold mb-2'>Step 4</h3>
          <p>
            Stir in broth. Raise heat to high and bring to a simmer. Reduce to
            low, cover, and cook until beef is starting to get tender, about 1
            hour and 15 minutes.
          </p>
        </li>
        <li className='mb-4'>
          <h3 className='font-bold mb-2'>Step 5</h3>
          <p>Meanwhile, preheat the oven to 425 degrees F (220 degrees C).</p>
        </li>
        <li className='mb-4'>
          <h3 className='font-bold mb-2'>Step 6</h3>
          <p>
            Uncover, turn heat to medium, and simmer, stirring occasionally,
            until the sauce has thickened, and the meat is tender, about 30
            minutes.
          </p>
        </li>
        <li className='mb-4'>
          <h3 className='font-bold mb-2'>Step 7</h3>
          <p>
            While meat simmers, bake potato nuggets in the preheated oven until
            crispy and heated through, 20 to 25 minutes.
          </p>
        </li>
        <li className='mb-4'>
          <h3 className='font-bold mb-2'>Step 8</h3>
          <p>
            Taste beef tips and adjust the seasoning. Serve immediately over hot
            potato nuggets.
          </p>
        </li>
      </ul>
      <h2 className='text-5xl font-bold mt-8 mb-4'>Chef&apos;s Notes:</h2>
      <p>
        This will work with any similar cut of beef. If you don&apos;t have
        tomato paste, you can use tomato sauce or ketchup. Less butter can be
        used if the beef rendered out fat. You can use water mixed with
        high-quality beef base instead of beef broth, according to directions.
        Prepare tots as directed on individual package instructions.
      </p>
      <h2 className='text-5xl font-bold mt-8 mb-4'>Reviews (17)</h2>
      <p>In construction</p>
    </main>
  );
};

export default ViewRecipe;
