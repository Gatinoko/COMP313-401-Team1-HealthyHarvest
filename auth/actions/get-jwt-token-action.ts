import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { DecodedJwtPayload } from '@/types/action-types';

/**
 * Server action for getting the authentication token.
 */
export async function getJwtTokenAction() {
	const jwtToken = cookies().get('token');
	return jwt.decode(jwtToken?.value as string) as DecodedJwtPayload;
}
