import "./styles/pages.scss"
import "./styles/cards.scss"
import "./styles/modal.scss"
import Searches from "./components/Searches"
import SearchPage from "./components/SearchPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/searches" element={<Searches />} />
				<Route path="/searches/:search_id" element={<SearchPage />} />
			</Routes>
		</Router>
	)
}

export default App
