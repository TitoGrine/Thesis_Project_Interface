import React, { useState, useEffect } from "react"
import { Searching } from "../types/SearchConfig"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Tweet } from "../types/Tweet"

type props = {
	config: Searching
	setTestConfig: React.Dispatch<React.SetStateAction<Searching | undefined>>
}

function TweetTest({ config, setTestConfig }: props) {
	const [tweets, setTweets] = useState<Array<Tweet>>([])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_HOST}/search/test`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(config),
		})
			.then((response) => {
				if (response.status >= 400) {
					throw new Error()
				}

				return response.json()
			})
			.then((data) => setTweets(data?.tweets))
			.catch(() => setTweets([]))
	}, [config])

	const getTweets = () => {
		if (tweets.length === 0)
			return <p className="no-results">No tweets matched returned...</p>

		return tweets.map(({ id, username, tweet }) => (
			<div key={id} className="tweet">
				<p>
					<strong>
						<a
							href={`https://twitter.com/${username}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{username}
						</a>
					</strong>
				</p>
				<p>{tweet}</p>
			</div>
		))
	}

	return (
		<>
			<div className="modal tweets-test-modal">
				<h2>Search Test Results</h2>
				<div className="panel">{getTweets()}</div>
				<div className="close-modal-button">
					<FontAwesomeIcon
						icon={faXmark}
						onClick={() => setTestConfig(undefined)}
					/>
				</div>
			</div>
			<div
				className="modal-background-blur"
				onClick={() => setTestConfig(undefined)}
				data-active="true"
			/>
		</>
	)
}

export default TweetTest
