import AmountDisplay from './AmountDisplay'

const BudgetTracker = () => {
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
                    amount={300}
                />
                <AmountDisplay 
                    label="Disponible"
                    amount={200}
                />
                <AmountDisplay 
                    label="Gastado"
                    amount={100}
                />
            </div>


        </div>
    )
}

export default BudgetTracker