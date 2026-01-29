import { useReducer, createContext, Dispatch, ReactNode, useMemo, useEffect } from "react"
import { budgetReducer, initialState, BudgetState, type BudgetAction } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetAction>,
    totalExpenses: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    useEffect(() => {
        localStorage.setItem('budget', state.budget.toString())
        localStorage.setItem('expenses', JSON.stringify(state.expenses))
    }, [state.budget, state.expenses])

    const totalExpenses = useMemo(() => {
        return state.expenses.reduce((total, expense) => expense.amount + total, 0)
    }, [state.expenses])

    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider value={{
            state,
            dispatch,
            totalExpenses,
            remainingBudget
        }}>
            {children}
        </BudgetContext.Provider>
    )
}