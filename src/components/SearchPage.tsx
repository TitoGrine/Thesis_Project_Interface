import { useState, useEffect } from "react"
import { ProfileResult } from "../types/ProfileResult"
import { useLocation, useParams, Navigate } from "react-router-dom"
import ProfileCard from "./ProfileCard"

type props = {
	search_id: string
}

function SearchPage() {
	const { search_id } = useParams()
	const [profiles, setProfiles] = useState<Array<ProfileResult>>()

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_HOST}/searches/${search_id}`)
			.then((response) => response.json())
			.then((data) => setProfiles(data?.profiles))
	}, [search_id])

	const getProfileCards = () => {
		return profiles
			?.sort(
				({ score: score1 }, { score: score2 }) =>
					Number(score2) - Number(score1)
			)
			.map((profile) => <ProfileCard key={profile.id} {...profile} />)
	}

	return <div className="profiles">{profiles && getProfileCards()}</div>
}

export default SearchPage
