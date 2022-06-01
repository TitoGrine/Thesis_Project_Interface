import { useState } from "react"
import { Link } from "react-router-dom"
import { SearchConfig as SearchConfigType } from "../types/SearchConfig"
import SearchConfig from "./SearchConfig"
import { formatDate, formatDuration } from "../utils/date"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faMagnifyingGlass,
	faFileLines,
	faGears,
	faBug,
} from "@fortawesome/free-solid-svg-icons"

function SearchCard({ id, config }: SearchConfigType) {
	const {
		searching,
		discovery,
		extraction,
		timestamp,
		state,
		error,
		duration,
	} = config
	const [showConfig, setShowConfig] = useState<Boolean>(false)

	const openConfig = () => {
		setShowConfig(true)
		document.body.style.overflowY = "hidden"
	}

	const closeConfig = () => {
		setShowConfig(false)
		document.body.style.overflowY = "auto"
	}

	const getCardOptions = () => {
		switch (state) {
			case "running":
				return (
					<div className="running-icon tooltip">
						<FontAwesomeIcon icon={faGears} />
						<div className="top">
							<p>The search is running.</p>
							<i></i>
						</div>
					</div>
				)
			case "error":
				return (
					<div className="error-icon tooltip">
						<FontAwesomeIcon icon={faBug} />
						<div className="top">
							<p>Error occurred in search:</p>
							<p>{error || "No error message"}</p>
							<i></i>
						</div>
					</div>
				)
			case "completed":
				return (
					<Link to={`${id}/profiles`}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</Link>
				)
			default:
				return <></>
		}
	}

	return (
		<>
			<div className="search-card card">
				<h2>
					Search <strong>{id}</strong>
				</h2>
				<div className="search-card-content">
					<p>
						Date:{" "}
						<strong>{formatDate(timestamp, true, "Europe/Lisbon")}</strong>
					</p>
					<p>
						Duration: <strong>{formatDuration(duration)}</strong>
					</p>
					<section className="options">
						{getCardOptions()}
						<button className="icon-button" onClick={openConfig}>
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
