import { z } from "zod"
import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export const DELETE = async (req: Request) => {
  try {
    const session = await getAuthSession()
  if (!session?.user) return new Response('Unauthorized, Please Login First', {status: 401})

  const {searchParams} = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return new Response('Invalid Param', {status: 404})
  
  const expenseExists = await db.expense.findUnique({ where: { id } })
  if (!expenseExists) return new Response('Expense Not Found', {status: 404})
  
  await db.expense.delete({ where: { id } })

  return new Response('Expense Deleted Successfully', {status: 200})
  } catch(e) {
    if (e instanceof z.ZodError) return new Response(e.message, {status: 422})
    return new Response("Internal Server Error", {status: 500})
  }
}