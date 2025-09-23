import { ChangeEvent, useState } from "react"
import { categories } from "../data/categories"
import type { DraftExpense, Value } from "../types"
import DatePicker from "react-date-picker"

import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'

const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }
    console.log(expense)

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    return (
        <form className="space-y-5">
            <legend className="text-2xl font-bold text-center border-b-2 py-4 border-blue-500">Nuevo Gasto</legend>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-md font-semibold"
                >
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    className="p-2 border-2 border-gray-200 rounded-lg"
                    placeholder="Añade el nombre del gasto"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-md font-semibold"
                >
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="p-2 border-2 border-gray-200 rounded-lg"
                    placeholder="Añade el monto del gasto"
                    min={0}
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-md font-semibold"
                >
                    Categoria:
                </label>
                <select
                    id="category"
                    name="category"
                    className="p-2 border-2 border-gray-200 rounded-lg"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">Selecciona una categoria</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-md font-semibold"
                >
                    Fecha Gasto:
                </label>
                <DatePicker
                    className="p-2 rounded-lg"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input type="submit" value="Agregar Gasto" className="bg-blue-500 text-white p-2 rounded-lg mt-5 w-full cursor-pointer font-semibold" />
        </form>
    )
}

export default ExpenseForm