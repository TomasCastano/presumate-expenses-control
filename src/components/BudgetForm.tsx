import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

const BudgetForm = () => {

    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'add-budget', payload: {budget}})
    }

    return (
        <div className="max-w-sm w-full space-y-5">
            <header className="flex flex-col space-y-1">
                <h2 className="text-2xl font-semibold">Define tu presupuesto</h2>
                <p className="text-secondary text-md">¿Cuánto dinero deseas controlar este mes?</p>
            </header>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <label
                    htmlFor="budget"
                    className="flex flex-row gap-1 bg-slate-100 border border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
                >
                    <span>
                        $
                    </span>
                    <input 
                        id="budget"   
                        type="number"
                        className="w-full border-none focus:outline-none" 
                        placeholder="Define tu presupuesto"
                        name="budget" 
                        value={budget}
                        onChange={handleChange}
                    />
                </label>

                <input
                    type="submit"
                    value="Definir presupuesto"
                    className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-full text-white font-semibold p-2 rounded-md disabled:opacity-30"
                    disabled={isValid}
                />
            </form>
        </div>
    )
}

export default BudgetForm