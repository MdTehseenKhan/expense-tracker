"use client"
import Image from "next/image"
import ContinueWithGoogle from "./continue-with-google"
import type { User } from "next-auth"
import { useRouter } from "next/navigation"

interface Props {
  sessionExists?: Pick<User, "name" | "email" | "image">
}

const SignIn: React.FC<Props> = ({ sessionExists }) => {
  const router = useRouter()
  if (sessionExists) router.push("/dashboard")

  return (
    <div
      className="
        py-20
        px-5
        mx-auto
        text-center
        flex 
        gap-y-4
        flex-col 
        w-full
        sm:w-[400px]
        border
        border-gray-200
        rounded-lg
        shadow-md
      "
    >
      <Image src="/logo.png" alt="logo" width={58} height={58} className="self-center" />

      <h1 className="text-3xl font-bold tracking-tight">Welcome to Expense Tracker!</h1>

      <p className="text-sm max-w-xs mx-auto mb-2 text-gray-600">
        By continuing, you are setting up an &quot;Expense Tracker&quot; account and agree to our User Agreement and
        Privacy Policy.
      </p>

      {/* Authentication */}
      <ContinueWithGoogle />
    </div>
  )
}

export default SignIn
