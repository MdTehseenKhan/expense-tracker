"use client"
import { useIncomeExpense } from "@/contexts/income-expense-context"

const BalanceBadge = () => {
  const { totalIncome, totalExpenses } = useIncomeExpense()
  const balance = totalIncome() - totalExpenses()

  return (
    <div
      className="
      mt-2 
      py-0.5 
      p-2.5 
      text-lg 
      font-bold 
      text-green-500
      bg-gray-200 
      rounded
    "
    >
      $ {balance || 0}
    </div>
  )
}

export default BalanceBadge
