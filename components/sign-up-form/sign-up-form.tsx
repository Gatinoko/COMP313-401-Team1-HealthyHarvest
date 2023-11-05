import { signUpUser } from '@/server/actions/user-actions';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';

export default function SignUpForm() {
	const [errorMessage, setErrorMessage] = useState<String>('‎ ');

	async function signUpFormHandler(formData: FormData) {
		const serverResponse = await signUpUser(formData);
		if (serverResponse) setErrorMessage(serverResponse.message);
	}

	return (
		<form
			className='flex flex-col gap-2'
			action={signUpFormHandler}>
			<div className='flex gap-2'>
				{/* First name input field */}
				<Input
					key='firstName'
					type='text'
					label='First name'
					name='firstName'
					isRequired={true}
				/>

				{/* Last name input field */}
				<Input
					key='lastName'
					type='text'
					label='Last name'
					name='lastName'
					isRequired={true}
				/>
			</div>

			{/* Email input field */}
			<Input
				key='email'
				type='email'
				label='Email'
				name='email'
				isRequired={true}
			/>

			{/* Username input field */}
			<Input
				key='username'
				type='text'
				label='Username'
				name='username'
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

			{/* Sign up button */}
			<Button type='submit'>Sign Up</Button>
		</form>
	);
}
