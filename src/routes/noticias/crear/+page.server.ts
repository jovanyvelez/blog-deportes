import { nombreTemas } from '$lib/server/consultas/selectQueries';
import { crearArticulo } from '$lib/server/escrituras/insertQueries';
import { fail } from '@sveltejs/kit';

export const load = async () => {
  const temas = await nombreTemas()
  return { temas }
}

export const actions = {
	grabar: async ({ request }: { request: Request }) => {
		const data = Object.fromEntries(await request.formData());

		if(String(data.texto).length<200) return fail(400,{message:'El texto debe tener al menos 200 caracteres'})

		if(String(data.titulo).length<10) return fail(400,{message:'El ttitulo es muy corto'})

		if(Number(data.tema) < 1 ) return fail(400,{message:'Debe seleccionar un tema'})

		if(!Number(data.codUsuario) ) return fail(400,{message:'Ocurrió un problema con el usuario'})

		await crearArticulo(String(data.texto), parseInt(data.tema), parseInt(data.codUsuario), String(data.titulo));
	}
};
