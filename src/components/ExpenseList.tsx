import { useEffect, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

const ExpenseList = () => {

    const { state } = useBudget()

    const [animate, setAnimate] = useState(false)
    
    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, [])

    const filteredExpenses = state.currentCategory
    ? state.expenses.filter( expense => expense.category === state.currentCategory )
    : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className={`mt-10 flex flex-col gap-5 transform transition-all duration-700 ease-out
            ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {isEmpty
                ? <p className="text-black text-2xl font-bold">No hay gastos</p> 
                : (
                    <>
                    <p className="text-black text-2xl font-bold my-5">
                        Listado de gastos
                    </p>
                    {filteredExpenses.map(expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                    </>
                )
            }
        </div>
    )
}

export default ExpenseList