import { z } from "zod"
import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"
import { IncomeExpenseValidator } from "@/lib/validators"

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession()
  if (!session?.user) return new Response('Unauthorized, Please Login First', {status: 401})

  const body = await req.json()
  const { title, amount, category, date, type, description } = await IncomeExpenseValidator.parse(body)

  await db.expense.create({
    data: {
      title,
      amount,
      category,
      date,
      type,
      description,
      userId: session.id
    }
  })

  return new Response('Expense Added Successfully', {status: 200})
  } catch(e) {
    if (e instanceof z.ZodError) return new Response(e.message, {status: 422})
    return new Response("Internal Server Error", {status: 500})
  }
}