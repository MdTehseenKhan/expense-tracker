import { z } from "zod"
import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"
import { IncomeValidator } from "@/lib/validators"

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession()
    if (!session?.user) return new Response('Unauthorized, Please Login First', {status: 401})

    const body = await req.json()
    const { title, amount, date, type, description } = await IncomeValidator.parse(body)
    console.log(typeof date)

    await db.income.create({
      data: {
        title,
        amount,
        date,
        type,
        description,
        userId: session.id
      }
    })

    return new Response('Income Added Successfully', {status: 200})
  } catch(e) {
    if (e instanceof z.ZodError) return new Response(e.message, {status: 422})
    return new Response("Internal Server Error", {status: 500})
  }
}