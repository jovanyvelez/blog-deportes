import { db } from "$lib/server/database"
import { articulos } from "$lib/server/database/schema"
import { eq } from "drizzle-orm";



export async function crearArticulo(article:string, idTema:number, idUsuario:number, titulo:string) {

  console.log(article, idTema, idUsuario, titulo)

  const articulo = await db.insert(articulos).values(
    {
      noticia: article,
      titular: titulo,
      idTema: idTema,
      idUsuario: idUsuario,
      fecha: new Date()
    }
  ).returning();

  console.log(articulo)
}
