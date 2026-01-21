import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}

const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
    return (
        <div className="flex flex-col items-start justify-between gap-1 w-full">
            <p className="text-secondary font-medium text-sm">
                {label && `${label}`}
            </p>
            <p className="text-2xl font-bold text-black">{formatCurrency(amount)}</p>
        </div>
    )
}

export default AmountDisplay