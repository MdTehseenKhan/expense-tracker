import { z } from "zod"
import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const session = await getAuthSession()
    if (!session?.user) return new Response('Unauthorized, Please Login First', { status: 401 })

    const incomes = await db.income.findMany({ orderBy: { createdAt: 'desc' } })

    return NextResponse.json(incomes)
  } catch(e) {
    if (e instanceof z.ZodError) return new Response(e.message, { status: 422 })
    return new Response("Internal Server Error", { status: 500 })
  }
}