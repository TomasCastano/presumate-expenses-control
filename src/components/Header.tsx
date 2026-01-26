import { useBudget } from "../hooks/useBudget"

const Header = () => {

    const { dispatch } = useBudget()

    return (
       <header className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-center">
            <span className="font-semibold text-secondary">Bienvenido</span>
            <h1 className="font-bold text-2xl text-black">Control de Gastos</h1>
        </div>
        <button
                type='button'
                className="bg-primary hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => dispatch({ type: 'reset-app' })}
            >
                Resetear App
            </button>
       </header>
    )
}

export default Header