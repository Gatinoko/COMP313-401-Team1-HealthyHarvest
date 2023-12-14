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
				href='/'>
				<div className='w-8 h-8 bg-green-400 rounded-md me-2'></div>
				<p className='font-bold text-inherit'>Healthy Harvest</p>
			</NavbarBrand>

			<NavbarContent
				justify='end'
				className='flex gap-4'>
				{authInformation.isAuthenticated ? (
					<>
						{/* Search input */}
						<NavbarItem className='hidden lg:flex'>
							<Input
								className='border rounded-xl'
								placeholder='Salads, bean soup...'
								endContent={
									<Image
										alt='search icon'
										src='/icons/magnifying-glass-solid.svg'
										width={30}
										height={30}
									/>
								}
							/>
						</NavbarItem>

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
								{/* User profile */}
								<DropdownItem
									key='profile'
									className='h-14 gap-2'
									href='/profile'>
									<p className='font-semibold'>
										{`Welcome, ${authInformation.username}!`}
									</p>
									{authInformation.email}
								</DropdownItem>

								{/* Create Recipe */}
								<DropdownItem
									key='create-recipe'
									href='/create-recipe'>
									Create Recipe
								</DropdownItem>

								{/* View Owned Recipes */}
								<DropdownItem
									key='view-own-recipes'
									href={`/view-user-recipes/${authInformation.id}`}>
									View Owned Recipes
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
								href='/sign-up'
								variant='flat'>
								Sign Up
							</Button>
						</NavbarItem>

						{/* Login page button */}
						<NavbarItem>
							<Button
								as={Link}
								href='/login'
								variant='flat'>
								Login
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navigation>
	);
}
