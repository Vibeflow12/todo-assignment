import z from 'zod'

export const todoSchema = z.object({
  title: z.string().trim().min(3, "title must be minimum of 3 characters"),
  description: z.string({ message: "description must be a string" }).optional(),
})

export const paginationSchema = z.object({
  completed: z
    .enum(["true", "false"])
    .optional()
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : undefined,
    ),
  search: z.string().optional(),
  page: z.string().optional().default("1").transform(Number),
  limit: z.string().optional().default("10").transform(Number),
});
