import { useBudget } from "../hooks/useBudget";
import { useExcel } from "../hooks/useExcel";
import Button from "./UI/Button";
import ErrorMessage from "./ErrorMessage";

const Header = () => {
    const { dispatch } = useBudget();
    const { fileInputRef, error, handleExport, handleImportClick, handleFile } = useExcel();

    return (
       <header className="flex items-center justify-between">
            <div className="flex flex-col items-start justify-center">
                <span className="font-semibold text-secondary">Bienvenido</span>
                <h1 className="font-bold text-2xl text-black">Control de Gastos</h1>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <Button onClick={handleExport}>
                        Exportar a Excel
                    </Button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFile}
                        accept=".xlsx, .xls"
                        style={{ display: 'none' }} 
                    />
                    <Button onClick={handleImportClick}>
                        Importar desde Excel
                    </Button>
                    <Button onClick={() => dispatch({ type: 'reset-app' })}>
                        Resetear App
                    </Button>
                </div>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
       </header>
    )
}

export default Header;