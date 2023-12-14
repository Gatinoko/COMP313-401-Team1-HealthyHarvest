'use client';

import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { updateProfile } from '@/server/actions/user-actions';

export default function Profile() {
  // HTML form element reference
  const formElementRef = useRef<HTMLFormElement>(null);
  const { authInformation, setAuthInformation } = useContext(AuthContext);

  // Error message
  const [errorMessage, setErrorMessage] = useState<String>('‎ ');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (authInformation) {
      const { firstName, lastName, email, username } = authInformation;
      const profileClone = { ...profile };
      profileClone.firstName = firstName + '';
      profileClone.lastName = lastName + '';
      profileClone.email = email + '';
      profileClone.username = username + '';
      setProfile(profileClone);
    }
  }, [authInformation]);

  // Sign up form handler function
  async function profileFormHandler(formData: FormData) {
    const serverResponse = await updateProfile(
      formData,
      authInformation.id + ''
    );
    if (serverResponse) setErrorMessage(serverResponse.message);
    else {
      console.log(errorMessage);
      formElementRef.current?.reset();
      setErrorMessage('‎ ');
    }
  }

  return (
    <main className='mt-4 container mx-auto flex flex-col gap-4'>
      <h1 className='text-5xl'>Edit Profile</h1>
      <form
        ref={formElementRef}
        className='flex flex-col gap-2'
        action={profileFormHandler}
      >
        <div className='flex gap-2'>
          {/* First name input field */}
          <Input
            key='firstName'
            type='text'
            label='First name'
            name='firstName'
            value={profile.firstName}
            onChange={(e) => handleChange(e)}
            isRequired={true}
          />

          {/* Last name input field */}
          <Input
            key='lastName'
            type='text'
            label='Last name'
            name='lastName'
            value={profile.lastName}
            onChange={(e) => handleChange(e)}
            isRequired={true}
          />
        </div>

        <Input
          key='email'
          type='email'
          label='Email'
          name='email'
          value={profile.email}
          onChange={(e) => handleChange(e)}
          isRequired={true}
        />

        {/* Username input field */}
        <Input
          key='username'
          type='text'
          label='Username'
          name='username'
          value={profile.username}
          onChange={(e) => handleChange(e)}
          isRequired={true}
        />

        {/* Password input field */}
        <Input
          key='password'
          type='password'
          label='New Password'
          name='password'
          value={profile.password}
          onChange={(e) => handleChange(e)}
          isRequired={true}
        />

        {/* Form error message */}
        <p className='text-red-500'>{errorMessage}</p>

        {/* Sign up button */}
        <Button type='submit'>Update Profile</Button>
      </form>
    </main>
  );
}
