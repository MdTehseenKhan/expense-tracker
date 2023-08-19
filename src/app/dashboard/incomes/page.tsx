import { notFound } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import db from "@/lib/db"

const Incomes = async () => {
  const session = await getAuthSession()
  if (!session?.user) return notFound()

  const incomes = await db.income.findMany({
    orderBy: { createdAt: "desc" },
  })

  return <div>Incomes : {JSON.stringify(incomes)}</div>
}

export default Incomes
