'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import AuthContextProvider from '@/context/auth-context';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<NextUIProvider>
			<AuthContextProvider>{children}</AuthContextProvider>
		</NextUIProvider>
	);
};
