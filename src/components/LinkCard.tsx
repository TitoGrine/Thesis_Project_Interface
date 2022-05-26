import { useState } from "react"
import LinkInfo from "./LinkInfo"
import { LinkInfo as LinkInfoType } from "../types/ProfileResult"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines, faTree } from "@fortawesome/free-solid-svg-icons"

function LinkCard(props: LinkInfoType) {
	const { original_link, score, is_link_tree } = props
	const [showLinkInfo, setShowLinkInfo] = useState<Boolean>(false)

	const openInfo = () => {
		setShowLinkInfo(true)
		document.body.style.overflowY = "hidden"
	}

	const closeInfo = () => {
		setShowLinkInfo(false)
		document.body.style.overflowY = "auto"
	}

	return (
		<div className="link-card card">
			<h2>
				<strong className="original-link">{original_link}</strong>
			</h2>
			<div className="link-card-content">
				<p>
					Score: <strong>{score}</strong>
				</p>
				<section className="options">
					<button onClick={openInfo}>
						<FontAwesomeIcon icon={faFileLines} />
					</button>
				</section>
			</div>
			{is_link_tree && (
				<div className="link-tree-icon tooltip">
					<FontAwesomeIcon icon={faTree} />
					<div className="top">
						<p>This is a "link-tree" website.</p>
						<i></i>
					</div>
				</div>
			)}
			{showLinkInfo && <LinkInfo info={props} close={closeInfo}></LinkInfo>}
		</div>
	)
}

export default LinkCard
