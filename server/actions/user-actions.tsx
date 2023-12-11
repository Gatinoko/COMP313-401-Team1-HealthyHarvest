'use server';

import { redirect } from 'next/navigation';
import prismaClient from '@/prisma/prisma';
import { createUserSchema, loginUserSchema } from '../schemas/user-schemas';
import { Error } from '@/types/action-types';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { MAX_AGE, TOKEN_SECRET } from '@/auth/auth-config';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/**
 * Server action for the user sign-up form.
 *
 * @param {FormData} data - Client form data.
 */
export async function signUpUser(data: FormData) {
  // Assigns form values to object
  const formValues = {
    firstName: data.get('firstName') as string,
    lastName: data.get('lastName') as string,
    email: data.get('email') as string,
    username: data.get('username') as string,
    password: data.get('password') as string,
  };

  // Zod form schema validation
  createUserSchema.parse(formValues);

  // User variable to be used in credential validation
  let user;

  // Queries database to check if email is already registered
  try {
    user = await prismaClient().user.findUnique({
      where: {
        email: formValues.email,
      },
    });
  } catch (error: any) {
    return {
      message: error.message,
      cause: 'DB_ERROR',
    } as Error;
  }

  // Returns error if email already exists
  if (user !== null)
    return {
      message: 'Error. This email is already registered.',
      cause: 'EMAIL_ALREADY_EXISTS',
    } as Error;

  // Queries database to check if username already exists
  try {
    user = await prismaClient().user.findUnique({
      where: {
        username: formValues.username,
      },
    });
  } catch (error: any) {
    return {
      message: error.message,
      cause: 'DB_ERROR',
    } as Error;
  }

  // Returns error if username already exists
  if (user !== null)
    return {
      message: 'Error. This username is already taken.',
      cause: 'USERNAME_ALREADY_EXISTS',
    } as Error;

  // If all checks passed, create user database operation
  try {
    await prismaClient().user.create({
      data: formValues,
    });
  } catch (error: any) {
    console.log(error);
    return {
      message: 'Database error.',
      cause: 'DB_ERROR',
    } as Error;
  }

  // Redirects user to login page
  redirect('/login');
}

/**
 * Server action for the user login form.
 *
 * @param {FormData} data - Client form data.
 */
export async function loginUser(data: FormData) {
  // Checks if token cookie is already present in the browser
  if (cookies().get('token'))
    return {
      message: 'User already authenticated.',
      cause: 'ALREADY_AUTHENTICATED',
    } as Error;

  // Assigns form values to object
  const formValues = {
    email: data.get('email') as string,
    password: data.get('password') as string,
  };

  // Zod form schema validation
  loginUserSchema.parse(formValues);

  // Find user database operation
  let user;
  try {
    user = await prismaClient().user.findUnique({
      where: {
        email: formValues.email,
      },
    });
  } catch (error: any) {
    return {
      message: 'Database error.',
      cause: 'DB_ERROR',
    } as Error;
  }

  // If no user is found return error
  if (user === null)
    return {
      message: 'Error. This email is not registered.',
      cause: 'USER_NOT_FOUND',
    } as Error;

  // If user exists but passwords don't match return error
  if (formValues.password !== user.password)
    return {
      message: 'Error. Passwords do not match.',
      cause: 'INCORRECT_CREDENTIALS',
    } as Error;

  // Authenticates user and creates session with passport
  try {
    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
      TOKEN_SECRET
    );
    cookies().set('token', token, {
      maxAge: MAX_AGE,
    });
    passport.authenticate('jwt');
  } catch (error: any) {
    return {
      message: 'Authentication error.',
      cause: 'AUTH_ERROR',
    } as Error;
  }

  // Revalidates path
  revalidatePath('/login');
}
