import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetAction = 
    { type: "add-budget", payload: { budget : number } } |
    { type: 'show-modal'} |
    { type: 'hide-modal'} |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: {id: Expense['id']} } |
    { type: 'get-expense-by-id', payload: {id: Expense['id']} } |
    { type: 'update-expense', payload: {expense: Expense} }

export type BudgetState = {
    budget : number,
    modal : boolean,
    expenses: Expense[],
    editingId: Expense['id']
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState : BudgetState = {
    budget : initialBudget(),
    modal : false,
    expenses: localStorageExpenses(),
    editingId: ''
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
                modal: false,
                editingId: ''
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
        case 'get-expense-by-id' :
            return {
                ...state,
                modal: true,
                editingId: action.payload.id
            }
        case 'update-expense' :
            return {
                ...state,
                modal: false,
                expenses: state.expenses.map(expense => (
                    expense.id === action.payload.expense.id ? action.payload.expense : expense
                )),
                editingId: ''
            }

        default:
            return state
    }
}