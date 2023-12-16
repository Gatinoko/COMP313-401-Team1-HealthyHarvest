'use client';

import SignUpForm from '@/components/sign-up-form/sign-up-form';

export default function Home() {
	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			<SignUpForm />
		</main>
	);
}
