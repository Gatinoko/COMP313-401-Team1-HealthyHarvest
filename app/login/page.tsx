'use client';

import LoginForm from '@/components/login-form/login-form';

export default function Home() {
	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			<h1 className='text-5xl'>Login</h1>
			<LoginForm />
		</main>
	);
}
