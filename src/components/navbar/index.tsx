import Image from "next/image"
import Link from "next/link"

import UserOptions from "./user-options"
import { getAuthSession } from "@/lib/auth"

const Navbar = async () => {
  const session = await getAuthSession()

  return (
    <nav
      className="
        fixed 
        top-0 
        inset-0 
        h-fit 
        bg-gray-100 
        border-b 
        border-gray-300 
        z-10 
        py-2
      "
    >
      <div
        className="
          container 
          max-w-7xl
          h-full
          mx-auto
          flex
          items-center
          justify-between
          gap-2
        "
      >
        {/* LOGO */}
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/logo.png" alt="logo" width={40} height={40} priority />

          <p
            className="
              hidden
              md:block 
              font-medium 
              text-gray-900
            "
          >
            Expense Tracker
          </p>
        </Link>

        {/* AVATAR OR LOGIN BUTTON */}
        <UserOptions user={session?.user} />
      </div>
    </nav>
  )
}

export default Navbar
