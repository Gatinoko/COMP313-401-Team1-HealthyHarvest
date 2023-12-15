'use client';

import React from 'react';
import {
	Navbar as Navigation,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Image,
	Input,
	Dropdown,
	DropdownTrigger,
	Avatar,
	DropdownMenu,
	DropdownItem,
	Button,
	Link,
} from '@nextui-org/react';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { logoutUser } from '@/server/actions/user-actions';

export type NavbarProps = {};

export default function Navbar(props: NavbarProps) {
	// Auth context information
	const { authInformation } = useContext(AuthContext);

	// Logout button handler function
	async function logoutButtonHandler() {
		await logoutUser();

		// Trigger DOM full reload
		window.location.reload();
	}

	return (
		<Navigation>
			<NavbarBrand
				as={Link}
				href='/'
				className='text-default-50 font-bold'>
				<div className='w-fit py-1 px-2 bg-success-600 rounded-md me-2'>
					Healthy Harvest
				</div>
			</NavbarBrand>

			<NavbarContent
				justify='end'
				className='flex gap-4'>
				{authInformation.isAuthenticated ? (
					<>
						<div className='flex gap-2'>
							{/* Sign-up page button */}
							<NavbarItem>
								<Button
									as={Link}
									size='sm'
									key='create-recipe'
									href='/create-recipe'
									variant='flat'>
									Create Recipe
								</Button>
							</NavbarItem>

							{/* Login page button */}
							<NavbarItem>
								<Button
									as={Link}
									size='sm'
									key='view-own-recipes'
									href={`/view-user-recipes/${authInformation.id}`}
									variant='flat'>
									View User Recipes
								</Button>
							</NavbarItem>
						</div>

						{/* Avatar with dropdown menu */}
						<Dropdown placement='bottom-end'>
							{/* Avatar */}
							<DropdownTrigger>
								<Avatar
									isBordered
									as='button'
									className='transition-transform'
									size='sm'
									src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
								/>
							</DropdownTrigger>

							{/* Dropdown menu */}
							<DropdownMenu
								aria-label='Profile Actions'
								variant='flat'>
								{/* Welcome message */}
								<DropdownItem
									key='welcome-message'
									className='h-14 gap-2'>
									<p className='text-success-600 font-semibold'>
										{`Welcome, ${authInformation.username}!`}
									</p>
									<p className='font-semibold'>{authInformation.email}</p>
								</DropdownItem>

								{/* User profile */}
								<DropdownItem
									key='profile'
									href='/profile'>
									Profile
								</DropdownItem>

								{/* Logout button */}
								<DropdownItem
									key='logout'
									onClick={logoutButtonHandler}>
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</>
				) : (
					<>
						{/* Sign-up page button */}
						<NavbarItem>
							<Button
								as={Link}
								size='sm'
								href='/sign-up'
								variant='flat'
								className='bg-transparent'>
								Sign Up
							</Button>
						</NavbarItem>

						{/* Login page button */}
						<NavbarItem>
							<Button
								as={Link}
								size='sm'
								href='/login'
								variant='flat'
								className='bg-transparent'>
								Login
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navigation>
	);
}
