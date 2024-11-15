import { redirect } from "@sveltejs/kit"
import type { User } from "$lib/server/database/schema"
import { articulosPorEscritor, temas } from "$lib/server/consultas/selectQueries"


export const load = async ({locals}:{locals:{user:User}})=>{
  if(!locals.user) redirect(302, '/')
  const posts = await articulosPorEscritor(locals.user.id)
  return {
    posts
  }
}
