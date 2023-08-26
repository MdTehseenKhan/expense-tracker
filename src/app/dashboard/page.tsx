"use client"
import Card from "@/components/card"
import Chart from "@/components/chart"
import { useIncomeExpense } from "@/contexts/income-expense-context"
import { cn } from "@/lib/utils"
import { IncomeType } from "@prisma/client"
import { useEffect } from "react"

const Dashboard = () => {
  const { incomes, expenses, getIncome, getExpenses, totalIncome, totalExpenses, history, transactionHistory } =
    useIncomeExpense()

  const data = [
    {
      title: "balance",
      amount: totalIncome() - totalExpenses(),
    },
    {
      title: "income",
      amount: totalIncome(),
    },
    {
      title: "expense",
      amount: totalExpenses(),
    },
  ]

  useEffect(() => {
    getIncome()
    getExpenses()
  }, [])

  useEffect(() => {
    transactionHistory()
  }, [incomes, expenses])

  return (
    <div>
      {/* Insights Section */}
      <section className="flex flex-col lg:flex-row gap-7">
        {/* Chart */}
        <div className="w-full lg:w-4/6 h-fit">
          <h1 className="text-4xl font-bold pb-5">Insights</h1>

          <div
            className="
              p-4 
              py-10
              border 
              border-gray-300 
              rounded 
              shadow-md
            "
          >
            <Chart incomes={incomes} expenses={expenses} />
          </div>
        </div>

        {/* Total Income and Expenses Card */}
        <div className="flex flex-wrap gap-3 lg:order-2 lg:w-2/6">
          {data?.map(({ title, amount }) => (
            <div
              key={title}
              className="
                w-full 
                p-5 
                grid 
                place-items-center 
                border 
                border-gray-200 
                rounded 
                shadow-md
              "
            >
              <h1 className="text-2xl capitalize font-bold">Total {title}</h1>
              <p
                className={cn(
                  "text-4xl font-extrabold",
                  title === "balance" && "text-green-500",
                  title === "income" && "text-gray-500",
                  title === "expense" && "text-red-500"
                )}
              >
                $ {amount}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Transactions Section */}
      <section>
        <div className="flex flex-col gap-3 pt-10">
          <h1 className="text-3xl font-bold pb-3">Recent Transactions</h1>

          {history?.map(({ id, title, amount, type, date, description }) => {
            if (type !== null)
              return (
                <Card
                  key={id}
                  id={id}
                  // @ts-ignore
                  variant={IncomeType[type] ? "income" : "expense"}
                  title={title}
                  type={type as string}
                  amount={amount}
                  date={date as Date}
                  description={description}
                />
              )
          })}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
