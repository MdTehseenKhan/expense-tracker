import type { Metadata } from "next"
import Avatar from "@/components/avatar"
import { getAuthSession } from "@/lib/auth"
import Navlinks from "@/components/navlinks"

export const metadata: Metadata = {
  title: "Dashboard | Expense Tracker",
  description: "...",
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession()

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
            flex-wrap
            gap-5 
            justify-center 
            items-center
            md:flex-col 
          "
        >
          <Avatar image={session?.user?.image} />

          <div className="grid items-center md:place-items-center">
            {session?.user?.name || "My Account"}
            <div className="text-xs text-gray-500 font-normal pr-5">{session?.user?.email || ""}</div>
            <div className="text-green-600">12300$</div>
          </div>
        </div>

        {/* NavLinks */}
        <Navlinks />
      </aside>

      <section
        className="
          p-10
          rounded-lg
          border 
          border-gray-300
          shadow-md
          mt-10
          md:mt-0
          md:ml-80
          h-screen
        "
      >
        {children}
      </section>
    </div>
  )
}
