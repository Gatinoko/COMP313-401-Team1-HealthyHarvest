'use client';

import {
  faMagnifyingGlass,
  faCircleXmark,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { useState } from 'react';

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState([
    { id: uuidv4(), placeholder: 'e.g. 2 cups flour, sifted' },
    { id: uuidv4(), placeholder: 'e.g. 1 cup sugar' },
    { id: uuidv4(), placeholder: 'e.g. 2 tablespoons butter, softened' },
  ]);

  const [directions, setDirections] = useState([
    {
      id: uuidv4(),
      placeholder: 'e.g. Preheat oven to 350 degrees F...',
    },
    {
      id: uuidv4(),
      placeholder: 'e.g. Combine all dry ingredients in a large bowl...',
    },
    {
      id: uuidv4(),
      placeholder: 'e.g. Pour into greased trays and bake for 15-20 minutes...',
    },
  ]);

  function removeIngredient(ingredientId: string) {
    const ingredientsClone = ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    setIngredients((prev) => ingredientsClone);
  }

  function removeDirection(directionId: string) {
    const directionsClone = directions.filter(
      (direction) => direction.id !== directionId
    );
    setDirections((prev) => directionsClone);
  }

  return (
    <main className='mt-4 container mx-auto flex flex-col gap-4'>
      <h1 className='text-5xl my-4'>Create Recipe</h1>
      <form className='flex flex-col gap-4 w-1/2 mb-56'>
        {/* Recipe General Description */}
        <div className='flex w-full flex-wrap sm:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input
            type='text'
            label='Recipe Title'
            placeholder='recipe title'
            labelPlacement='outside'
            startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          />
          <Input
            type='file'
            label='Image Upload'
            placeholder='recipe title'
            labelPlacement='outside'
            className=''
          />
        </div>
        <Textarea
          type='text'
          label='Recipe Description'
          placeholder='recipe description'
          labelPlacement='outside'
        />
        <Divider />
        {/* Recipe Ingredients order */}
        <h2 className='text-4xl my-3'>Ingredients</h2>
        {ingredients.map(({ id, placeholder }) => (
          <div key={id} className='flex gap-2 justify-center items-center'>
            <Input type='text' placeholder={placeholder} />
            <FontAwesomeIcon
              className='cursor-pointer'
              size='xl'
              icon={faCircleXmark}
              onClick={() => removeIngredient(id)}
            />
          </div>
        ))}
        <Button
          onClick={() => {
            setIngredients((prev) => [
              ...prev,
              { id: uuidv4(), placeholder: 'insert' },
            ]);
          }}
        >
          Add Ingredient
        </Button>
        <Divider />
        {/* Recipe Direction order */}
        <h2 className='text-4xl my-3'>Directions</h2>
        {directions.map(({ id, placeholder }) => (
          <div key={id} className='flex gap-2 justify-center items-start'>
            <Textarea type='text' placeholder={placeholder} />
            <FontAwesomeIcon
              className='cursor-pointer mt-4'
              size='xl'
              icon={faCircleXmark}
              onClick={() => removeDirection(id)}
            />
          </div>
        ))}
        <Button
          onClick={() => {
            setDirections((prev) => [
              ...prev,
              { id: uuidv4(), placeholder: 'insert' },
            ]);
          }}
        >
          Add Direction
        </Button>
        <Divider />
        {/* Recipe Serving Description */}
        <div className='flex w-full flex-wrap sm:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input
            type='text'
            label='Servings'
            placeholder='e.g. 8'
            labelPlacement='outside'
          />
          <Input
            type='text'
            label='Yield (Optional)'
            placeholder='e.g. 1 9-inch cake'
            labelPlacement='outside'
          />
        </div>
        <Divider />
        {/* Recipe Time Description */}
        <div className='flex items-center gap-3'>
          <label className='block w-44 grow'>Prep Time</label>
          <Input type='number' label='' className='w-20' />
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
        <h3 className='text-2xl my-3'>Note (Optional)</h3>
        <Button
          color='danger'
          variant='bordered'
          className='w-fit text-black'
          size='lg'
          startContent={<FontAwesomeIcon icon={faPlus} />}
        >
          Add Note
        </Button>
        <Divider />
        {/* Recipe Accessibility */}
        <h3 className='text-2xl mt-3'>Make this recipe public?</h3>
        <RadioGroup>
          <Radio value='true'>Yes, make it accessible for everyone</Radio>
          <Radio value='false'>No, I want to keep it private</Radio>
        </RadioGroup>
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
      </form>
    </main>
  );
}
