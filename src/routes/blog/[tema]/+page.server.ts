import { error } from '@sveltejs/kit';
import { articulosPorTema } from '$lib/server/consultas/selectQueries';
/** @type {import('./$types').PageLoad} */

export async function load({ params }) {
	if (params.tema) {
		const allArticulos = await articulosPorTema(params.tema);
		return { allArticulos };
	}
	return error(404, 'Not found');
}
