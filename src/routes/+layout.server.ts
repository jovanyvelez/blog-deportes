import type { User } from "$lib/server/database/schema"
export const load = async ({ locals }: { locals: { user: User } }) => {
  if(locals.user){
    return {
      user: locals.user
    }
  }
}
