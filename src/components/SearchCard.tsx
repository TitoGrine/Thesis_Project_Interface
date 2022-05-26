import { useState } from "react"
import { Link } from "react-router-dom"
import { SearchConfig as SearchConfigType } from "../types/SearchConfig"
import SearchConfig from "./SearchConfig"
import { formatDate } from "../utils/date"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faMagnifyingGlass,
	faFileLines,
} from "@fortawesome/free-solid-svg-icons"

function SearchCard({ id, config }: SearchConfigType) {
	const { searching, discovery, extraction, timestamp } = config
	const [showConfig, setShowConfig] = useState<Boolean>(false)

	const openConfig = () => {
		setShowConfig(true)
		document.body.style.overflowY = "hidden"
	}

	const closeConfig = () => {
		setShowConfig(false)
		document.body.style.overflowY = "auto"
	}

	return (
		<>
			<div className="search-card card">
				<h2>
					Search <strong>{id}</strong>
				</h2>
				<div className="search-card-content">
					<p>
						Date: <strong>{formatDate(timestamp)}</strong>
					</p>
					<section className="options">
						<Link to={`${id}/profiles`}>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</Link>
						<button onClick={openConfig}>
							<FontAwesomeIcon icon={faFileLines} />
						</button>
					</section>
				</div>
			</div>
			{showConfig && (
				<SearchConfig
					id={id}
					searching={searching}
					discovery={discovery}
					extraction={extraction}
					close={closeConfig}
				/>
			)}
		</>
	)
}

export default SearchCard
