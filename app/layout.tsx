import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navbar from '@/components/navbar/navbar';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Healthy Harvest',
	description:
		'A recipe builder for healthy eaters. User can browse various recipe made by other chiefs that meets their diet and nutritional needs.',
};

export default async function RootLayout({ children }: PropsWithChildren) {
	// Returns decoded authentication token
	function getAuthToken() {
		const jwtToken = cookies().get('token');
		return jwt.decode(jwtToken?.value as string);
	}

	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<Navbar jwtToken={getAuthToken()} />
					{children}
				</Providers>
			</body>
		</html>
	);
}
