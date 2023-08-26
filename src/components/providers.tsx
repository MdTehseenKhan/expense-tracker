"use client"
import IncomeExpenseContextProvider from "@/contexts/income-expense-context"
import { Toaster } from "react-hot-toast"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <IncomeExpenseContextProvider>
      {children}
      <Toaster />
    </IncomeExpenseContextProvider>
  )
}

export default Providers
