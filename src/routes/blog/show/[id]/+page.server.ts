import { error } from "@sveltejs/kit"
import { articuloPorId } from "$lib/server/consultas/selectQueries";

export async function load({params}){

  if(params.id){
    const tema = await articuloPorId(params.id);
    return { tema };
  }
  return error(404, "Not found");
}
