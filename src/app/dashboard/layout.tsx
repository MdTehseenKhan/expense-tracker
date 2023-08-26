import type { Metadata } from "next"
import { redirect } from "next/navigation"

import Navlinks from "@/components/navlinks"
import Avatar from "@/components/avatar"
import { getAuthSession } from "@/lib/auth"
import db from "@/lib/db"

export const metadata: Metadata = {
  title: "Dashboard | Expense Tracker",
  description: "...",
}

async function getBalance() {
  try {
    const income = await db.income.aggregate({ _sum: { amount: true } })
    const expense = await db.expense.aggregate({ _sum: { amount: true } })

    return income._sum.amount! - expense._sum.amount!
  } catch (err) {
    console.log((err as Error).message)
  }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession()
  if (!session?.user) redirect("/")

  const balance = await getBalance()

  return (
    <div className="min-h-screen relative p-2">
      <aside
        className="
          px-5
          pb-5
          pt-10
          w-full
          h-[97%]
          rounded-lg
          border
          border-gray-300
          shadow-md
          md:fixed
          md:max-w-[300px]
          flex
          flex-col
        "
      >
        <div
          className="
            flex 
            flex-col 
            gap-5 
            justify-center 
            items-center
          "
        >
          <Avatar image={session?.user?.image} />

          <div className="grid place-items-center">
            {session?.user?.name || "My Account"}
            <div className="text-xs text-gray-500 font-normal">{session?.user?.email || ""}</div>
            <div className="text-green-500 font-bold">$ {balance || 0}</div>
          </div>
        </div>

        {/* NavLinks */}
        <Navlinks />
      </aside>

      <section
        className="
          py-7
          px-3
          md:px-7
          rounded-lg
          border 
          border-gray-300
          shadow-md
          min-h-[97vh]
          mt-10
          md:mt-0
          md:ml-80
        "
      >
        {children}
      </section>
    </div>
  )
}
