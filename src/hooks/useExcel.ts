import * as XLSX from 'xlsx'
import { useBudget } from './useBudget'
import { Expense } from '../types'
import { isValid, parseISO } from 'date-fns'
import { useRef, useState, useCallback } from 'react'
import { categories } from '../data/categories'
import DOMPurify from 'dompurify'

// Define a type for the data imported from Excel to improve type safety
type ImportedExpense = Omit<Expense, 'id' | 'date'> & { date: string | number }

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const FORMULA_CHARACTERS = ['=', '+', '-', '@', '\t', '\r']

/**
 * Sanitizes a value to prevent XSS attacks.
 * @param value The value to sanitize.
 * @returns The sanitized value.
 */
const sanitizeValue = <T>(value: T): T => {
    if (typeof value === 'string') {
        return DOMPurify.sanitize(value) as T
    }
    return value
}

/**
 * Escapes a cell value if it looks like a formula to prevent formula injection.
 * @param value The cell value.
 * @returns The escaped value.
 */
const escapeFormula = <T>(value: T): T => {
    if (typeof value === 'string' && FORMULA_CHARACTERS.some(char => value.startsWith(char))) {
        return `'${value}` as T
    }
    return value
}


export const useExcel = () => {
    const { state, dispatch } = useBudget()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleExport = useCallback(() => {
        // Sanitize and escape data before exporting
        const dataToExport = state.expenses.map(exp => ({
            ...exp,
            expenseName: escapeFormula(sanitizeValue(exp.expenseName)),
            category: escapeFormula(sanitizeValue(exp.category)),
        }))

        const ws = XLSX.utils.json_to_sheet(dataToExport)
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
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

                        if (jsonData.length < 2) {
                            throw new Error("El archivo está vacío o no contiene datos.")
                        }

                        const headers = (jsonData[0] as string[]).map(h => h.trim())
                        const expectedHeaders = ['expenseName', 'amount', 'category', 'date']
                        if (!expectedHeaders.every(h => headers.includes(h))) {
                            throw new Error("El archivo no tiene los encabezados esperados (expenseName, amount, category, date).")
                        }
                        
                        // Convert array of arrays to array of objects
                        const dataAsObjects = XLSX.utils.sheet_to_json(worksheet) as ImportedExpense[]

                        const validData = dataAsObjects.map(item => {
                            // Security: Check for malicious formulas in string fields
                            for (const key in item) {
                                const value = item[key as keyof ImportedExpense]
                                if (typeof value === 'string' && FORMULA_CHARACTERS.some(char => value.startsWith(char))) {
                                    throw new Error(`Se detectó una fórmula potencialmente maliciosa en la fila: ${JSON.stringify(item)}`)
                                }
                            }
                            
                            // Sanitize and validate data
                            const expenseName = sanitizeValue(item.expenseName)
                            const category = sanitizeValue(item.category)
                            const amount = item.amount
                            
                            if (
                                !expenseName || typeof expenseName !== 'string' ||
                                !amount || typeof amount !== 'number' ||
                                !category || !categories.some(cat => cat.id === category) ||
                                !item.date
                            ) {
                                return null // Invalid item, filter it out later
                            }
                            
                            let date
                            try {
                                const parsedDate = new Date(item.date)
                                date = isValid(parsedDate) ? parsedDate : parseISO(item.date.toString())
                                if (!isValid(date)) date = null
                            } catch {
                                date = null
                            }

                            return { ...item, expenseName, category, date }
                        }).filter((item): item is Exclude<typeof item, null> => item !== null && item.date !== null)

                        if (validData.length > 0) {
                            const expensesToDispatch: Expense[] = validData.map(item => ({ ...item, id: '', date: item.date! }))
                            dispatch({ type: 'add-expenses', payload: { expenses: expensesToDispatch } })
                        } else {
                            setError('El archivo no tiene el formato correcto, contiene datos inválidos o las fechas no son válidas.')
                        }
                    } catch (e: any) {
                        setError(e.message || 'Ocurrió un error al procesar el archivo.')
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
