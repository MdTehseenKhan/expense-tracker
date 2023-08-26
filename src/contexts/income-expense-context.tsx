import { createContext, useContext, useState } from "react"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from "axios"
import { Expense, Income } from "@prisma/client"
import { ExpensePayload, IncomePayload } from "@/lib/validators"

interface IncomeExpenseContextType {
  incomes: Income[]
  expenses: Expense[]
  getIncome: () => void
  getExpenses: () => void
  addIncome: (payload: IncomePayload) => void
  addExpense: (payload: ExpensePayload) => void
  deleteIncome: (id: string) => void
  deleteExpense: (id: string) => void
  totalIncome: () => number
  totalExpenses: () => number
  history: Array<Income | Expense> | []
  transactionHistory: () => void
}

const IncomeExpenseContext = createContext<IncomeExpenseContextType | null>(null)

export default function IncomeExpenseContextProvider({ children }: { children: React.ReactNode }) {
  const [incomes, setIncomes] = useState<Income[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [history, setHistory] = useState<Array<Income | Expense> | []>([])

  const displayError = (err: Error) => {
    if (err instanceof AxiosError) {
      if (err.response?.status === 422) {
        return toast.error(err.response.data[0].message)
      }
      return toast.error(err.response?.data)
    }
    return toast.error("Something went wrong!")
  }

  // Calculate Incomes
  const getIncome = async () => {
    axios
      .get("/api/income/all")
      .then((res) => setIncomes(res.data))
      .catch((err) => displayError(err as Error))
  }

  const addIncome = async (payload: IncomePayload) => {
    await axios
      .post("/api/income/add", payload)
      .then((res) => toast.success(res.data))
      .catch((err) => displayError(err as Error))
    getIncome()
  }

  const deleteIncome = async (id: string) => {
    await axios
      .delete(`/api/income/delete/${id}`)
      .then((res) => toast.success(res.data))
      .catch((err) => displayError(err as Error))
    getIncome()
  }

  const totalIncome = () => incomes.reduce<number>((prev, next) => prev + next.amount, 0)

  // Calculate Expenses
  const getExpenses = async () => {
    axios
      .get("/api/expense/all")
      .then((res) => setExpenses(res.data))
      .catch((err) => displayError(err as Error))
  }

  const addExpense = async (paylod: ExpensePayload) => {
    if (paylod.amount > totalIncome()) return toast.error("You don't have enough balance to add this expense")

    await axios
      .post("/api/expense/add", paylod)
      .then((res) => toast.success(res.data))
      .catch((err) => displayError(err as Error))
    getExpenses()
  }

  const deleteExpense = async (id: string) => {
    await axios
      .delete(`/api/expense/delete/${id}`)
      .then((res) => toast.success(res.data))
      .catch((err) => displayError(err as Error))
    getExpenses()
  }

  const totalExpenses = () => expenses.reduce<number>((prev, next) => prev + next.amount, 0)

  const transactionHistory = () => {
    const combined = [...incomes, ...expenses]
    combined.sort(
      (a, b) =>
        new Date(b.createdAt?.toString() as string)?.getTime() - new Date(a.createdAt?.toString() as string)?.getTime()
    )
    setHistory(combined)
  }
  return (
    <IncomeExpenseContext.Provider
      value={{
        incomes,
        expenses,
        getIncome,
        getExpenses,
        addIncome,
        addExpense,
        deleteIncome,
        deleteExpense,
        totalIncome,
        totalExpenses,
        history,
        transactionHistory,
      }}
    >
      {children}
    </IncomeExpenseContext.Provider>
  )
}

export const useIncomeExpense = () => useContext(IncomeExpenseContext) as IncomeExpenseContextType
