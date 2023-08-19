import { IncomeExpenseType } from "@prisma/client";
import { z } from "zod";

export const IncomeExpenseValidator = z.object({
  title: z.string().max(26, { message: "Title must be at least 26 characters" }),
  amount: z.number(),
  type: z.nativeEnum(IncomeExpenseType),
  date: z.date(),
  category: z.string(),
  description: z.string().max(50, { message: "Title must be at least 50 characters" }),
})

export type IncomeExpensePayload = z.infer<typeof IncomeExpenseValidator>