import { useEffect, useState } from 'react'
import { useBudget } from '../hooks/useBudget'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import AmountDisplay from './AmountDisplay'

import 'react-circular-progressbar/dist/styles.css'
import Card from './UI/Card'

const BudgetTracker = () => {

    const { dispatch, state, totalExpenses, remainingBudget } = useBudget()

    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, [])

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    const progressBarColor = percentage >= 95 ? '#9E2323' : (percentage > 80 ? '#C28B00' : '#239E3A')

    return (
        <Card>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 transform transition-all duration-700 ease-out
            ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="flex justify-center">
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: progressBarColor,
                            trailColor: '#ddd',
                            textSize: 9,
                            textColor: progressBarColor
                        })}
                        text={`${percentage}% Gastado`}
                    />
                </div>

                <div className="flex flex-col justify-center items-center gap-8">
                    <button
                        type='button'
                        className="bg-sky-600 hover:bg-sky-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-md"
                        onClick={() => dispatch({ type: 'reset-app' })}
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
        </Card>
    )
}

export default BudgetTracker