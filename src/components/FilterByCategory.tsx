import { useEffect, useState } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import { getIconSVG } from "./icons/CategoryIcons"

import Card from "./UI/Card"

const FilterByCategory = () => {

    const { dispatch, state } = useBudget()
    
    const [animate, setAnimate] = useState(false)
    
    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, [])

    const selectedCategory = state.currentCategory

    const handleFilterChange = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch({ type: 'add-filter-category', payload: { id } })
    }

    const isSelected = (id: string) => selectedCategory === id

    return (
        <Card className={`transform transition-all duration-700 ease-out
            ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5 flex-wrap">
                    <button
                        type="button"
                        onClick={(e) => handleFilterChange('', e)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors cursor-pointer
                            ${isSelected('') ? 'bg-black' : 'bg-secondary/30 hover:bg-secondary/50'}
                        `}
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Todas
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={(e) => handleFilterChange(category.id, e)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors cursor-pointer
                                ${isSelected(category.id) ? 'bg-black' : 'bg-secondary/30 hover:bg-secondary/50'}
                            `}
                        >
                            {getIconSVG(category.icon)}
                            {category.name}
                        </button>
                    ))}
                </div>
            </form>
        </Card>
    )
}

export default FilterByCategory