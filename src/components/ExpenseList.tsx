import { useEffect, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"
import FilterByCategory from "./FilterByCategory"
import Card from "./UI/Card"

const ExpenseList = () => {

    const { state } = useBudget()

    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, [])

    const filteredExpenses = state.currentCategory
        ? state.expenses.filter(expense => expense.category === state.currentCategory)
        : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <Card className={`transform transition-all duration-700 ease-out space-y-8 px-0
        ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <header className="flex flex-col gap-3 px-6">
                <p className="text-black text-xl font-bold">
                    Listado de gastos
                </p>
                <FilterByCategory />
            </header>
            <div className="flex flex-col gap-5">
                {!isEmpty ? filteredExpenses.map(expense => (
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    />
                )) : (
                    <p className="text-black text-2xl font-bold">No hay gastos</p>
                )}
            </div>
        </Card>
    )
}

export default ExpenseList