import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

export const load = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	redirect(302, '/');
};

export const actions = {
	salir: async ({ cookies }: { cookies: Cookies }) => {
		// Me como la cookie
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});

		/* redirect the user
		redirect(302, '/login');
		*/
	}
};
