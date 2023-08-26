import Image from "next/image"
import { redirect } from "next/navigation"
import ContinueWithGoogle from "@/components/continue-with-google"
import { getAuthSession } from "@/lib/auth"

export default async function Home() {
  const session = await getAuthSession()
  if (session?.user) redirect("/dashboard")

  return (
    <div className="min-h-screen grid place-items-center">
      {/* Welcome & SignIn */}
      <div
        className="
          px-5
          py-20
          mx-auto
          text-center
          flex 
          gap-y-4
          flex-col 
          w-full
          sm:w-[400px]
          border
          border-gray-300
          rounded-lg
          shadow-lg
        "
      >
        <Image src="/logo.png" alt="logo" width={64} height={64} className="self-center" />

        <h1 className="text-3xl font-bold tracking-tight">Welcome to Expense Tracker!</h1>

        <p className="text-sm max-w-xs mx-auto mb-2 text-gray-600">
          By continuing, you are setting up an &quot;Expense Tracker&quot; account and agree to our User Agreement and
          Privacy Policy.
        </p>

        {/* Authentication */}
        <ContinueWithGoogle />
      </div>
    </div>
  )
}
