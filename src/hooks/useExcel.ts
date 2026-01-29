import * as XLSX from 'xlsx'
import { useBudget } from './useBudget'
import { Expense } from '../types'
import { isValid, parseISO } from 'date-fns'
import { useRef, useState, useCallback } from 'react'
import { categories } from '../data/categories'

// Define a type for the data imported from Excel to improve type safety
type ImportedExpense = Omit<Expense, 'id' | 'date'> & { date: string | number }

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export const useExcel = () => {
    const { state, dispatch } = useBudget()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleExport = useCallback(() => {
        const ws = XLSX.utils.json_to_sheet(state.expenses)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Expenses")
        XLSX.writeFile(wb, "expenses.xlsx")
    }, [state.expenses])

    const handleImportClick = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }, [])

    const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setIsLoading(true)
        const file = e.target.files?.[0]

        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setError('El archivo es demasiado grande. El tamaño máximo es de 5 MB.')
                setIsLoading(false)
                return
            }

            const reader = new FileReader()
            reader.onload = (event) => {
                const data = event.target?.result
                if (data) {
                    try {
                        const workbook = XLSX.read(data, { type: 'binary' })
                        const sheetName = workbook.SheetNames[0]
                        const worksheet = workbook.Sheets[sheetName]
                        const jsonData = XLSX.utils.sheet_to_json(worksheet) as ImportedExpense[]
                        
                        const validData = jsonData.filter(item =>
                            item.expenseName &&
                            typeof item.expenseName === 'string' &&
                            item.amount &&
                            typeof item.amount === 'number' &&
                            item.category &&
                            categories.some(cat => cat.id === item.category) &&
                            item.date
                        ).map(item => {
                            let date
                            try {
                                const parsedDate = new Date(item.date)
                                date = isValid(parsedDate) ? parsedDate : parseISO(item.date.toString())
                            } catch {
                                date = null
                            }
                            return { ...item, category: item.category.toString(), date }
                        })

                        const allDatesValid = validData.every(item => item.date && isValid(item.date))

                        if (validData.length > 0 && allDatesValid) {
                            const expensesToDispatch: Expense[] = validData.map(item => ({ ...item, id: '', date: item.date! }))
                            dispatch({ type: 'add-expenses', payload: { expenses: expensesToDispatch } })
                        } else {
                            setError('El archivo no tiene el formato correcto, contiene datos inválidos o las fechas no son válidas.')
                        }
                    } catch (e) {
                        setError('Ocurrió un error al procesar el archivo.')
                    } finally {
                        setIsLoading(false)
                    }
                }
            }
            reader.onerror = () => {
                setError('No se pudo leer el archivo.')
                setIsLoading(false)
            }
            reader.readAsBinaryString(file)
        } else {
            setIsLoading(false)
        }
    }, [dispatch])

    return {
        fileInputRef,
        error,
        isLoading,
        handleExport,
        handleImportClick,
        handleFile
    }
}
