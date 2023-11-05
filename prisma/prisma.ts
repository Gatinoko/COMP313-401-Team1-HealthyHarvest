import { PrismaClient } from '@prisma/client';

const PRISMA_CLIENT = new PrismaClient();

/**
 * Returns the application's PrismaClient instance.
 */
export default function prismaClient() {
	return PRISMA_CLIENT;
}
