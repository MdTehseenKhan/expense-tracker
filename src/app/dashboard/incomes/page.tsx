import { getAuthSession } from "@/lib/auth"

import Card from "@/components/card"
import InputForm from "@/components/input-form"

const incomes = [
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

const Incomes = async () => {
  const session = await getAuthSession()
  const income = 12500

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
        <span className="text-green-500">${income}</span>
      </div>

      <div className="flex gap-7 flex-col lg:flex-row">
        <div className="lg:w-2/5">
          <InputForm variant="income" userId={session?.id} />
        </div>

        {/* Recent Incomes */}
        <div className="lg:w-3/5">
          <div className="flex flex-col gap-2">
            {incomes?.map(({ title, amount, type, date, description }, i) => (
              <Card key={i + title} title={title} amount={amount} type={type} date={date} description={description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Incomes
