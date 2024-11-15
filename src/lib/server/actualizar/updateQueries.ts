import { db } from "$lib/server/database"
import { articulos } from "$lib/server/database/schema"
import { eq } from "drizzle-orm";



export async function actualizaArticulo(article: string, id: number) {

  await db.update(articulos).set({
    noticia: article
  })
    .where(eq(articulos.id, id))
}
