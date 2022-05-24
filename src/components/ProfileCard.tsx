import { useState } from "react"
import { Link } from "react-router-dom"
import { ProfileResult } from "../types/ProfileResult"
import { formatDate } from "../utils/date"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines } from "@fortawesome/free-solid-svg-icons"

function SearchCard({ username, score, ...props }: ProfileResult) {
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
		<div className="search-card card">
			<h2>
				<strong>{username}</strong>
			</h2>
			<div className="search-card-content">
				<p>
					Score: <strong>{score}</strong>
				</p>
				<section className="options">
					<button onClick={openResultModal}>
						<FontAwesomeIcon icon={faFileLines} />
					</button>
				</section>
			</div>
		</div>
	)
}

export default SearchCard
