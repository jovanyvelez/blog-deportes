import { credentials } from '$lib/types/appTypes';
import type { Cookies } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/server/database/index';
import { users } from '$lib/server/database/schema';
import { eq } from 'drizzle-orm';

export const load = async ({locals}) => {
  if(locals.user) redirect(302, '/');
};

export const actions = {
	login: async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
		const data = Object.fromEntries(await request.formData());
		const validate = credentials.safeParse(data);
		if (!validate.success) {
			return fail(400, { mensaje: validate.error.errors[0].message });
		}

		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, String(data.email)));


		if (!user || user.length === 0 ) {
			return fail(400, { credentials: true });
		}

		if (user.length > 1) {
			return fail(400, { duplicate: true });
		}

		if(user[0].passwordHash === null) redirect(302, '/registro');

		const findpass = await bcrypt.compare(String(data.password), user[0].passwordHash);

		if (!findpass) {
			return fail(400, { credentials: true });
		}

		const authenticatedUser = crypto.randomUUID();

		await db
			.update(users)
			.set({ tokenAuth: authenticatedUser })
			.where(eq(users.email, String(data.email)));

		cookies.set('session', authenticatedUser, {
			// enviara la cookie en cada request
			path: '/',
			// vencimiento en 30 días
			maxAge: 60 * 60 * 24 * 30
		});

		// redirect the user
		redirect(302, '/');
	}
};
