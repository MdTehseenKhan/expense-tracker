import axios from "axios"
const getIncomes = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/income/all")
    return data
  } catch (e) {
    return (e as Error).message
  }
}
const Incomes = async () => {
  const incomes = await getIncomes()

  console.log({ incomes })

  return <div>Incomes</div>
}

export default Incomes
