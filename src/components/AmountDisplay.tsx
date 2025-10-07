import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}

const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
    return (
        <div className="flex items-center justify-between gap-3">
            <p className="text-sky-600 font-bold text-xl">
                {label && `${label}: `}
            </p>
            <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
        </div>
    )
}

export default AmountDisplay