"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DatePicker from "./date-picker"
import Combobox from "./combobox"

const Form = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // addIncome(inputState)
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input type="text" placeholder="Title" />
      <Input type="text" placeholder="Amount" />
      <DatePicker />
      <Combobox />
      <Textarea placeholder="Add a description" rows={4} cols={30} />
      <Button type="submit">Add</Button>
    </form>
  )
}

export default Form
