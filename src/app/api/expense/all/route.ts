import { NextResponse } from "next/server"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import db from "@/lib/db"

export const GET = async () => {
  try {
    const session = await getAuthSession()
    if (!session?.user) return new Response('Unauthorized, Please Login First', { status: 401 })

    const expenses = await db.expense.findMany({ orderBy: { createdAt: 'desc' } })

    return NextResponse.json(expenses)
  } catch(e) {
    if (e instanceof z.ZodError) return new Response(e.message, { status: 422 })
    return new Response("Internal Server Error", { status: 500 })
  }
}