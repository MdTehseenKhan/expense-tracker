"use client"
import Card from "@/components/card"
import InputForm from "@/components/input-form"
import { useIncomeExpense } from "@/contexts/income-expense-context"
import { useEffect } from "react"

const Incomes = () => {
  const { totalIncome, incomes, getIncome } = useIncomeExpense()

  useEffect(() => {
    getIncome()
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
        Total Income:&nbsp;
        <span className="text-green-500">${totalIncome()}</span>
      </div>

      <div className="flex gap-7 flex-col lg:flex-row">
        <div className="lg:w-2/5">
          <InputForm variant="income" />
        </div>

        {/* Recent Incomes */}
        <div className="lg:w-3/5">
          <div className="flex flex-col gap-2">
            {incomes?.map(({ id, title, amount, type, date, description }) => (
              <Card
                key={id}
                id={id}
                variant="income"
                title={title}
                amount={amount}
                type={type as string}
                date={date as Date}
                description={description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Incomes
