import { ChangeEvent, useEffect, useState } from "react"
import type { DraftExpense } from "../types"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import { formatYYYYMMDD } from "../helpers"

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
        const isAmountField = name === 'amount'

        if (isAmountField) {
            const rawValue = value.replace(/\D/g, "")
            setExpense({
                ...expense,
                [name]: Number(rawValue)
            })
        } else {
            setExpense({
                ...expense,
                [name]: value
            })
        }
    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value

        setExpense({
            ...expense,
            date: new Date(dateString + 'T00:00:00')
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
            <header className="space-y-1 pb-4 border-b border-gray-200">
                <legend className="text-xl font-semibold text-left">
                    {state.editingId ? 'Actualizar Gasto' : 'Nuevo Gasto'}
                </legend>
                <p className="text-sm text-secondary">Completa todos los campos para registrar un gasto</p>
                <button
                    type="button"
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => dispatch({ type: 'hide-modal' })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>
            </header>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-sm font-medium text-secondary"
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
                    className="text-sm font-medium text-secondary"
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
                        type="text"
                        id="amount"
                        name="amount"
                        className="w-full border-none focus:outline-none text-sm"
                        placeholder="0.00"
                        value={expense.amount === 0 ? '' : expense.amount.toLocaleString('en-US')}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className="flex flex-col gap-2">
                <span
                    className="text-sm font-medium text-secondary"
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
                            <img className="w-4 h-4 opacity-50" src={`/icono_${category.icon}.svg`} alt={category.name} />
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="date"
                        className="text-sm font-medium text-secondary"
                    >
                        Fecha Gasto
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="p-2 bg-slate-100 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-slate-200"
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