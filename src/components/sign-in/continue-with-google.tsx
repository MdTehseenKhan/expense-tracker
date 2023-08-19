"use client"
import { useState } from "react"

import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"

const ContinueWithGoogle = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = () => {
    setIsLoading(true)

    signIn("google")
      .then((res) => {
        if (res) toast.success("Successfully Signed In!")
      })
      .catch((e) => {
        console.log(e as Error)

        toast.error("Something went wrong!")
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Button isLoading={isLoading} onClick={loginWithGoogle}>
      {isLoading ? null : <FcGoogle className="h-6 w-6 mr-2" />}
      Continue with Google
    </Button>
  )
}

export default ContinueWithGoogle
