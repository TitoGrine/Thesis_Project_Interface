import { useState, useEffect } from "react"
import { SearchConfig } from "../types/SearchConfig"
import SearchCard from "./SearchCard"

function Searches() {
	const [searches, setSearches] = useState<Array<SearchConfig>>()

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_HOST}/searches`)
			.then((response) => response.json())
			.then((data) => setSearches(data?.searches))
	}, [])

	const getSearchCards = () => {
		return searches
			?.map(({ id, config }) => <SearchCard key={id} id={id} config={config} />)
			.reverse()
	}

	return <div className="searches">{searches && getSearchCards()}</div>
}

Searches.propTypes = {}

export default Searches
