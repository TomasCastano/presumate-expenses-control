import { useEffect, useState } from 'react'
import { useBudget } from '../hooks/useBudget'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import AmountDisplay from './AmountDisplay'

import 'react-circular-progressbar/dist/styles.css'
import Card from './UI/Card'

const BudgetTracker = () => {

    const { state, totalExpenses, remainingBudget } = useBudget()

    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, [])

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    const progressBarColor = percentage >= 95 ? '#9E2323' : (percentage > 80 ? '#C28B00' : '#0084d1')

    const message = percentage >= 95 ? 'Límite' : (percentage > 80 ? '¡Cuidado!' : 'Bien')

    return (
        <div className={`flex flex-col gap-5 transform transition-all duration-700 ease-out
        ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>

            <div className="grid grid-rows-3 grid-flow-col gap-4 leading-10">

                <Card className="flex justify-center items-center row-span-3 relative">
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: progressBarColor,
                            trailColor: '#ddd',
                            textSize: 18,
                            textColor: '#14181f',
                        })}
                        className="w-50 h-50"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                        <span className="text-4xl font-semibold text-black ">{percentage}%</span>
                        <span className='text-sm text-secondary'>{message}</span>
                    </div>
                </Card>

                <Card>
                    <AmountDisplay
                        label="Presupuesto"
                        amount={state.budget}
                    />
                </Card>
                <Card>
                    <AmountDisplay
                        label="Disponible"
                        amount={remainingBudget}
                    />
                </Card>
                <Card>
                    <AmountDisplay
                        label="Gastado"
                        amount={totalExpenses}
                    />
                </Card>
            </div>
        </div>
    )
}

export default BudgetTracker