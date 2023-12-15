'use client';

import { loginUser } from '@/server/actions/user-actions';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function LoginForm() {
	// Router
	const router = useRouter();

	// HTML form element reference
	const formElementRef = useRef<HTMLFormElement>(null);

	// Error message
	const [errorMessage, setErrorMessage] = useState<string>('‎ ');

	// Login form handler function
	async function loginFormHandler(formData: FormData) {
		const serverResponse = await loginUser(formData);
		if (serverResponse) setErrorMessage(serverResponse.message);
		else {
			formElementRef.current?.reset();
			setErrorMessage('‎ ');

			// Trigger DOM full reload
			window.location.reload();
		}
	}

	return (
		<div className='bg-success-100 flex flex-col gap-4 rounded-3xl p-6'>
			{/* Title */}
			<h1 className='text-3xl font-medium'>Login</h1>

			{/* Horizontal separator */}
			<hr className='border-success-500' />

			<form
				ref={formElementRef}
				className='flex flex-col gap-2'
				action={loginFormHandler}>
				{/* Email input field */}
				<Input
					key='email'
					type='text'
					label='Email'
					name='email'
					isRequired={true}
				/>

				{/* Password input field */}
				<Input
					key='password'
					type='password'
					label='Password'
					name='password'
					isRequired={true}
				/>

				{/* Form error message */}
				<p className='text-red-500'>{errorMessage}</p>

				{/* Login button */}
				<Button type='submit'>Login</Button>
			</form>
		</div>
	);
}
