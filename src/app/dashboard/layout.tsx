import type { Metadata } from "next"
import { redirect } from "next/navigation"

import Navlinks from "@/components/navlinks"
import Avatar from "@/components/avatar"
import { getAuthSession } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Dashboard | Expense Tracker",
  description: "...",
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession()

  if (!session?.user) redirect("/")

  const balance = 12300

  return (
    <div className="min-h-screen relative p-2">
      <aside
        className="
          px-5
          py-10
          w-full
          h-[97%]
          rounded-lg
          border
          border-gray-300
          shadow-md
          md:fixed
          md:max-w-[300px]
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
            <div className="text-green-500 font-bold">${balance}</div>
          </div>
        </div>

        {/* NavLinks */}
        <Navlinks />
      </aside>

      <section
        className="
          p-7
          rounded-lg
          border 
          border-gray-300
          shadow-md
          min-h-screen
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
