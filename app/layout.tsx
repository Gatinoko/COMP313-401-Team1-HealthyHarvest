import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navbar from '@/components/navbar/navbar';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PropsWithChildren } from 'react';
import { DecodedJwtPayload } from '@/types/action-types';
import { getJwtTokenAction } from '@/auth/actions/get-jwt-token-action';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Healthy Harvest',
	description:
		'A recipe builder for healthy eaters. User can browse various recipe made by other chiefs that meets their diet and nutritional needs.',
};

export default async function RootLayout({ children }: PropsWithChildren) {
	// Returns decoded authentication token
	const decodedJwtPayload = await getJwtTokenAction();

	return (
		<html
			lang='en'
			className='light'>
			<body className={inter.className}>
				<Providers decodedJwtPayload={decodedJwtPayload}>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
