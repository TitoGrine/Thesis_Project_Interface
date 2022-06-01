import { useState, useEffect } from "react"
import { SearchConfig } from "../types/SearchConfig"
import LoadingSpinner from "./LoadingSpinner"
import SearchCard from "./SearchCard"

function Searches() {
	const [loading, setLoading] = useState<Boolean>(true)
	const [searches, setSearches] = useState<Array<SearchConfig>>()

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_HOST}/searches`, {
			cache: "no-cache",
		})
			.then((response) => {
				setLoading(false)

				if (response.status >= 400) {
					throw new Error()
				}

				return response.json()
			})
			.then((data) => setSearches(data?.searches))
			.catch(() => setSearches([]))
	}, [])

	const getSearchCards = () => {
		if (searches?.length === 0)
			return (
				<div className="no-results">There is no history of searches...</div>
			)

		return searches
			?.sort(
				({ config: config1 }, { config: config2 }) =>
					Date.parse(config2.timestamp) - Date.parse(config1.timestamp)
			)
			.map(({ id, config }) => <SearchCard key={id} id={id} config={config} />)
	}

	return (
		<div className="searches">
			{!loading && searches && getSearchCards()}
			{loading && <LoadingSpinner />}
		</div>
	)
}

export default Searches
