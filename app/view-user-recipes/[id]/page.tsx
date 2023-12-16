import React from 'react';

import { RecipeItemList } from '@/components/recipe-item-list/recipe-item-list';

const ViewUserRecipesPage = ({ params }: { params: { id: string } }) => {
	return (
		<main className='mt-4 container mx-auto'>
			<RecipeItemList userId={params.id} />
		</main>
	);
};

export default ViewUserRecipesPage;
