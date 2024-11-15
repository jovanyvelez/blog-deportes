import {z} from 'zod'

export const credentials = z.object({
  email: z.string({required_error:"Se requiere email"}).email({message:"Email:no es un correo válido"}).trim(),
  password: z.string().min(8,{message:"Password: Mìnimo 8 caracteres"}).max(100)
})

export type Credentials = z.infer<typeof credentials>
