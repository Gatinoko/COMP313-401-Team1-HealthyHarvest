'use client';

import React, { PropsWithChildren } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import AuthContextProvider from '@/context/auth-context';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { DecodedJwtPayload } from '@/types/action-types';

export type ProvidersProps = {
	decodedJwtPayload: DecodedJwtPayload;
} & PropsWithChildren;

export const Providers = ({ decodedJwtPayload, children }: ProvidersProps) => {
	return (
		<NextUIProvider>
			<AuthContextProvider
				defaultAuthInformationValue={
					decodedJwtPayload
						? {
								isAuthenticated: true,
								...decodedJwtPayload,
						  }
						: {
								isAuthenticated: false,
						  }
				}>
				{children}
			</AuthContextProvider>
		</NextUIProvider>
	);
};
