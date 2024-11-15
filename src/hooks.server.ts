import type { Handle } from '@sveltejs/kit'
import { db } from '$lib/server/database/index'
import { users  } from '$lib/server/database/schema'
import { eq } from 'drizzle-orm'


export const handle: Handle = async ({ event, resolve }) => {

    const session = event.cookies.get('session')

    if (!session) {
        // if there is no session load page as normal
        return await resolve(event)
    }

    const user = await db.select().from(users).where(eq(users.tokenAuth, session));

    if (!user || user.length === 0) {
        // if the session is invalid, remove the cookie and load page as normal
        event.cookies.set('session', '', {
            path: '/',
            expires: new Date(0),
          }
        )
        return await resolve(event)
    }

    event.locals.user = user[0]


    return await resolve(event)
}
