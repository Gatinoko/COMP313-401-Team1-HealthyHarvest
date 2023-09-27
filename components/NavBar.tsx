'use client';

import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Link,
  Button,
} from '@nextui-org/react';

const NavBar = () => {
  const [user, setUser] = useState(null);
  return (
    <Navbar>
      <NavbarBrand>
        <div className='w-8 h-8 bg-green-400 rounded-md me-2'></div>
        <p className='font-bold text-inherit'>Healthy Harvest</p>
      </NavbarBrand>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <div className='flex items-center gap-1'>
            <p className='font-bold text-inherit'>Search</p>
            <Input className='border rounded-xl' />
          </div>
        </NavbarItem>
        {!user && (
          <NavbarItem className='hidden lg:flex'>
            <Link href='#'>Login</Link>
          </NavbarItem>
        )}
        {!user && (
          <NavbarItem>
            <Button as={Link} color='primary' href='#' variant='flat'>
              Sign Up
            </Button>
          </NavbarItem>
        )}
        {user && (
          <NavbarItem>
            <Button as={Link} color='primary' href='#' variant='flat'>
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
