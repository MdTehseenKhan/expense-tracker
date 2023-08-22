"use client"
import { useState } from "react"
import { ExpenseType, IncomeType } from "@prisma/client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Props {
  value?: string
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>
  variant: "income" | "expense"
}

export default function Combobox({ value, setValue, variant }: Props) {
  const [open, setOpen] = useState(false)

  const data = variant === "income" ? Object.keys(IncomeType) : Object.keys(ExpenseType)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {value ? data.find((item) => item === value) : "Select type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />

          <CommandEmpty>No Results found.</CommandEmpty>

          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item}
                onSelect={(currentValue) => {
                  setValue(currentValue.toUpperCase())
                  console.log(currentValue)
                  setOpen(false)
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === item ? "opacity-100" : "opacity-0")} />
                {item.charAt(0) + item.slice(1).toLowerCase()}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
