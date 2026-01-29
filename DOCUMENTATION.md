# Documentación del Hook `useExcel`

El hook `useExcel` encapsula toda la lógica necesaria para exportar e importar gastos desde y hacia un archivo de Excel en la aplicación de control de gastos.

## Descripción General

Este hook personalizado de React proporciona las funciones y el estado necesarios para manejar la exportación de la lista de gastos actual a un archivo `.xlsx` y la importación de gastos desde un archivo similar. Se integra con el `useBudget` hook para acceder al estado de los gastos y despachar acciones para actualizarlos.

## Valores de Retorno

El hook `useExcel` retorna un objeto con los siguientes valores:

-   `fileInputRef`: Una referencia a un elemento `input` de tipo `file`. Se utiliza para abrir el selector de archivos de forma programática.
-   `error`: Un estado que almacena un mensaje de error como una cadena de texto, o `null` si no hay errores.
-   `handleExport`: Una función para exportar los gastos a un archivo de Excel.
-   `handleImportClick`: Una función que simula un clic en el `input` de archivo para iniciar el proceso de importación.
-   `handleFile`: La función que maneja el archivo seleccionado por el usuario, lo procesa y actualiza el estado de la aplicación.

---

### `handleExport()`

Esta función se encarga de la exportación de los datos.

**Funcionamiento:**

1.  Obtiene la lista de gastos del estado de la aplicación a través del hook `useBudget`.
2.  Utiliza la función `json_to_sheet` de la librería `xlsx` para convertir el array de gastos en una hoja de cálculo.
3.  Crea un nuevo libro de trabajo de Excel.
4.  Añade la hoja de cálculo al libro con el nombre "Expenses".
5.  Genera y descarga el archivo de Excel con el nombre `expenses.xlsx`.

### `handleImportClick()`

Esta función inicia el proceso de importación.

**Funcionamiento:**

1.  Comprueba si la referencia `fileInputRef` está adjunta a un elemento del DOM.
2.  Si es así, llama al método `click()` en el `input` de tipo `file`, lo que abre el diálogo del sistema para que el usuario seleccione un archivo.

### `handleFile(e: React.ChangeEvent<HTMLInputElement>)`

Esta función se ejecuta cuando el usuario selecciona un archivo.

**Funcionamiento:**

1.  **Lectura del archivo:**
    -   Obtiene el archivo seleccionado del evento.
    -   Utiliza `FileReader` para leer el contenido del archivo como una cadena binaria.

2.  **Procesamiento con `xlsx`:**
    -   Una vez que el archivo se ha leído, utiliza la librería `xlsx` para parsear los datos.
    -   Convierte la primera hoja del libro de Excel a un formato JSON.

3.  **Validación y Mapeo de Datos:**
    -   Filtra los datos para asegurarse de que cada fila (gasto) contiene las propiedades necesarias (`expenseName`, `amount`, `category`, `date`).
    -   Mapea los datos válidos para convertir la propiedad `date` (que puede ser un string o un número desde Excel) a un objeto `Date` de JavaScript. Utiliza `date-fns` para la validación y el parseo.

4.  **Actualización del Estado:**
    -   Si hay datos válidos y todas las fechas son correctas, crea un array de gastos con el formato esperado por la aplicación.
    -   Despacha la acción `add-expenses` con los nuevos gastos para añadirlos al estado global de la aplicación.
    -   Si los datos no son válidos, establece un mensaje de error.

5.  **Manejo de Errores:**
    -   Envuelve la lógica de procesamiento en un bloque `try...catch` para capturar cualquier error que pueda ocurrir al leer o parsear el archivo y establece un mensaje de error genérico.

## Ejemplo de Uso

A continuación se muestra cómo utilizar el hook `useExcel` en un componente de React.

```tsx
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
```
