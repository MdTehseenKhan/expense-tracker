"use client"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DatePicker from "./date-picker"
import Combobox from "./combobox"
import { useIncomeExpense } from "@/contexts/income-expense-context"
import { ExpenseType, IncomeType } from "@prisma/client"
import { toast } from "react-hot-toast"

interface Props {
  variant: "income" | "expense"
}

const InputForm: React.FC<Props> = ({ variant }) => {
  const { addIncome, addExpense } = useIncomeExpense()

  const [date, setDate] = useState<Date>()
  const [type, setType] = useState<string | null>(null)

  const [input, setInput] = useState({
    title: "",
    amount: 0,
    description: "",
  })

  const { title, amount, description } = input

  const handleInput = (
    //
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
    value?: string
  ) => {
    setInput({ ...input, [name]: value ? value : e.target.value })
  }

  const handleSubmit: React.MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!date) return toast.error("Date not Specified")

    if (!type) return toast.error("Choose a Type")

    const payload = { title, amount, date, description }
    // console.log({...payload, type})

    if (variant === "income") {
      addIncome({ ...payload, type: type as IncomeType })
    } else if (variant === "expense") {
      addExpense({ ...payload, type: type as ExpenseType })
    }

    setInput({
      title: "",
      amount: 0,
      description: "",
    })
    setDate(undefined)
    setType(null)
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/*  */}
      <Input
        type="text"
        placeholder="Title"
        minLength={3}
        maxLength={26}
        required
        value={title}
        onChange={(e) => handleInput(e, "title")}
      />

      <Input
        type="number"
        placeholder="Amount"
        min={1}
        required
        value={amount}
        onChange={(e) => setInput({ ...input, amount: e.target.valueAsNumber })}
      />

      <DatePicker date={date} setDate={setDate} />

      <Combobox value={type} setValue={setType} variant={variant} />

      <Textarea
        placeholder="Add a description"
        rows={4}
        cols={30}
        value={description}
        onChange={(e) => handleInput(e, "description")}
      />

      <Button type="submit">Add</Button>
    </form>
  )
}

export default InputForm
