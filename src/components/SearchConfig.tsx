import React from "react"
import { formatDate } from "../utils/date"
import {
	Searching,
	Discovery,
	Extraction,
	Entities,
} from "../types/SearchConfig"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

type props = {
	id: string
	searching: Searching
	discovery: Discovery
	extraction: Extraction
	close: () => void
}

function SearchConfig({ id, searching, discovery, extraction, close }: props) {
	const getSearchingPanel = () => {
		const {
			users,
			keywords,
			hashtags,
			exclude,
			countries,
			languages,
			start_time,
			end_time,
		} = searching

		return (
			<>
				<p>
					Number of users: <strong>{users}</strong>
				</p>
				<p>
					Keywords: <strong>{keywords.join(", ")}</strong>
				</p>
				<p>
					Hashtags: <strong>{hashtags.join(", ")}</strong>
				</p>
				<p>
					Excluded Words:{" "}
					<strong>{!!exclude ? exclude.join(", ") : "-"}</strong>
				</p>
				<p>
					Countries: <strong>{!!countries ? countries.join(", ") : "-"}</strong>
				</p>
				<p>
					Languages: <strong>{!!languages ? languages.join(", ") : "-"}</strong>
				</p>
				<p>
					Start Date:{" "}
					<strong>{!!start_time ? formatDate(start_time) : "-"}</strong>
				</p>
				<p>
					End Date: <strong>{!!end_time ? formatDate(end_time) : "-"}</strong>
				</p>
			</>
		)
	}

	const getDiscoveryPanel = () => {
		const { keywords, tweets_per_user } = discovery

		return (
			<>
				<p>
					Keywords: <strong>{keywords.join(", ")}</strong>
				</p>
				<p>
					Tweets per User: <strong>{tweets_per_user}</strong>
				</p>
			</>
		)
	}

	const getExtractionPanel = () => {
		const { links_per_user, entities } = extraction

		const entityKeys = Object.keys(entities) as (keyof Entities)[]
		const selectedEntities = entityKeys
			.filter((entity) => !!entities[entity])
			.join(", ")

		return (
			<>
				<p>
					Links per User: <strong>{links_per_user}</strong>
				</p>
				<p>
					Selected Entities: <strong>{selectedEntities}</strong>
				</p>
			</>
		)
	}

	return (
		<>
			<div className="modal search-config-modal">
				<h2>
					Search <strong>{id}</strong> configuration
				</h2>
				<div className="panels">
					<div className="panel searching-config">{getSearchingPanel()}</div>
					<div className="panel discovery-config">{getDiscoveryPanel()}</div>
					<div className="panel extraction-config">{getExtractionPanel()}</div>
				</div>
				<div className="close-modal-button">
					<FontAwesomeIcon icon={faXmark} onClick={close} />
				</div>
			</div>
			<div
				className="modal-background-blur"
				onClick={close}
				data-active="true"
			/>
		</>
	)
}

export default SearchConfig
