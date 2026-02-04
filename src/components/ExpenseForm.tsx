import { ChangeEvent, useEffect, useState } from "react"
import type { DraftExpense } from "../types"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import { getIconSVG } from "./icons/CategoryIcons"
import { formatYYYYMMDD } from "../helpers" // Import formatYYYYMMDD

import ErrorMessage from "./ErrorMessage"

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

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value // Esto nos da el texto "YYYY-MM-DD"

        setExpense({
            ...expense,
            date: new Date(dateString + 'T00:00:00') // Convertimos el texto a un objeto Date real
        })
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
                    <span className="font-medium text-secondary text-sm">
                        $
                    </span>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="w-full border-none focus:outline-none text-sm"
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
                    Categoría
                </span>
                <div className="flex flex-row items-center gap-3 flex-wrap">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategoryChange(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm transition-colors cursor-pointer
                                ${expense.category === category.id ? 'bg-primary' : 'bg-secondary/30 hover:bg-secondary/50'}
                            `}
                        >
                            {getIconSVG(category.icon)}
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="date"
                        className="text-md font-medium text-secondary"
                    >
                        Fecha Gasto
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="p-2 bg-slate-100 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-slate-200"
                        /* Convertimos el objeto Date a texto "YYYY-MM-DD" para que el input lo entienda */
                        value={expense.date instanceof Date ? formatYYYYMMDD(expense.date) : ''}
                        onChange={handleChangeDate}
                    />
                </div>
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