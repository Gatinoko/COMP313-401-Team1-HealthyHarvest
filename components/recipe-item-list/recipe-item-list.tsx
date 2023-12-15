'use server';

import { RecipeItem } from './recipe-item';
import {
	getAllRecipes,
	getRecipesByUser,
} from '@/server/actions/recipe-actions';

export type RecipeItemListProps = {
	userId?: string;
};

export async function RecipeItemList({
	userId = undefined,
}: RecipeItemListProps) {
	// Either all recipes, or just a user's recipes
	const recipes = (await assignRecipes())!;

	// Function which returns an user's recipes if the userId prop is defined, or all recipes if it's left undefined
	async function assignRecipes() {
		if (userId) {
			const userRecipes = await getRecipesByUser(userId);
			if (Array.isArray(userRecipes)) return userRecipes;
		} else {
			const allRecipes = await getAllRecipes();
			if (Array.isArray(allRecipes)) return allRecipes;
		}
	}

	return (
		<ul className='grid grid-cols-3 mt-4 gap-2'>
			{recipes.map(({ id, title, imageUrl, user, reviews }, index) => (
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
