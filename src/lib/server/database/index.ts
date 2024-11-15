import { env } from '$env/dynamic/private';

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '$lib/server/database/schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL no fue definida en entorno');

	throw new Error('DATABASE_AUTH_TOKEN no fue definida en entorno');

const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });

export const db = drizzle(client, {schema ,casing: 'snake_case' });
