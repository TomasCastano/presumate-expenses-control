import { useBudget } from '../hooks/useBudget'

import AmountDisplay from './AmountDisplay'

const BudgetTracker = () => {

    const { state, totalExpenses, remainingBudget } = useBudget()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/grafico.jpg" alt="Gráfica de gastos" />    
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button 
                    type='button'
                    className="bg-sky-600 hover:bg-sky-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-md"
                >
                    Resetear App
                </button>
                <AmountDisplay 
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay 
                    label="Disponible"
                    amount={remainingBudget}
                />
                <AmountDisplay 
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>

        </div>
    )
}

export default BudgetTracker