import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const session = await getAuthSession()
    if (!session?.user) return new Response('Unauthorized, Please Login First', { status: 401 })

    console.log("Authorized")

    const incomes = await db.income.findMany({ 
      where: { userId: session.id }, 
      orderBy: { createdAt: 'desc' } 
    })

    return NextResponse.json(incomes)
  } catch(e) {
    return new Response("Internal Server Error", { status: 500 })
  }
}