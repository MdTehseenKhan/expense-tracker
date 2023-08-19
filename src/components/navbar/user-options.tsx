"use client"
import type { User } from "next-auth"

import Link from "next/link"
import { signOut } from "next-auth/react"

import Avatar from "@/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  user?: Pick<User, "name" | "email" | "image">
}

const UserOptions: React.FC<Props> = ({ user }) => {
  const handleSignOut = (e: Event) => {
    e.preventDefault()
    signOut({ callbackUrl: `${window.location.origin}/login` })
  }

  return (
    // DROPDOWN
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* AVATAR */}
        <Avatar image={user?.image} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user?.name || "My Account"}
          <div className="text-xs text-gray-500 font-normal pr-5">{user?.email || ""}</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard/incomes">Incomes</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard/expenses">Expenses</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onSelect={handleSignOut}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserOptions
