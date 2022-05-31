import "./styles/form.scss"
import "./styles/pages.scss"
import "./styles/cards.scss"
import "./styles/modal.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Searches from "./components/Searches"
import LinksPage from "./components/LinksPage"
import SearchPage from "./components/SearchPage"
import SearchForm from "./components/SearchForm"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"
import Switcher from "./components/Switcher"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SearchForm />} />
				<Route path="/search" element={<Navigate to="/" replace />} />
				<Route path="/searches" element={<Searches />} />
				<Route path="/searches/:search_id/profiles" element={<SearchPage />} />
				<Route
					path="/searches/:search_id/profiles/:profile_id/links"
					element={<LinksPage />}
				/>
			</Routes>
			<Switcher />
		</Router>
	)
}

export default App
