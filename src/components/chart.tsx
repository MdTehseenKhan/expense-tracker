"use client"
import { Expense, Income } from "@prisma/client"
import { format } from "date-fns"

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend)

interface ChartProps {
  incomes: Pick<Income, "amount" | "date">[]
  expenses: Pick<Expense, "amount">[]
}

const Chart: React.FC<ChartProps> = ({ incomes, expenses }) => {
  //
  const incomeAmounts = incomes.map((income) => income.amount)
  const expenseAmounts = expenses.map((expense) => expense.amount)

  const minIncome = Math.min(...incomeAmounts)
  const maxIncome = Math.max(...incomeAmounts)

  const minExpense = Math.min(...expenseAmounts)
  const maxExpense = Math.max(...expenseAmounts)

  const data = {
    labels: incomes.map(({ date }) => format(new Date(date as Date), "dd-MMM-yyyy")),
    datasets: [
      {
        label: "Income",
        data: incomes.map(({ amount }) => amount),
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: expenses.map(({ amount }) => amount),
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  }

  return (
    <>
      <Line data={data} />

      <div className="w-full flex justify-between text-gray-600 pt-10">
        <div>
          Min Income:
          <span className="font-bold text-red-500"> ${minIncome === Infinity ? 0 : minIncome}</span>
        </div>
        <div>
          Max Income:
          <span className="font-bold text-green-500"> ${maxIncome === -Infinity ? 0 : maxIncome}</span>
        </div>
      </div>

      <div className="w-full flex justify-between text-gray-600">
        <div>
          Min Expense:
          <span className="font-bold text-red-500"> ${minExpense === Infinity ? 0 : minExpense}</span>
        </div>
        <div>
          Max Expense:
          <span className="font-bold text-green-500"> ${maxExpense === -Infinity ? 0 : maxExpense}</span>
        </div>
      </div>
    </>
  )
}

export default Chart
