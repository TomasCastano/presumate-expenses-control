import { useEffect, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

const BudgetForm = () => {

    const [budget, setBudget] = useState<number>(NaN)
    const { dispatch } = useBudget()
    
    const [animate, setAnimate] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'add-budget', payload: {budget}})
    }
    
    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className="w-full h-[100dvh] flex items-center justify-center">
            <div className={`max-w-sm w-full space-y-7 transform transition-all duration-700 ease-out rounded-xl 
                ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
                <header className="flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center justify-center p-2 rounded-full bg-primary/10 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-primary-hover">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-3xl font-bold text-center">Define tu presupuesto</h2>
                        <p className="text-secondary text-base text-center">Establece tu presupuesto mensual para comenzar a controlar tus gastos</p>
                    </div>
                </header>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <label
                        htmlFor="budget"
                        className="flex flex-row gap-2 bg-slate-100 border border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
                    >
                        <span className="font-bold text-neutral-600 text-xl">
                            $
                        </span>
                        <input 
                            id="budget"   
                            type="number"
                            className="w-full border-none focus:outline-none font-medium text-lg" 
                            placeholder="0.00"
                            name="budget" 
                            value={budget}
                            onChange={handleChange}
                        />
                    </label>

                    <input
                        type="submit"
                        value="Definir presupuesto"
                        className="bg-primary hover:bg-primary-hover cursor-pointer w-full text-white font-semibold p-2 rounded-md disabled:opacity-30"
                        disabled={isValid}
                    />
                </form>
            </div>
        </div>
    )
}

export default BudgetForm