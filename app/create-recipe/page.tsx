'use client';

import CreateRecipeForm from '@/components/create-recipe-form/create-recipe-form';

export default function CreateRecipe() {
	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			<CreateRecipeForm />
		</main>
	);
}
