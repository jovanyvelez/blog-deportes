import { db } from '$lib/server/database';
import { temas as themes, articulos } from '$lib/server/database/schema';
import { desc, eq } from 'drizzle-orm';

export async function temas() {
	const secciones = await db.select().from(themes);
	return secciones;
}

export async function nombreTemas() {
  const temas = await db.query.temas.findMany({
    columns: { id: true, tema: true }
  });
  return temas;
}

export async function articuloPorId(articuloId: number) {
  const articulo = await db.query.articulos.findFirst({
    columns: { id: true, noticia: true },
    where: eq(articulos.id, articuloId)
  });
  return articulo;
}

export async function articulosPorTema(temaId: number) {
	const escritos = await db.query.articulos.findMany({
		columns: { id: true, titular: true, fecha: true },
		with: { usuario: { columns: { nombre: true, apellido: true } } },

		where: eq(articulos.idTema, temaId)
	}) as Array<{ id: number; titular: string | null; fecha: number; usuario: { nombre: string; apellido: string }; fecha1?: string }>;

	escritos.forEach((escrito) => {
		const fecha = new Date(escrito.fecha);
		const year = fecha.getFullYear();
		const month = fecha.getMonth() + 1;
		const day = fecha.getDate();
		escrito.fecha1 = `${year}-${month}-${day}`;
	});
	return escritos;
}

export async function articulosPorEscritor(escritorId: number) {
	const escritos = await db
		.select({ id: articulos.id, titulo: articulos.titular })
		.from(articulos)
		.where(eq(articulos.idUsuario, escritorId))
		.orderBy(desc(articulos.fecha));
	return escritos;
}

export async function articulosNoticiaEscritor(noticiaId: number) {
	const escrito = await db
		.select({ id: articulos.id, noticia: articulos.noticia })
		.from(articulos)
		.where(eq(articulos.id, noticiaId));
	return escrito;
}
