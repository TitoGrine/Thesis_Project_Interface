import { useState } from "react"
import { Link } from "react-router-dom"
import { ProfileResult as ProfileResultType } from "../types/ProfileResult"
import { formatDate } from "../utils/date"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines } from "@fortawesome/free-solid-svg-icons"
import ProfileResult from "./ProfileResult"

function SearchCard(props: ProfileResultType) {
	const { username, score, processed_links } = props
	const [showResult, setShowResult] = useState<Boolean>(false)

	const openResultModal = () => {
		setShowResult(true)
		document.body.style.overflowY = "hidden"
	}

	const closeResultModal = () => {
		setShowResult(false)
		document.body.style.overflowY = "auto"
	}

	return (
		<div className="profile-card card">
			<h2>
				<strong>{username}</strong>
			</h2>
			<div className="profile-card-content">
				<p>
					Score: <strong>{score}</strong>
				</p>
				<p>
					Related links: <strong>{processed_links.length}</strong>
				</p>
				<section className="options">
					<button onClick={openResultModal}>
						<FontAwesomeIcon icon={faFileLines} />
					</button>
				</section>
			</div>
			{showResult && <ProfileResult result={props} close={closeResultModal} />}
		</div>
	)
}

export default SearchCard
