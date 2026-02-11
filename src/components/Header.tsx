import { useState } from "react"
import { useBudget } from "../hooks/useBudget"
import { useExcel } from "../hooks/useExcel"
import Button from "./UI/Button"
import ErrorMessage from "./ErrorMessage"

const Header = () => {
    const { dispatch } = useBudget()
    const { fileInputRef, error, handleExport, handleImportClick, handleFile } = useExcel()
    
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="relative flex items-center justify-between">
            <div className="flex flex-col items-start justify-center">
                <span className="font-semibold text-secondary text-sm md:text-base">Bienvenido</span>
                <h1 className="font-bold text-xl md:text-2xl text-black">Control de Gastos</h1>
            </div>

            <div className="flex items-center gap-4">
                
                <button 
                    className="flex flex-col gap-1.5 z-9 md:hidden cursor-pointer p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>

                <div className={`
                    absolute md:static top-16 right-0 bg-gray-200 md:bg-transparent shadow-lg md:shadow-none p-5 md:p-0 rounded-xl z-40
                    flex flex-col md:flex-row gap-3 transition-all duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none md:opacity-100 md:scale-100 md:pointer-events-auto'}
                    md:flex
                `}>
                    <Button onClick={() => { handleExport(); setIsOpen(false); }}>
                        Exportar a Excel
                    </Button>
                    
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFile}
                        accept=".xlsx, .xls"
                        style={{ display: 'none' }} 
                    />
                    
                    <Button onClick={() => { handleImportClick(); setIsOpen(false); }}>
                        Importar desde Excel
                    </Button>
                    
                    <Button onClick={() => { dispatch({ type: 'reset-app' }); setIsOpen(false); }}>
                        Resetear App
                    </Button>
                </div>
            </div>

            {error && (
                <div className="absolute top-full right-0 mt-2">
                    <ErrorMessage>{error}</ErrorMessage>
                </div>
            )}
        </header>
    )
}

export default Header