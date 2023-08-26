"use client"
import Card from "@/components/card"
import InputForm from "@/components/input-form"
import { useIncomeExpense } from "@/contexts/income-expense-context"
import { useEffect } from "react"

const Expenses = () => {
  const { totalExpenses, expenses, getIncome, getExpenses } = useIncomeExpense()

  useEffect(() => {
    getIncome()
    getExpenses()
  }, [])

  return (
    <div className="space-y-7">
      <div
        className="
          p-5 
          flex
          flex-wrap
          justify-center
          text-center
          text-4xl 
          font-bold 
          border 
          border-gray-200 
          rounded 
          shadow
        "
      >
        Total Expenses:
        <span className="text-red-500">${totalExpenses()}</span>
      </div>

      <div className="flex gap-7 flex-col lg:flex-row">
        <div className="lg:w-2/5">
          <InputForm variant="expense" />
        </div>

        {/* Recent Expenses */}
        <div className="lg:w-3/5">
          <div className="flex flex-col gap-2">
            {expenses?.map(({ id, title, amount, date, type, description }) => (
              <Card
                key={id}
                id={id}
                variant="expense"
                title={title}
                amount={amount}
                date={date as Date}
                type={type as string}
                description={description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expenses
