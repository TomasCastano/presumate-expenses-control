import { v4 as uuidv4 } from 'uuid'
import { Categories, DraftExpense, Expense } from "../types"

export type BudgetAction =
    { type: "add-budget", payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'add-filter-category', payload: { id: Categories['id'] } } |
    { type: 'add-expenses', payload: { expenses: Expense[] } } |
    { type: 'reset-app' }

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory: Categories['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    const expenses = localStorageExpenses ? JSON.parse(localStorageExpenses) : []
    return expenses.map((expense: Expense) => ({
        ...expense,
        date: new Date(expense.date)
    }))
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (DraftExpense: DraftExpense): Expense => {
    return {
        ...DraftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetAction
) => {

    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget
            }
        case 'show-modal':
            return {
                ...state,
                modal: true
            }
        case 'hide-modal':
            return {
                ...state,
                modal: false,
                editingId: ''
            }
        case 'add-expense':
            const expense = createExpense(action.payload.expense)
            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false
            }
        case 'remove-expense':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }
        case 'get-expense-by-id':
            return {
                ...state,
                modal: true,
                editingId: action.payload.id
            }
        case 'update-expense':
            return {
                ...state,
                modal: false,
                expenses: state.expenses.map(expense => (
                    expense.id === action.payload.expense.id ? action.payload.expense : expense
                )),
                editingId: ''
            }
        case 'add-filter-category':
            return {
                ...state,
                currentCategory: action.payload.id
            }
        case 'add-expenses':
            const newExpenses = action.payload.expenses.map(expense => ({
                ...expense,
                id: uuidv4(),
                date: expense.date instanceof Date ? expense.date : new Date(expense.date)
            }))
            return {
                ...state,
                expenses: [...state.expenses, ...newExpenses]
            }
        case 'reset-app':
            return {
                budget: 0,
                modal: false,
                expenses: [],
                editingId: '',
                currentCategory: ''
            }

        default:
            return state
    }
}