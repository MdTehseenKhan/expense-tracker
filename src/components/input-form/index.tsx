"use client"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DatePicker from "./date-picker"
import Combobox from "./combobox"
import { ExpensePayload, IncomePayload } from "@/lib/validators"

interface Props {
  variant: "income" | "expense"
  userId?: string
}

const InputForm: React.FC<Props> = ({ variant, userId }) => {
  const [date, setDate] = useState<Date>()
  const [type, setType] = useState<string>()

  const [input, setInput] = useState<IncomePayload | ExpensePayload>({
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
    console.log({ title, amount, date, type, description, userId })
    // addIncome({ title, amount, date, type, description, userId })
    setInput({
      title: "",
      amount: 0,
      description: "",
    })
    setDate(undefined)
    setType("")
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/*  */}
      <Input
        type="text"
        placeholder="Title"
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
        onChange={(e) => handleInput(e, "amount")}
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
