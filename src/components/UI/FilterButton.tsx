import React from 'react'

type FilterButtonProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
    className?: string
    isSelected?: boolean
}

const FilterButton = ({ onClick, children, className = '', isSelected = false }: FilterButtonProps) => {
    return (
        <button
            type='button'
            className={`flex items-center justify-center gap-1 px-3 py-1 rounded-lg text-white transition-colors cursor-pointer text-sm ${className} ${isSelected ? 'bg-primary' : 'bg-secondary/30 hover:bg-secondary/50'}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default FilterButton