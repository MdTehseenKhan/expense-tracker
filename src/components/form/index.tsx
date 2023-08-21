"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DatePicker from "./date-picker"
import Combobox from "./combobox"
import { IncomePayload, IncomeValidator } from "@/lib/validators"

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomePayload>({
    resolver: zodResolver(IncomeValidator),
    defaultValues: {
      title: "",
      amount: 0,
    },
  })

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // addIncome(inputState)
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input type="text" placeholder="Title" />
      <Input type="number" placeholder="Amount" />
      <DatePicker />
      <Combobox />
      <Textarea placeholder="Add a description" rows={4} cols={30} />
      <Button type="submit">Add</Button>
    </form>
  )
}

export default Form
