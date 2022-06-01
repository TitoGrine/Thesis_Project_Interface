import { useState } from "react"
import { Link } from "react-router-dom"
import { ProfileResult as ProfileResultType } from "../types/ProfileResult"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines } from "@fortawesome/free-solid-svg-icons"
import ProfileResult from "./ProfileResult"

function SearchCard(props: ProfileResultType) {
	const { id, username, score, processed_links } = props
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
		<>
			<div className="profile-card card">
				<h2>
					<strong>{username}</strong>
				</h2>
				<div className="profile-card-content">
					<p>
						Score: <strong>{score}</strong>
					</p>
					<p>
						Related links:{" "}
						<strong>
							<Link to={`${id}/links`}>{processed_links.length}</Link>
						</strong>
					</p>
					<section className="options">
						<button className="icon-button" onClick={openResultModal}>
							<FontAwesomeIcon icon={faFileLines} />
						</button>
					</section>
				</div>
			</div>
			{showResult && <ProfileResult result={props} close={closeResultModal} />}
		</>
	)
}

export default SearchCard
