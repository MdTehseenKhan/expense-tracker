import Card from "@/components/card"
import Chart from "@/components/chart"
import { cn } from "@/lib/utils"
import { ExpenseType, IncomeType } from "@prisma/client"

interface Income {
  title: string
  amount: number
  type: IncomeType
  date: Date
  description: string
}
interface Expense {
  title: string
  amount: number
  type: ExpenseType
  date: Date
  description: string
}

const incomes: Income[] = [
  {
    title: "Sold a product",
    amount: 1000,
    type: "DROPSHIPPING",
    date: new Date("2023-08-18T00:00:00Z"),
    description: "Dropshipping Earning",
  },
  {
    title: "Freelancing",
    amount: 10,
    type: "FREELANCING",
    date: new Date("2023-07-16T00:00:00Z"),
    description: "Freelancing Earning this month",
  },
  {
    title: "Salary",
    amount: 100,
    type: "TEACHING",
    date: new Date("2023-06-22T00:00:00Z"),
    description: "Teaching Earning",
  },
]
const expenses: Expense[] = [
  {
    title: "Dentist",
    amount: 50,
    type: "HEALTHCARE",
    date: new Date("2023-08-18T00:00:00Z"),
    description: "Dentist checkup fee",
  },
  {
    title: "Train Cost",
    amount: 70,
    type: "TRANSPORT",
    date: new Date("2023-08-18T00:00:00Z"),
    description: "Transport expenses",
  },
  {
    title: "House Rent",
    amount: 300,
    type: "RENT",
    date: new Date("2023-08-18T00:00:00Z"),
    description: "1 month rent",
  },
]

const Dashboard = async () => {
  // @ts-ignore
  let history = incomes.concat(expenses)
  history = history.sort((a, b) => a.date.getTime() - b.date.getTime())

  const data = [
    {
      title: "balance",
      amount: 12580,
    },
    {
      title: "income",
      amount: 16500,
    },
    {
      title: "expense",
      amount: 3920,
    },
  ]

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

          {history?.map(({ title, amount, type, date, description }) => {
            console.log(typeof type)
            return (
              <Card
                key={title}
                variant={IncomeType[type] ? "income" : "expense"}
                title={title}
                type={type}
                amount={amount}
                date={date}
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
