import "./styles/pages.scss"
import "./styles/cards.scss"
import "./styles/modal.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Searches from "./components/Searches"
import SearchPage from "./components/SearchPage"
import LinksPage from "./components/LinksPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/searches" element={<Searches />} />
				<Route path="/searches/:search_id/profiles" element={<SearchPage />} />
				<Route
					path="/searches/:search_id/profiles/:profile_id/links"
					element={<LinksPage />}
				/>
			</Routes>
		</Router>
	)
}

export default App
