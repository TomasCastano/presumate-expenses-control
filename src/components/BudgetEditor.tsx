import { useState } from 'react'
import { useBudget } from '../hooks/useBudget'
import AmountDisplay from './AmountDisplay'

const BudgetEditor = () => {
    const { state, dispatch } = useBudget()
    const [isEditingBudget, setIsEditingBudget] = useState(false)
    const [newBudget, setNewBudget] = useState(state.budget)

    return (
        <>
            {isEditingBudget ? (
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        if(newBudget > 0) {
                            dispatch({ type: 'add-budget', payload: { budget: newBudget }})
                            setIsEditingBudget(false)
                        }
                    }}
                    className="flex flex-col gap-2 w-full"
                >
                    <label htmlFor="newBudget" className="text-secondary font-medium text-sm flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                        Editar Presupuesto
                    </label>
                    <div className="flex gap-2 items-center">
                        <input 
                            type="text"
                            id="newBudget"
                            className="w-full border-b-2 border-primary/20 focus:border-primary focus:outline-none p-1 text-black font-semibold text-xl transition-colors"
                            value={newBudget === 0 ? "" : newBudget.toLocaleString('en-US')}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/\D/g, "")
                                setNewBudget(Number(rawValue))
                            }}
                            autoFocus
                        />
                        <button 
                            type="submit" 
                            className="text-primary/80 hover:text-primary p-1 transition-colors cursor-pointer"
                            disabled={newBudget <= 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        <button 
                            type="button" 
                            onClick={() => {
                                setIsEditingBudget(false)
                                setNewBudget(state.budget)
                            }}
                            className="text-red-500/80 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex w-full justify-between items-center group">
                    <AmountDisplay
                        label="Presupuesto"
                        amount={state.budget}
                    />
                    <button 
                        onClick={() => {
                            setNewBudget(state.budget)
                            setIsEditingBudget(true)
                        }}
                        className="text-secondary/50 hover:text-primary opacity-0 group-hover:opacity-100 transition-all p-2 rounded-full hover:bg-primary/10"
                        title="Editar Presupuesto"
                        aria-label="Editar Presupuesto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    )
}

export default BudgetEditor
