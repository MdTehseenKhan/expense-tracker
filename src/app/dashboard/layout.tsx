import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getAuthSession } from '@/lib/auth'

import BalanceBadge from '@/components/balance-badge'
import Navlinks from '@/components/navlinks'
import Avatar from '@/components/avatar'

export const metadata: Metadata = {
  title: 'Dashboard | Expense Tracker',
  description: '...',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()
  if (!session?.user) redirect('/')

  return (
    <div className="w-full min-h-screen relative p-2">
      {/* Sidebar */}
      <aside
        className="
          p-10
          w-full
          h-full
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
            {session?.user?.name || 'My Account'}
            <div className="text-xs text-gray-500 font-normal">
              {session?.user?.email || ''}
            </div>
            <BalanceBadge />
          </div>
        </div>

        {/* NavLinks */}
        <Navlinks />
      </aside>

      {/* Dashboard */}
      <div className="sm:container mx-auto">
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
    </div>
  )
}
