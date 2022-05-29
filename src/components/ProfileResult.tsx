import { useState, useCallback, useEffect } from "react"
import { ProfileResult as ProfileResultType } from "../types/ProfileResult"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { getWikiPage } from "../utils/wiki"

type props = {
	result: ProfileResultType
	close: () => void
}

function ProfileResult({ result, close }: props) {
	const { username, entities } = result
	const [profileEntities, setProfileEntities] = useState<
		Array<string | JSX.Element>
	>([])

	const getProfileEntities = useCallback(async () => {
		const processedEntities = await Promise.all(
			entities.map((entity) => getEntity(entity))
		)

		setProfileEntities(
			processedEntities.map((entity) => (
				<li>
					<strong>{entity}</strong>
				</li>
			))
		)
	}, [entities])

	useEffect(() => {
		getProfileEntities()
	}, [getProfileEntities])

	const getEntity = async (entity: string) => {
		try {
			const entityPage = (await getWikiPage(entity)).url()
			return (
				<a href={entityPage} target="_blank" rel="noopener noreferrer">
					{entity}
				</a>
			)
		} catch (e) {
			return entity
		}
	}

	const getPanelInformation = () => {
		const {
			id,
			name,
			profile_image,
			location,
			description,
			score,
			processed_links,
			unprocessed_links,
		} = result

		return (
			<>
				<section>
					<div>
						<p>
							Twitter ID: <strong>{id}</strong>
						</p>
						<p>
							Twitter name: <strong>{name}</strong>
						</p>
						<p>
							Score: <strong>{score}</strong>
						</p>
						<p>
							Location: <strong>{location}</strong>
						</p>
					</div>
					<img
						src={profile_image.replace("normal", "400x400")}
						alt={`${username}'s Twitter profile image.`}
					/>
				</section>
				<p>
					Description: <strong>{description}</strong>
				</p>

				<p>
					Related Links:{" "}
					{processed_links.length > 0 ? (
						<Link to={`${id}/links`}>{processed_links.length}</Link>
					) : (
						<strong>0</strong>
					)}
				</p>
				<p>
					Unprocessed Links:{" "}
					{unprocessed_links.length > 0 ? (
						<div>
							<ul>
								{unprocessed_links.map((link) => (
									<li>
										<a href={link} target="_blank" rel="noopener noreferrer">
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					) : (
						<strong>-</strong>
					)}
				</p>
				<p>
					Tweet's Entities:{" "}
					{entities.length > 0 ? (
						<div>
							<ul className="double-list">{profileEntities}</ul>
						</div>
					) : (
						<strong>-</strong>
					)}
				</p>
			</>
		)
	}

	return (
		<>
			<div className="modal profile-result-modal">
				<h2>
					Profile{" "}
					<strong>
						<a
							href={`https://twitter.com/${username}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{username}
						</a>
					</strong>{" "}
					results
				</h2>
				<div className="panel">{getPanelInformation()}</div>
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

export default ProfileResult
