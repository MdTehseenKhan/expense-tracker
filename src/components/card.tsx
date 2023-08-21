import { Calendar, Info, Trash2, Wallet2 } from "lucide-react"

interface Props {
  title: String
  amount: Number
  date: String
  description: String
}

const Card: React.FC<Props> = ({ title, amount, date, description }) => {
  return (
    <div className="flex border border-gray-200 rounded shadow overflow-hidden">
      <div className="flex flex-1 p-3">
        <div className="grid place-items-center">
          <Wallet2 className="w-10" />
        </div>

        <div className="space-y-2">
          <div className="font-bold">{title}</div>

          <div className="text-sm flex items-center flex-wrap gap-x-5 text-gray-600 overflow-hidden">
            <span>
              <span className="font-bold text-gray-800">$</span>
              &nbsp;
              {amount.toString()}
            </span>

            <span className="flex gap-1 items-center">
              <Calendar strokeWidth={2.7} className="w-4 text-gray-800" />
              {date}
            </span>

            <span className="flex gap-1 items-center w-40 truncate whitespace-nowrap">
              <Info strokeWidth={2.7} className="w-4 text-gray-800" />
              {description}
            </span>
          </div>
        </div>
      </div>

      <button className="p-4 grid place-items-center bg-red-600 hover:bg-red-700">
        <Trash2 className="text-white" />
      </button>
    </div>
  )
}

export default Card
