import Card from "@/components/card"
import InputForm from "@/components/input-form"

const expenses = [
  {
    title: "Dentist",
    amount: 50,
    type: "HEALTHCARE",
    date: "18-08-2023",
    description: "Dentist checkup fee",
  },
  {
    title: "Train Cost",
    amount: 70,
    type: "TRANSPORTATION",
    date: "16-07-2023",
    description: "Transport expenses",
  },
  {
    title: "House Rent",
    amount: 300,
    type: "RENT",
    date: "08-06-2023",
    description: "1 month rent",
  },
]

const Expenses = () => {
  const totalExpenses = 500

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
        Total Expenses:
        <span className="text-red-500">${totalExpenses}</span>
      </div>

      <div className="flex gap-7 flex-col lg:flex-row">
        <div className="lg:w-2/5">
          <InputForm variant="expense" />
        </div>

        {/* Recent Expenses */}
        <div className="lg:w-3/5">
          <div className="flex flex-col gap-2">
            {expenses?.map(({ title, amount, date, description }, i) => (
              <Card key={title + i} title={title} amount={amount} date={date} description={description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expenses
