import { ChangeEvent, useEffect, useState } from "react"
import type { DraftExpense, Value } from "../types"
import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import { useBudget } from "../hooks/useBudget"
import { getIconSVG } from "./icons/CategoryIcons"

import ErrorMessage from "./ErrorMessage"

import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'

const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    const [previousAmount, setPreviousAmount] = useState(0) 

    const { dispatch, state, remainingBudget } = useBudget()

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currenExpense => currenExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    const handleChangeDate = (value: Value) => {
        if (value instanceof Date) {
            setExpense({
                ...expense,
                date: value
            })
        }
    }

    const handleCategoryChange = (categoryId: string) => {
        setExpense({
            ...expense,
            category: categoryId
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense).includes('')) {
            setError('Todos los cambios son obligatorios')
            return
        }

        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('Este gasto excede el presupuesto disponible')
            return
        }

        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="text-2xl font-bold text-left pb-2">
                {state.editingId ? 'Actualizar Gasto' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-md font-medium text-secondary"
                >
                    Nombre Gasto
                </label>
                <input
                    type="text"
                    id="expenseName"
                    className="p-2 bg-slate-100 rounded-lg text-sm"
                    placeholder="Ej: Spotify, Supermercado..."
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-md font-medium text-secondary"
                >
                    Monto del Gasto
                </label>
                <label
                    htmlFor="amount"
                    className="flex flex-row gap-2 bg-slate-100 border border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
                >
                    <span className="font-medium text-secondary text-base">
                        $
                    </span>
                    <input 
                        type="number"
                        id="amount"
                        name="amount"
                        className="w-full border-none focus:outline-none font-medium text-sm" 
                        placeholder="0.00"
                        min={0}
                        value={expense.amount}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className="flex flex-col gap-2">
                <span
                    className="text-md font-medium text-secondary"
                >
                    Categoria
                </span>
                <div className="flex flex-row items-center gap-3 flex-wrap">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategoryChange(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm transition-colors cursor-pointer
                                ${expense.category === category.id ? 'bg-black' : 'bg-secondary/30 hover:bg-secondary/50'}
                            `}
                        >
                            {getIconSVG(category.icon)}
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-md font-medium text-secondary"
                >
                    Fecha Gasto
                </label>
                <DatePicker
                    className="p-2 bg-slate-100 rounded-lg text-sm"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                className="bg-primary hover:bg-primary-hover cursor-pointer text-white p-2 rounded-lg mt-5 w-full font-semibold transition-all duration-300 ease-in-out"
                type="submit"
                value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    )
}

export default ExpenseForm