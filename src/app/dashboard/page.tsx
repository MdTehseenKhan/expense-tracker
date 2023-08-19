import UserOptions from "@/components/navbar/user-options"
import { getAuthSession } from "@/lib/auth"

const Dashboard = async () => {
  const session = await getAuthSession()

  return (
    <div>
      Dashboard
      <UserOptions user={session?.user} />
    </div>
  )
}

export default Dashboard
