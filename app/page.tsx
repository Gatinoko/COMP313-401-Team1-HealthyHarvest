import { RecipeItemList } from '@/components/recipe-item-list/recipe-item-list';

export default function Home() {
	return (
		<main className='mt-4 container mx-auto'>
			<h1 className='text-4xl text-center font-bold'>All Recipes</h1>
			<RecipeItemList />
		</main>
	);
}
