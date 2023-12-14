'use client';

import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { createRecipe } from '@/server/actions/recipe-actions';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/util/uploadthing';

export default function CreateRecipe() {
  const { authInformation } = useContext(AuthContext);

  type BodyType = {
    title: string;
    description: string;
    imageUrl: string;
    servings: number;
    yieldAmount: number;
    isPublic: boolean;
    prepTime: string;
    cookTime: string;
    note: string;
    userId: string;
  };

  const [body, setBody] = useState<BodyType>({
    title: '',
    description: '',
    imageUrl: '',
    servings: 0,
    yieldAmount: 0,
    isPublic: true,
    prepTime: '20mins',
    cookTime: '10mins',
    note: '',
    userId: '',
  });
  useEffect(() => {
    if (authInformation) {
      const bodyClone = { ...body };
      bodyClone.userId = authInformation.id + '';
      setBody(bodyClone);
    }
  }, [authInformation]);

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

  function handleChange(e: any) {
    const { name, value } = e.target;
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function removeIngredient(ingredientIndex: number) {
    const ingredientsClone = ingredients.filter(
      (_, index) => ingredientIndex !== index
    );
    setIngredients((prev) => ingredientsClone);
  }

  function removeDirection(directionIndex: number) {
    const directionsClone = directions.filter(
      (_, index) => directionIndex !== index
    );
    setDirections((prev) => directionsClone);
  }

  const router = useRouter();

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    const bodyClone = { ...body };
    const newBody = { ...bodyClone, ingredients, directions };

    try {
      await createRecipe(newBody);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className='mt-4 container mx-auto flex flex-col gap-4'>
      <h1 className='text-5xl my-4'>Create Recipe</h1>
      <form onSubmit={(e) => submitForm(e)} className='flex gap-8'>
        {/* Recipe General Description */}
        <div className='flex w-1/2 flex-col gap-4 mb-56'>
          <div className='flex w-full flex-wrap sm:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='text'
              name='title'
              onChange={(e) => handleChange(e)}
              label='Recipe Title'
              placeholder='recipe title'
              labelPlacement='outside'
              startContent={
                <Image
                  alt='search icon'
                  src='/icons/magnifying-glass-solid.svg'
                  width={20}
                  height={20}
                />
              }
            />
            <UploadButton
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {
                console.log('Upload successful');
                const bodyClone = { ...body, imageUrl: res[0].url };
                setBody((prev) => bodyClone);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <Textarea
            name='description'
            onChange={(e) => handleChange(e)}
            type='text'
            label='Recipe Description'
            placeholder='recipe description'
            labelPlacement='outside'
          />
          <Divider />
          {/* Recipe Ingredients order */}
          <h2 className='text-4xl my-3'>Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <div key={index} className='flex gap-2 justify-center items-center'>
              <Input
                type='text'
                value={ingredient}
                onChange={(e) => {
                  const ingredientClone = [...ingredients];
                  ingredientClone[index] = e.target.value;
                  setIngredients(ingredientClone);
                }}
              />
              <Image
                alt='search icon'
                src='/icons/circle-xmark-solid.svg'
                width={25}
                height={25}
                className='cursor-pointer'
                onClick={() => removeIngredient(index)}
              />
            </div>
          ))}
          <Button
            onClick={() => {
              setIngredients((prev) => [...prev, 'insert']);
            }}
          >
            Add Ingredient
          </Button>
          <Divider />
          {/* Recipe Direction order */}
          <h2 className='text-4xl my-3'>Directions</h2>
          {directions.map((direction, index) => (
            <div key={index} className='flex gap-2 justify-center items-start'>
              <Textarea
                value={direction}
                onChange={(e) => {
                  const directionsClone = [...directions];
                  directionsClone[index] = e.target.value;
                  setDirections(directionsClone);
                }}
                type='text'
              />
              <Image
                alt='search icon'
                src='/icons/circle-xmark-solid.svg'
                width={25}
                height={25}
                className='mt-2 cursor-pointer'
                onClick={() => removeDirection(index)}
              />
            </div>
          ))}
          <Button
            onClick={() => {
              setDirections((prev) => [...prev, 'insert']);
            }}
          >
            Add Direction
          </Button>
          <Divider />
          {/* Recipe Serving Description */}
          <div className='flex w-full flex-wrap sm:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              name='servings'
              onChange={(e) => handleChange(e)}
              type='number'
              label='Servings'
              placeholder='e.g. 8'
              labelPlacement='outside'
            />
            <Input
              name='yieldAmount'
              type='number'
              onChange={(e) => handleChange(e)}
              label='Yield (Optional)'
              placeholder='e.g. 1 9-inch cake'
              labelPlacement='outside'
            />
          </div>
          <Divider />
          {/* Recipe Time Description */}
          <div className='flex items-center gap-3'>
            <label className='block w-44 grow'>Prep Time</label>
            <Input type='number' className='w-20' />
            <Select
              className='grow'
              label='Select the metric'
              labelPlacement='inside'
            >
              <SelectItem key={'prep:mins'}>mins</SelectItem>
              <SelectItem key={'prep:hours'}>hours</SelectItem>
              <SelectItem key={'prep:days'}>days</SelectItem>
            </Select>
          </div>
          <div className='flex items-center gap-3'>
            <label className='block w-44 grow'>Cooking Time</label>
            <Input type='number' label='' className='w-20 h-full' />
            <Select
              className='grow'
              label='Select the metric'
              labelPlacement='inside'
            >
              <SelectItem key={'cooking:mins'}>mins</SelectItem>
              <SelectItem key={'cooking:hours'}>hours</SelectItem>
              <SelectItem key={'cooking:days'}>days</SelectItem>
            </Select>
          </div>
          <Divider />
          {/* Recipe Note */}
          <Textarea
            name='note'
            value={body.note}
            onChange={(e) => handleChange(e)}
            type='text'
            label='Note (Optional)'
            placeholder='recipe note'
            labelPlacement='outside'
          />
          <Divider />
          {/* Buttons */}
          <div className='flex justify-end w-full flex-wrap sm:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Button size='lg' variant='light'>
              Cancel
            </Button>
            <Button type='submit' size='lg' color='danger'>
              Submit
            </Button>
          </div>
          <Divider />
        </div>
        <div>
          <Image
            src={body.imageUrl ? body.imageUrl : ''}
            alt='recipe image'
            height={200}
            width={350}
          />
        </div>
      </form>
    </main>
  );
}
