'use client';

import SignUpForm from '@/components/sign-up-form/sign-up-form';

export default function Home() {
	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			<h1 className='text-5xl'>Sign Up</h1>
			<SignUpForm />
		</main>
	);
}
