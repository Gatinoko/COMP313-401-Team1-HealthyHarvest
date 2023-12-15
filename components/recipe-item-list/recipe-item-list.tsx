'use server';

import { RecipeItem } from './recipe-item';
import { getAllRecipes } from '@/server/actions/recipe-actions';

export type RecipeItemListProps = {};

export async function RecipeItemList(props: RecipeItemListProps) {
	const allRecipes = await getAllRecipes();

	console.log(allRecipes);

	return (
		<ul className='grid grid-cols-3 mt-4 gap-2'>
			{Array.isArray(allRecipes) &&
				allRecipes.map(({ id, title, imageUrl, user, reviews }, index) => (
					<RecipeItem
						key={index}
						id={id}
						title={title}
						user={user}
						reviews={reviews}
						imageUrl={imageUrl ? imageUrl : '/recipeBeef.webp'}
					/>
				))}
		</ul>
	);
}
