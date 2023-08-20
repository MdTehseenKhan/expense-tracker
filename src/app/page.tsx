import SignIn from "@/components/sign-in"
import { getAuthSession } from "@/lib/auth"

export default async function Home() {
  const session = await getAuthSession()

  return (
    <div className="min-h-screen grid place-items-center">
      {/* Welcome & SignIn */}
      <SignIn sessionExists={session?.user} />
    </div>
  )
}
