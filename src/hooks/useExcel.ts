import * as XLSX from 'xlsx';
import { useBudget } from './useBudget';
import { Expense } from '../types';
import { isValid, parseISO } from 'date-fns';
import { useRef, useState } from 'react';

export const useExcel = () => {
    const { state, dispatch } = useBudget();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(state.expenses);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");
        XLSX.writeFile(wb, "expenses.xlsx");
    };

    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target?.result;
                if (data) {
                    try {
                        const workbook = XLSX.read(data, { type: 'binary' });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Omit<Expense, 'id' | 'date'> & { date: string | number }[];
                        
                        const validData = jsonData.filter(item => 
                            item.expenseName && 
                            item.amount && 
                            item.category && 
                            item.date
                        ).map(item => {
                            const date = new Date(item.date);
                            return {
                                ...item,
                                date: isValid(date) ? date : parseISO(item.date.toString())
                            }
                        });

                        if (validData.length > 0 && validData.every(item => isValid(item.date))) {
                            const expensesToDispatch : Expense[] = validData.map(item => ({...item, id: ''}))
                            dispatch({ type: 'add-expenses', payload: { expenses: expensesToDispatch } });
                        } else {
                            setError('El archivo no tiene el formato correcto o las fechas no son válidas.');
                        }
                    } catch (e) {
                        setError('Ocurrió un error al procesar el archivo.');
                    }
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    return {
        fileInputRef,
        error,
        handleExport,
        handleImportClick,
        handleFile
    }
}
