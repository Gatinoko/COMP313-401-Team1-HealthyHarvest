import { signUpUser } from '@/server/actions/user-actions';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function SignUpForm() {
	// HTML form element reference
	const formElementRef = useRef<HTMLFormElement>(null);

	// Error message
	const [errorMessage, setErrorMessage] = useState<String>('‎ ');

	// Sign up form handler function
	async function signUpFormHandler(formData: FormData) {
		const serverResponse = await signUpUser(formData);
		if (serverResponse) setErrorMessage(serverResponse.message);
		else {
			console.log(errorMessage);
			formElementRef.current?.reset();
			setErrorMessage('‎ ');
		}
	}

	return (
		<div className='bg-success-100 flex flex-col gap-4 rounded-3xl p-6'>
			{/* Title */}
			<h1 className='text-3xl font-semibold'>Sign Up</h1>

			{/* Horizontal separator */}
			<hr className='border-success-500' />
			<form
				ref={formElementRef}
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
				<p className='text-red-500'>{errorMessage}</p>

				{/* Sign up button */}
				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
}
