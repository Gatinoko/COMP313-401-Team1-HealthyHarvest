'use server'
import prismaClient from "@/prisma/prisma";
import { createRecipeSchema } from "../schemas/recipe-schemas";

/**
 * Server action for the create recipe form
 * 
 * @param {FormData} data - Client form data
 */
export async function createRecipe(data: FormData, userId: string) {
    const formValues = {
        title: data.get('title') as string,
        imageUrl: data.get('imageUrl') as string, 
        description: data.get('desc') as string,
        servings: Number(data.get('servings')),
        yield: data.get('yield') as string,
        prepTime: data.get('prepTime') as string,
        cookTime: data.get('cookTime') as string,
        public: data.get('public') === 'true',
        userId: userId,
        ingredients: JSON.parse(data.get('ingredients') as string),
        directions: JSON.parse(data.get('directions') as string),  
        note: data.get('note') as string 
    };
    createRecipeSchema.parse(formValues);

    try {
        const recipe = await prismaClient().recipe.create({
            data: formValues,
        });
        return recipe;
    } catch(error: any) {
        return {
            message: error.message,
            cause: 'DB_ERROR'
        };
    }
}

//Get single recipe by ID
export async function getRecipeById(id: string) {
    try {
        const recipe = await prismaClient().recipe.findUnique({
            where: { id },
        });
        return recipe;
    }catch(error: any){
        return {
            message: error.message
        }
    }
}

//Get recipes by user
export async function getRecipesByUser(userId: string) {
    try {
        const recipe = await prismaClient().recipe.findMany({
            where: { userId: userId },
        });
     } catch(error: any){
        console.log(error);
        return {
            message: error.message,
            cause: 'DB_ERROR',
        
        };
    }
}

//update a recipe
export async function updateRecipe(recipeId: string, data: FormData, currentUser: {userId: string}) {
    const formValues = {
        title: data.get('title') as string,
        imageUrl: data.get('imageUrl') as string, 
        description: data.get('desc') as string,
        servings: Number(data.get('servings')),
        yield: data.get('yield') as string,
        prepTime: data.get('prepTime') as string,
        cookTime: data.get('cookTime') as string,
        public: data.get('public') === 'true',
        ingredients: JSON.parse(data.get('ingredients') as string),
        directions: JSON.parse(data.get('directions') as string),  
        note: data.get('note') as string
    };

    const recipe = await prismaClient().recipe.findUnique({
        where: { id: recipeId },
    });

    //check that recipe exists and if the currentUser is the publisher
    if(!recipe) {
        return { message: 'Recipe not found.', cause: 'NOT_FOUND'};
    }else if (recipe.userId !== currentUser.userId) {
        return { message: 'Unauthorized access.', cause: 'UNAUTHORIZED'};
    }
    try {
        await prismaClient().recipe.update({
            where: { id: recipeId },
            data: formValues,
        });
    }catch(error:any) {
        console.error(error);
        return {
            message: error.message,
            cause: 'DB_ERROR',
        };
    }
    //redirect or send response tbd
}

//delete a recipe
export async function deleteRecipe(recipeId: string, currentUser: { userId: string }) {
    const recipe = await prismaClient().recipe.findUnique({
        where: { id: recipeId },
    });

    if(!recipe) {
        return { message: 'Recipe not found.', cause: 'NOT_FOUND'};
    } else if (recipe.userId !== currentUser.userId) {
        return { message: 'Unauthorized access.', cause: 'UNAUTHORIZED'};
    }
    try {
        await prismaClient().recipe.delete({
            where: { id: recipeId },
        });
    }catch(error:any){
        console.error(error);
        return {
            message: error.message,
            cause: 'DB_ERROR',
        }
    }
}
