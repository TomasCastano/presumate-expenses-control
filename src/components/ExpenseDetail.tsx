import { useMemo } from "react"
import { Expense } from "../types"
import { formatDate } from "../helpers"
import { categories } from "../data/categories"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import { useBudget } from "../hooks/useBudget"

import AmountDisplay from "./AmountDisplay"

import 'react-swipeable-list/dist/styles.css'

type ExpenseDetailProps = {
    expense: Expense
}

const ExpenseDetail = ({ expense } : ExpenseDetailProps) => {

    const { dispatch } = useBudget()

    const categoryInfo = useMemo(() => (
        categories.filter(cat => cat.id === expense.category)[0]
    ), [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => {}}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => dispatch({ type: 'remove-expense', payload: {id: expense.id} })}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg px-5 py-10 w-full border-b border-gray-200 rounded-md flex gap-5">
                    <div className="flex items-center justify-center">
                        <img className="w-16 h-16" src={`/icono_${categoryInfo?.icon}.svg`} alt="Gráfica de gastos" />  
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-600">{categoryInfo?.name}</p>
                        <p className="font-semibold text-2xl">{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetail