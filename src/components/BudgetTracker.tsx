import { useEffect, useState } from 'react'
import { useBudget } from '../hooks/useBudget'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import AmountDisplay from './AmountDisplay'
import BudgetEditor from './BudgetEditor'
import Card from './UI/Card'

import 'react-circular-progressbar/dist/styles.css'

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 items-center">

                <Card className="flex justify-center items-center relative py-10 md:py-6 h-full">
                    <div className="w-50 h-50 md:w-64 md:h-64">
                        <CircularProgressbar
                            value={percentage}
                            styles={buildStyles({
                                pathColor: progressBarColor,
                                trailColor: '#f1f5f9',
                                strokeLinecap: 'round',
                            })}
                        />
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                        <span className="text-4xl font-bold text-black ">{percentage}%</span>
                        <span className='text-sm font-medium text-secondary uppercase tracking-wide'>{message}</span>
                    </div>
                </Card>

                <div className="flex flex-col gap-4 justify-between h-full">
                    <Card>
                        <BudgetEditor />
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
        </div>
    )
}

export default BudgetTracker