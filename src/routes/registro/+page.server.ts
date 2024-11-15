import type { RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { credentials } from '$lib/types/appTypes';
import { db } from '$lib/server/database/index';
import { users } from '$lib/server/database/schema';
import { eq } from 'drizzle-orm';


export const load = async () => {
  // todo
}


export const actions = {


  register: async ({ request, cookies }: RequestEvent) => {
    const data = Object.fromEntries(await request.formData())
    const validate = credentials.safeParse(data);
		if (!validate.success) {
			return fail(400, { mensaje: validate.error.errors[0].message });
		}

		if(String(data.password) !== String(data.password1)) return fail(400, { mensaje: 'Las contraseñas no coinciden' })

    const user = await db.select().from(users).where(eq(users.email, String(data.email)))

    if ( user.length!==1 ) return fail(400, { user: "Upss, tuvimos problemas:Intenta de nuevo" })

    const authenticatedUser = crypto.randomUUID();

		cookies.set('session', authenticatedUser, {
			// enviara la cookie en cada request
			path: '/',
			// vencimiento en 30 días
			maxAge: 60 * 60 * 24 * 30
		});

    await db.update(users).set({
      passwordHash: await bcrypt.hash(String(data.password), 10),
      tokenAuth: authenticatedUser,
    }).where(eq(users.email, String(data.email)))

    redirect(303, '/')
  }
}
