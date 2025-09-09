import BudgetForm from "./components/BudgetForm"

import "./assets/css/App.css"

function App() {

	return (
		<>
		<header className="bg-sky-600 py-8 max-h-72">
			<h1 className="text-center font-bold text-4xl text-white">Control de Gastos</h1>
		</header>

		<div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
			<BudgetForm
				
			/>
		</div>
		</>
	)
}

export default App
