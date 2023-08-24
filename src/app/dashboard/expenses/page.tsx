import { getAuthSession } from "@/lib/auth"

import Card from "@/components/card"
import InputForm from "@/components/input-form"

const expenses = [
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

const Expenses = async () => {
  const session = await getAuthSession()
  const totalExpenses = 500

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
        <span className="text-red-500">${totalExpenses}</span>
      </div>

      <div className="flex gap-7 flex-col lg:flex-row">
        <div className="lg:w-2/5">
          <InputForm variant="expense" userId={session?.id} />
        </div>

        {/* Recent Expenses */}
        <div className="lg:w-3/5">
          <div className="flex flex-col gap-2">
            {expenses?.map(({ title, amount, date, type, description }, i) => (
              <Card
                key={title + i}
                variant="expense"
                title={title}
                amount={amount}
                date={date}
                type={type}
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
