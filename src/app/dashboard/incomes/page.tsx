import Card from "@/components/card"
import Form from "@/components/form"

const incomes = [
  {
    title: "Sold a product",
    amount: 1000,
    type: "DROPSHIPPING",
    date: "18-08-2023",
    description: "My August Dropshipping Earning",
  },
  {
    title: "Freelancing",
    amount: 10,
    type: "FREELANCING",
    date: "16-07-2023",
    description: "My July Freelancing Earning",
  },
  {
    title: "Salary",
    amount: 100,
    type: "TEACHING",
    date: "08-06-2023",
    description: "My June Teaching Earning",
  },
]

const Incomes = () => {
  const income = 12500

  return (
    <div className="space-y-7">
      <div
        className="
          p-5 
          text-4xl 
          font-bold 
          grid 
          place-items-center 
          border 
          border-gray-200 
          rounded 
          shadow
        "
      >
        Total Income:
        <span className="text-green-500">${income}</span>
      </div>

      <div className="flex gap-7 flex-col lg:flex-row">
        <div className="lg:w-2/5">
          <Form />
        </div>

        {/* Recent Incomes */}
        <div className="lg:w-3/5">
          <div className="flex flex-col gap-2">
            {incomes?.map(({ title, amount, date, description }, i) => (
              <Card key={i + title} title={title} amount={amount} date={date} description={description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Incomes
