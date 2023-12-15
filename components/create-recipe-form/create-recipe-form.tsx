'use client';

import {
	Button,
	Divider,
	Input,
	Select,
	SelectItem,
	Textarea,
} from '@nextui-org/react';
import { useState } from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { createRecipe } from '@/server/actions/recipe-actions';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/util/uploadthing';

export default function CreateRecipeForm() {
	// Next router instance
	const router = useRouter();

	// Auth context information
	const { authInformation } = useContext(AuthContext);

	// State variables
	const [errorMessage, setErrorMessage] = useState<string>('‎ ');
	const [imageUrl, setImageUrl] = useState<string>('');
	const [ingredients, setIngredients] = useState<string[]>([
		'e.g. 2 cups flour, sifted',
		'e.g. 1 cup sugar',
		'e.g. 2 tablespoons butter, softened',
	]);
	const [directions, setDirections] = useState<string[]>([
		'e.g. Preheat oven to 350 degrees F...',
		'e.g. Combine all dry ingredients in a large bowl...',
		'e.g. Pour into greased trays and bake for 15-20 minutes...',
	]);

	// Remove ingredient handler function
	function removeIngredientButtonHandler(ingredientIndex: number) {
		const ingredientsClone = ingredients.filter(
			(_, index) => ingredientIndex !== index
		);
		setIngredients(ingredientsClone);
	}

	// Remove direction handler function
	function removeDirectionButtonHandler(directionIndex: number) {
		const directionsClone = directions.filter(
			(_, index) => directionIndex !== index
		);
		setDirections(directionsClone);
	}

	// Create recipe form handler function
	async function createRecipeFormHandler(formData: FormData) {
		const serverResponse = await createRecipe({
			formData: formData,
			imageUrl: imageUrl,
			userId: authInformation.id!,
			ingredients: ingredients,
			directions: directions,
		});
		if (serverResponse) setErrorMessage(serverResponse.message);
		else {
			setErrorMessage('‎ ');
			router.push('/');
		}
	}

	return (
		<form
			action={createRecipeFormHandler}
			className='flex flex-col gap-4 bg-success-100 p-6 rounded-3xl'>
			{/* Title */}
			<h1 className='text-5xl font-semibold'>Create Recipe</h1>

			{/* Horizontal separator */}
			<hr className='border-success-500' />

			{/* Recipe title, description, and image row */}
			<div className='flex gap-4'>
				{/* Title and description */}
				<div className='flex flex-col gap-2 w-full h-full'>
					{/* Recipe title */}
					<Input
						type='text'
						name='title'
						label='Recipe Title'
						placeholder='recipe title'
						labelPlacement='outside'
					/>

					{/* Description */}
					<Textarea
						name='description'
						type='text'
						label='Recipe Description'
						placeholder='recipe description'
						labelPlacement='outside'
					/>
				</div>

				{/* Recipe image and upload image button */}
				<div className='flex flex-col gap-2 items-center w-fit'>
					{/* Recipe image */}
					<div className='bg-default-100 rounded-3xl '>
						{imageUrl ? (
							<div
								style={{ height: '200px', width: '350px' }}
								className='overflow-hidden items-center flex rounded-3xl'>
								<Image
									src={imageUrl}
									className='bg-red'
									alt='recipe image'
									height={200}
									width={350}
								/>
							</div>
						) : (
							<p
								style={{
									height: '200px',
									width: '350px',
									lineHeight: '12.5',
								}}
								className='text-center text-default-400'>
								No image loaded.
							</p>
						)}
					</div>

					{/* Upload recipe image button */}
					<UploadButton
						endpoint='imageUploader'
						onClientUploadComplete={(res) => {
							console.log('Upload successful');
							// const bodyClone = { ...body, imageUrl: res[0].url };
							// setBody((prev) => bodyClone);
							setImageUrl(res[0].url);
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`);
						}}
					/>
				</div>
			</div>

			{/* Servings & yield ammount section */}
			<div className='flex gap-2'>
				{/* Servings input */}
				<Input
					name='servings'
					type='number'
					label='Servings'
					placeholder='e.g. 8'
					labelPlacement='outside'
				/>

				{/* Yield ammount input */}
				<Input
					name='yieldAmount'
					type='number'
					label='Yield (Optional)'
					placeholder='e.g. 1 9-inch cake'
					labelPlacement='outside'
				/>
			</div>

			{/* Prep time section*/}
			<div className='flex flex-col gap-1'>
				{/* Label text */}
				<label className='text-sm'>Prep Time</label>

				{/* Prep time ammount and metric inputs */}
				<div className='flex gap-2 w-full'>
					{/* Number input */}
					<Input
						type='number'
						name='prepTime'
						className='w-20'
					/>

					{/* Prep time metric input */}
					<Select
						className='grow'
						label='Select the metric'
						name='prepTimeMetric'
						labelPlacement='inside'>
						<SelectItem key={'prep:mins'}>mins</SelectItem>
						<SelectItem key={'prep:hours'}>hours</SelectItem>
						<SelectItem key={'prep:days'}>days</SelectItem>
					</Select>
				</div>
			</div>

			{/* Cooking time session */}
			<div className='flex flex-col gap-1'>
				{/* Label text */}
				<label className='text-sm'>Cooking Time</label>

				{/* Prep time ammount and metric inputs */}
				<div className='flex gap-2 w-full'>
					{/* Number Input */}
					<Input
						type='number'
						name='cookingTime'
						className='w-20 h-full'
					/>

					{/* Cooking time metric input */}
					<Select
						className='grow'
						name='cookingTimeMetric'
						label='Select the metric'
						labelPlacement='inside'>
						<SelectItem key={'cooking:mins'}>mins</SelectItem>
						<SelectItem key={'cooking:hours'}>hours</SelectItem>
						<SelectItem key={'cooking:days'}>days</SelectItem>
					</Select>
				</div>
			</div>

			{/* Recipe Note */}
			<Textarea
				name='note'
				type='text'
				label='Note (Optional)'
				placeholder='recipe note'
				labelPlacement='outside'
			/>

			{/* Ingredients row */}
			<div className='flex flex-col gap-4'>
				{/* Title */}
				<h2 className='text-3xl font-medium'>Ingredients</h2>

				{/* Horizontal separator */}
				<hr className='border-success-500' />

				<div className='flex flex-col gap-2'>
					{/* Ingredient items list */}
					{ingredients.map((ingredient, index) => (
						<div
							key={index}
							className='flex gap-2 justify-center items-center'>
							{/* Ingredient text input */}
							<Input
								type='text'
								value={ingredient}
								onChange={(e) => {
									const ingredientClone = [...ingredients];
									ingredientClone[index] = e.target.value;
									setIngredients(ingredientClone);
								}}
							/>

							{/* "X" button */}
							<Image
								alt='search icon'
								src='/icons/circle-xmark-solid.svg'
								width={25}
								height={25}
								className='cursor-pointer'
								onClick={() => removeIngredientButtonHandler(index)}
							/>
						</div>
					))}
				</div>

				{/* Add ingredient button */}
				<Button
					onClick={() => {
						setIngredients((prev) => [...prev, 'insert']);
					}}>
					Add Ingredient
				</Button>
			</div>

			{/* Directions row */}
			<div className='flex flex-col gap-4'>
				{/* Recipe Direction order */}
				<h2 className='text-3xl font-medium'>Directions</h2>

				{/* Horizontal separator */}
				<hr className='border-success-500' />

				{/* Direction items */}
				<div className='flex flex-col gap-2'>
					{directions.map((direction, index) => (
						<div
							key={index}
							className='flex gap-2 items-center'>
							{/* Description input */}
							<Textarea
								value={direction}
								onChange={(e) => {
									const directionsClone = [...directions];
									directionsClone[index] = e.target.value;
									setDirections(directionsClone);
								}}
								type='text'
							/>

							{/* "X" icon */}
							<Image
								alt='search icon'
								src='/icons/circle-xmark-solid.svg'
								width={25}
								height={25}
								className='mt-2 cursor-pointer'
								onClick={() => removeDirectionButtonHandler(index)}
							/>
						</div>
					))}
				</div>

				{/* Button */}
				<Button
					onClick={() => {
						setDirections((prev) => [...prev, 'insert']);
					}}>
					Add Direction
				</Button>
			</div>

			{/* Form error message */}
			<p className='text-red-500'>{errorMessage}</p>

			{/* Cancel and submit buttons */}
			<div className='flex gap-2'>
				{/* Cancel button */}
				<Button
					color='danger'
					fullWidth>
					Cancel
				</Button>

				{/* Submit button */}
				<Button
					type='submit'
					color='primary'
					fullWidth>
					Submit
				</Button>
			</div>
		</form>
	);
}
