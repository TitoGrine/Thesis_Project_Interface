import { useState, useEffect } from "react"
import LinkCard from "./LinkCard"
import { ProfileResult } from "../types/ProfileResult"
import { useLocation, useParams, Navigate } from "react-router-dom"

function LinksPage() {
	const { search_id, profile_id } = useParams()
	const [profile, setProfile] = useState<ProfileResult>()

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_HOST}/searches/${search_id}/profiles/${profile_id}`
		)
			.then((response) => response.json())
			.then((data) => {
				setProfile(data?.profile)
			})
	}, [search_id, profile_id])

	const getLinkCards = () => {
		if (!profile) return <></>

		const { processed_links } = profile

		return processed_links
			?.sort(
				({ score: score1 }, { score: score2 }) =>
					Number(score2) - Number(score1)
			)
			.map((link) => <LinkCard key={link.original_link} {...link} />)
	}

	return <div className="links">{profile && getLinkCards()}</div>
}

export default LinksPage
