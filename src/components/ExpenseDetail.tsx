import { useMemo, useState } from "react"
import { Expense } from "../types"
import { formatCurrency, formatDayAndMonth } from "../helpers"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense: Expense
}

const ExpenseDetail = ({ expense } : ExpenseDetailProps) => {
    const { dispatch } = useBudget()
    
    const [showMenu, setShowMenu] = useState(false)

    const categoryInfo = useMemo(() => (
        categories.filter(cat => cat.id === expense.category)[0]
    ), [expense])

    return (
        <div className="w-full flex flex-row gap-5 items-center px-6">
            <div className="flex items-center justify-center">
                <img className="w-14 h-14" src={`/icono_${categoryInfo?.icon}.svg`} alt="Gráfica de gastos" />  
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full justify-between items-start sm:items-center">
                <div className="w-full flex flex-col gap-1">
                    <p className="font-medium text-lg">{expense.expenseName}</p>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-xs font-medium text-secondary">{categoryInfo?.name}</p>
                        <span className="w-1 h-1 bg-secondary rounded-full"></span>
                        <p className="text-secondary text-xs">{formatDayAndMonth(expense.date)}</p>
                    </div>
                </div>
                <span className="text-xl font-semibold text-black">{formatCurrency(expense.amount)}</span>
            </div>

            <div className="relative">
                <button
                    type="button"
                    className="p-2 bg-secondary/10 hover:bg-secondary/30 cursor-pointer transition-all duration-200 ease-in-out h-fit rounded-lg"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </button>

                {showMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
                        <button
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-200 ease-in-out cursor-pointer"
                            onClick={() => {
                                dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })
                                setShowMenu(false) 
                            }}
                        >
                            Editar
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition-colors duration-200 ease-in-out cursor-pointer"
                            onClick={() => {
                                dispatch({ type: 'remove-expense', payload: { id: expense.id } })
                                setShowMenu(false)
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExpenseDetail