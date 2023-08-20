"use client"
import { usePathname } from "next/navigation"
import { Banknote, LayoutDashboard, LogOut, Receipt } from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    Icon: LayoutDashboard,
    link: "/dashboard",
  },
  {
    title: "Incomes",
    Icon: Banknote,
    link: "/dashboard/incomes",
  },
  {
    title: "Expenses",
    Icon: Receipt,
    link: "/dashboard/expenses",
  },
]

const Navlinks = () => {
  const pathname = usePathname()

  const handleSignOut = () => signOut({ callbackUrl: "/" })

  return (
    <nav className="flex gap-1 flex-wrap justify-center md:flex-col md:justify-between pt-10">
      {menuItems.map(({ title, link, Icon }) => {
        return (
          <Link
            href={link}
            key={title}
            className={cn(
              `
              text-gray-500 
              flex 
              gap-3 
              px-4 
              py-2 
              hover:text-gray-700 
              rounded 
              hover:bg-gray-200
            `,
              pathname === link && "text-gray-900 hover:text-gray-950"
            )}
          >
            <Icon />
            <span>{title}</span>
          </Link>
        )
      })}

      <button
        onClick={handleSignOut}
        className="
          text-gray-500 
          flex 
          gap-3 
          px-4 
          py-2 
          hover:text-gray-700 
          rounded 
          hover:bg-gray-200
        "
      >
        <LogOut />
        <span>Log Out</span>
      </button>
    </nav>
  )
}

export default Navlinks
