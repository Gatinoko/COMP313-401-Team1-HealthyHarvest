import { cookies } from 'next/headers';

export async function DELETE() {
	cookies().delete('token');
	return new Response(null, { status: 204 });
}
