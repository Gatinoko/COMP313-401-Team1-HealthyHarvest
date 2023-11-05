'use client';

import { loginUser } from '@/server/actions/user-actions';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';

export default function LoginForm() {
	const [errorMessage, setErrorMessage] = useState<String>('‎ ');

	async function loginFormHandler(formData: FormData) {
		const serverResponse = await loginUser(formData);
		if (serverResponse) setErrorMessage(serverResponse.message);
	}

	return (
		<form
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
			<p>{errorMessage}</p>

			{/* Login button */}
			<Button type='submit'>Login</Button>
		</form>
	);
}
