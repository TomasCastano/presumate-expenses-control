# 💰 PresuMate - Control de Gastos Inteligente

PresuMate es una aplicación web moderna de gestión financiera personal. Ha sido diseñada para que puedas definir un presupuesto, registrar tus consumos diarios y visualizar el estado de tu dinero de forma clara y atractiva.

## ¿Qué hace especial a PresuMate?

PresuMate no es solo una lista de gastos; es una herramienta completa para entender tus hábitos financieros:

- **Gestión de Presupuesto:** Define cuánto quieres gastar y la app te avisará cuánto te queda disponible en tiempo real.

- **Registro Detallado:** Añade gastos indicando el nombre, el monto y una categoría (Comida, Salud, Ocio, etc.).

- **Visualización con Gráficos:** Incluye una barra de progreso circular que te muestra visualmente qué porcentaje de tu presupuesto ya has consumido.

- **Filtros Inteligentes:** ¿Quieres saber cuánto gastas solo en suscripciones? Puedes filtrar tus gastos por categoría fácilmente.

- **Supervivencia de Datos:** Tus datos se guardan automáticamente en tu navegador (localStorage), así que no perderás nada al cerrar la pestaña.

- **Importación y Exportación con Excel:** 
  - **Exportar:** Descarga todos tus movimientos a un archivo Excel para revisarlos en tu computadora.
  - **Importar:** Si ya tienes una lista en Excel, súbela y PresuMate la procesará por ti.

## 🖥️ Tecnología de Vanguardia

Para que la aplicación sea rápida, segura y fácil de usar, hemos utilizado las herramientas más potentes del desarrollo web actual:

- **React 19 & TypeScript:** La base de la app, garantizando una interfaz ultra rápida y libre de errores comunes.

- **Tailwind CSS:** Para un diseño "responsive" que se ve increíble tanto en tu celular como en tu monitor de escritorio.

- **Análisis Visual:** Usamos react-circular-progressbar para los indicadores y Heroicons para una iconografía elegante.

- **Manejo de Datos:**
  - **xlsx:** La tecnología que permite leer y crear archivos de Excel.
  - **date-fns:** Para que el calendario y las fechas sean precisos.
  - **uuid:** Genera identificadores únicos para que cada gasto sea rastreable sin confusiones.

- **Seguridad:** Implementamos dompurify para proteger la aplicación de cualquier dato malicioso que se intente introducir.

## 🏗️ Estructura del Proyecto

La app está organizada siguiendo los mejores estándares de la industria:

- **Componentes Modulares:** Cada parte de la pantalla (el formulario, el gráfico, la lista) es independiente, lo que hace que el código sea fácil de mejorar.

- **Context API & useReducer:** Usamos un sistema centralizado para manejar la información, similar a cómo funcionan las grandes aplicaciones profesionales.

- **Custom Hooks:** Creamos nuestras propias herramientas personalizadas (useBudget, useExcel) para que el código sea más limpio y fácil de leer.

## 🚀 Instalación y Uso

Si quieres ejecutar este proyecto en tu propia computadora, sigue estos pasos:

### Clona el proyecto:

```bash
git clone https://github.com/TomasCastano/presumate-expenses-control
```

### Instala las dependencias:

```bash
npm install
```

### Inicia la aplicación:

```bash
npm run dev
```

## 📋 Categorías Disponibles

La app viene configurada con las categorías más comunes para tu día a día:

- 💰 Ahorro
- 🍕 Comida
- 🏠 Casa
- 📦 Gastos varios
- 🎮 Ocio
- 🏥 Salud
- 📺 Suscripciones
- 📄 Licencia

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT. ¡Siéntete libre de usarlo y mejorarlo!

---

Hecho con ❤️ por [Tomás Castaño](https://www.linkedin.com/in/tomascastanochica) para mejorar tu salud financiera.
