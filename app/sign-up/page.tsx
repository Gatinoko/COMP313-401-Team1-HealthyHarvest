'use client';

import { Button, Input } from '@nextui-org/react';
import { signUpUser } from '@/server/actions/user-actions';
import SignUpForm from '@/components/sign-up-form/sign-up-form';

export default function Home() {
	return (
		<main className='mt-4 container mx-auto'>
			<SignUpForm />
		</main>
	);
}
