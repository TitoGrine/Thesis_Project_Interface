import { useState, useEffect } from "react"
import LinkCard from "./LinkCard"
import { LinkInfo } from "../types/ProfileResult"
import { useLocation, useParams, Navigate } from "react-router-dom"

function LinksPage() {
	const { search_id, profile_id } = useParams()
	const [links, setLinks] = useState<Array<LinkInfo>>()

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_HOST}/searches/${search_id}/profiles/${profile_id}`
		)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error()
				}

				return response.json()
			})
			.then((data) => {
				setLinks(data?.links)
			})
			.catch(() => setLinks([]))
	}, [search_id, profile_id])

	const getLinkCards = () => {
		if (links?.length === 0)
			return (
				<div className="no-results">This profile has no related links...</div>
			)

		return links
			?.sort(
				({ score: score1 }, { score: score2 }) =>
					Number(score2) - Number(score1)
			)
			.map((link) => <LinkCard key={link.original_link} {...link} />)
	}

	return <div className="links">{links && getLinkCards()}</div>
}

export default LinksPage
