import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetAction = 
    { type: "add-budget", payload: { budget : number } } |
    { type: 'show-modal'} |
    { type: 'hide-modal'} |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: {id: Expense['id']} }

export type BudgetState = {
    budget : number,
    modal : boolean,
    expenses: Expense[]
}

export const initialState : BudgetState = {
    budget : 0,
    modal : false,
    expenses: []
}

const createExpense = (DraftExpense: DraftExpense) : Expense => {
    return {
        ...DraftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action : BudgetAction
) => {

    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget : action.payload.budget
            }
        case 'show-modal' :
            return {
                ...state,
                modal: true
            }
        case 'hide-modal' :
            return {
                ...state,
                modal: false
            }
        case 'add-expense' :
            const expense = createExpense(action.payload.expense)
            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false
            }
        case 'remove-expense' :
            return {
                ...state,
                expenses: state.expenses.filter( expense => expense.id !== action.payload.id )
            }

        default:
            return state
    }
}