import { Expense } from "../types"
import { formatDate } from "../helpers"

import AmountDisplay from "./AmountDisplay"

type ExpenseDetailProps = {
    expense: Expense
}

const ExpenseDetail = ({ expense } : ExpenseDetailProps) => {
    return (
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 rounded-md flex gap-5">
            <div className="">

            </div>
            <div className="">
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{formatDate(expense.date.toString())}</p>
            </div>

            <AmountDisplay
                amount={expense.amount}
            />
        </div>
    )
}

export default ExpenseDetail