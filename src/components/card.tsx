import type { IconType } from "react-icons"

// Icons
import { Calendar, Info, Trash2 } from "lucide-react"
import {
  FaUserTie,
  FaShippingFast,
  FaMoneyBill,
  FaEllipsisH,
  FaFilm,
  FaGraduationCap,
  FaBus,
  FaShoppingBasket,
  FaHome,
} from "react-icons/fa"
import { IoFastFoodSharp, IoMedkitSharp, IoSchoolSharp, IoTrendingUpSharp } from "react-icons/io5"
import { cn } from "@/lib/utils"
import { useIncomeExpense } from "@/contexts/income-expense-context"
import { format } from "date-fns"

interface Props {
  id: string
  title: string
  amount: number
  type: string
  date: Date
  description: string
  variant: "income" | "expense"
}

let icons = {
  DROPSHIPPING: FaShippingFast,
  FREELANCING: FaUserTie,
  INVESTMENT: IoTrendingUpSharp,
  TEACHING: IoSchoolSharp,
  SALARY: FaMoneyBill,
  ENTERTAINMENT: FaFilm,
  HEALTHCARE: IoMedkitSharp,
  EDUCATION: FaGraduationCap,
  TRANSPORT: FaBus,
  GROCERIES: FaShoppingBasket,
  FOOD: IoFastFoodSharp,
  RENT: FaHome,
  OTHER: FaEllipsisH,
}

const Card: React.FC<Props> = ({ id, title, amount, type, date, description, variant }) => {
  const { deleteIncome, deleteExpense } = useIncomeExpense()
  // @ts-ignore
  const Icon: IconType = icons[type]

  const handleDelete = () => {
    if (variant === "income") deleteIncome(id)
    else if (variant === "expense") deleteExpense(id)
  }

  return (
    <div
      className="
        flex 
        flex-col 
        sm:flex-row 
        border 
        border-gray-200 
        rounded 
        shadow 
        overflow-hidden
      "
    >
      <div className="flex flex-1 gap-3 p-3">
        <div className="grid place-items-center">
          <Icon
            className="
              w-10 
              h-10 
              p-1 
              ring 
              ring-gray-400 
              rounded-full
            "
          />
        </div>

        <div className="space-y-2 w-full">
          <div className="font-bold">{title}</div>

          <div
            className="
              text-sm 
              flex 
              items-center 
              flex-wrap 
              gap-x-5 
              text-gray-600
            "
          >
            <p
              className={cn(
                "font-bold text-gray-800",
                variant === "income" && "text-green-500",
                variant === "expense" && "text-red-500"
              )}
            >
              <span>
                {variant === "income" && "+"}
                {variant === "expense" && "-"}$
              </span>
              &nbsp;
              {amount.toString()}
            </p>

            <p className="flex gap-1 items-center">
              <Calendar strokeWidth={2.7} className="w-4 shrink-0 text-gray-800" />
              {format(new Date(date), "dd-MMM-yyyy")}
            </p>

            <p
              className="
                flex 
                gap-1 
                items-center 
                w-40 
                xl:w-60 
                overflow-hidden
              "
              title={description}
            >
              <Info strokeWidth={2.7} className="w-4 shrink-0 text-gray-800" />
              <span className="truncate">{description}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        className="
          p-4 
          w-full 
          sm:w-fit 
          grid 
          place-items-center 
          bg-red-600 
          hover:bg-red-700
        "
        onClick={handleDelete}
      >
        <Trash2 className="text-white" />
      </button>
    </div>
  )
}

export default Card
