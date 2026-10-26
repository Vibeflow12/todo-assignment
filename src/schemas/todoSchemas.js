import z from 'zod'

export const todoSchema = z.object({
  title: z.string().trim().min(3, "title must be minimum of 3 characters"),
  description: z.string({message:"description must be a string"}).optional(),
})
