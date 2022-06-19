import React from "react"
import { LinkInfo as LinkInfoType, Entities } from "../types/ProfileResult"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Carousel } from "react-responsive-carousel"
import { entityNameMapping } from "../utils/constants"

type props = {
	info: LinkInfoType
	close: () => void
}

function LinkInfo({ info, close }: props) {
	const {
		original_link,
		name,
		title,
		description,
		keywords,
		internal_links,
		external_links,
		emails,
		phone_numbers,
		score,
		images,
		entities,
	} = info

	const getEntitiesPanel = () => {
		if (!entities) return <></>

		const entityKeys = (Object.keys(entities) as (keyof Entities)[]).filter(
			(entity) => !!entities[entity]
		)

		return (
			<ul className="entities-panel">
				{entityKeys.map((entity) => (
					<li>
						<strong className="entity-name">{entityNameMapping[entity]}</strong>
						: {entities[entity]?.sort().join(", ") || "-"}
					</li>
				))}
			</ul>
		)
	}

	const getPanelInformation = () => {
		return (
			<>
				<p>
					Names:{" "}
					{name.length > 0 ? (
						<ul>
							{name.map((str) => (
								<li>
									<strong>{str}</strong>
								</li>
							))}
						</ul>
					) : (
						<strong>-</strong>
					)}
				</p>
				<p>
					Titles:{" "}
					{title.length > 0 ? (
						<ul>
							{title.map((str) => (
								<li>
									<strong>{str}</strong>
								</li>
							))}
						</ul>
					) : (
						<strong>-</strong>
					)}
				</p>
				<p>
					Keywords:{" "}
					{keywords.length > 0 ? (
						<ul>
							{keywords.map((str) => (
								<li>
									<strong>{str}</strong>
								</li>
							))}
						</ul>
					) : (
						<strong>-</strong>
					)}
				</p>
				<p>
					Description: <strong>{description}</strong>
				</p>
				<p>
					Score: <strong>{score}</strong>
				</p>
				<p>
					Emails:{" "}
					{emails.length > 0 ? (
						<ul>
							{emails.map((email) => (
								<li>{email}</li>
							))}
						</ul>
					) : (
						<strong>-</strong>
					)}
				</p>
				<p>
					Phone Numbers:{" "}
					{phone_numbers.length > 0 ? (
						<ul>
							{phone_numbers.map((phone_number) => (
								<li>{phone_number}</li>
							))}
						</ul>
					) : (
						<strong>-</strong>
					)}
				</p>
				<p>
					Internal Links:{" "}
					{internal_links.length > 0 ? (
						<ul>
							{internal_links.map((link) => (
								<li>
									<a href={link} target="_blank" rel="noopener noreferrer">
										{link}
									</a>
								</li>
							))}
						</ul>
					) : (
						<strong>-</strong>
					)}
				</p>
				<p>
					External Links:{" "}
					{external_links.length > 0 ? (
						<ul>
							{external_links.map((link) => (
								<li>
									<a href={link} target="_blank" rel="noopener noreferrer">
										{link}
									</a>
								</li>
							))}
						</ul>
					) : (
						<strong>-</strong>
					)}
				</p>
				<p>Extracted Entities: {getEntitiesPanel()}</p>
			</>
		)
	}

	const getImageCarousel = () => {
		if (images.length === 0) return <></>

		return (
			<Carousel
				showStatus={false}
				showArrows={true}
				showIndicators={false}
				autoPlay
				infiniteLoop
			>
				{images.map((image) => (
					<div>
						<img src={image.src} alt={image.alt} />
					</div>
				))}
			</Carousel>
		)
	}

	return (
		<>
			<div className="modal link-info-modal">
				<h2>
					Link{" "}
					<strong>
						<a
							className="original-link"
							href={original_link}
							target="_blank"
							rel="noopener noreferrer"
						>
							{original_link}
						</a>
					</strong>{" "}
					information
				</h2>
				<div className="panel">{getPanelInformation()}</div>
				<div className="image-panel">
					<p>{`Collected Images (${images.length}):`}</p> {getImageCarousel()}
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

export default LinkInfo
