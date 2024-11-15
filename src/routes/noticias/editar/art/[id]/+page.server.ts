import { error } from '@sveltejs/kit';
import { articulosNoticiaEscritor } from '$lib/server/consultas/selectQueries';
import { actualizaArticulo } from '$lib/server/actualizar/updateQueries';
/** @type {import('./$types').PageLoad} */

export async function load({ params }) {
	if (params.id) {
		const articulo = await articulosNoticiaEscritor(Number(params.id));
		return { articulo: articulo[0] };
	}
	return error(404, 'Not found');
}
export const actions = {
	update: async ({ request }: { request: Request}) => {
	  const data = Object.fromEntries(await request.formData());
		await actualizaArticulo(String(data.noticia), Number(data.id));
	}
};
