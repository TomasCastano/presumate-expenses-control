import { useMemo, useState } from "react"

const BudgetForm = () => {

    const [budget, setBudget] = useState(0)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget])

    return (
        <form className="space-y-5">
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-2xl text-sky-600 font-semibold text-center">
                    Definir Presupuesto
                </label>
            </div>
            <input 
                id="budget"   
                type="number"
                className="w-full bg-white border border-slate-200 p-2 rounded-md" 
                placeholder="Define tu presupuesto"
                name="budget" 
                value={budget}
                onChange={handleChange}
            />

            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-full text-white font-semibold p-2 rounded-md disabled:opacity-30"
                disabled={isValid}
            />
        </form>
    )
}

export default BudgetForm