import { ExpenseType, IncomeType } from "@prisma/client";
import { z } from "zod";

export const IncomeValidator = z.object({
  title: z.string().max(26, { message: "Title must be at least 26 characters" }),
  amount: z.number(),
  type: z.nativeEnum(IncomeType),
  date: z.date(),
  category: z.string(),
  description: z.string().max(50, { message: "Title must be at least 50 characters" }),
})

export const ExpenseValidator = z.object({
  title: z.string().max(26, { message: "Title must be at least 26 characters" }),
  amount: z.number(),
  type: z.nativeEnum(ExpenseType),
  date: z.date(),
  category: z.string(),
  description: z.string().max(50, { message: "Title must be at least 50 characters" }),
})

export type IncomePayload = z.infer<typeof IncomeValidator>
export type ExpensePayload = z.infer<typeof ExpenseValidator>