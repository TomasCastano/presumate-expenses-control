import { useEffect, useMemo } from "react"
import { useBudget } from "./hooks/useBudget"

import Header from "./components/Header"
import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

import "./assets/css/App.css"

function App() {

	const { state } = useBudget()

	const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

	useEffect(() => {
		localStorage.setItem('budget', state.budget.toString())
		localStorage.setItem('expenses', JSON.stringify(state.expenses))
	}, [state])

	return (
		<>

			{!isValidBudget && <BudgetForm />}

			{isValidBudget && (
				<div className="max-w-3xl mx-auto py-10 space-y-5">
					<Header />
					<div className="space-y-10">
						<BudgetTracker />
						<FilterByCategory />
						<ExpenseList />
						<ExpenseModal />
					</div>
				</div>
			)}
		</>
	)
}

export default App
