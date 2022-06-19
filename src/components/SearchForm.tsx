import { useNavigate, useLocation } from "react-router-dom"
import {
	FormConfiguration,
	Entities,
	EntitiesArray,
	Searching as FormSearching,
} from "../types/FormConfig"
import {
	Configuration,
	Searching as SearchSearching,
} from "../types/SearchConfig"
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik"
import { entityNameMapping } from "../utils/constants"
import { getTodayDate } from "../utils/date"
import countries from "i18n-iso-countries"
// @ts-ignore
import tags from "language-tags"
import { useState } from "react"
import TweetTest from "./TweetTest"

interface LocationState {
	startConfig?: FormConfiguration
}

function SearchForm() {
	const navigate = useNavigate()
	const location = useLocation()
	const [testConfig, setTestConfig] = useState<SearchSearching | undefined>()
	const entityKeys: EntitiesArray = Object.keys(new Entities()) as EntitiesArray
	const { startConfig } = (
		location.state ? location.state : {}
	) as LocationState

	const initialValues = startConfig || {
		searching: {
			profiles: 100,
			keywords: "",
			hashtags: "",
		},
		discovery: {
			keywords: "",
			tweets_per_profile: 1500,
		},
		extraction: {
			links_per_profile: 20,
			entities: {},
		},
	}

	const validateForm = (values: FormConfiguration) => {
		let errorTriggered = false
		const errors: any = {
			searching: {},
			discovery: {},
		}

		if (
			values.searching.keywords.length === 0 &&
			values.searching.hashtags.length === 0
		) {
			errors.searching.keywords =
				"At least one of keywords or hashtags must have words."
			errors.searching.hashtags =
				"At least one of keywords or hashtags must have words."

			errorTriggered = true
		}

		if (values.searching.countries && values.searching.countries.length > 0) {
			const wrongCodes = values.searching.countries
				.split(",")
				.map((val) => val.trim())
				.filter((code) => code.length > 0 && !countries.isValid(code))

			if (wrongCodes.length > 0) {
				errors.searching.countries = `The following are not valid ISO country codes: ${wrongCodes.join(
					", "
				)}.`
				errorTriggered = true
			}
		}

		if (values.searching.languages && values.searching.languages.length > 0) {
			const wrongCodes = values.searching.languages
				.split(",")
				.map((val) => val.trim())
				.filter((code) => !tags.check(code))

			if (wrongCodes.length > 0) {
				errors.searching.languages = `The following are not valid BCP-47 identifiers: ${wrongCodes.join(
					", "
				)}.`
				errorTriggered = true
			}
		}

		if (values.searching.start_time && values.searching.end_time) {
			if (
				Date.parse(values.searching.start_time) >
				Date.parse(values.searching.end_time)
			) {
				errors.searching.start_time = "Start time has to be before end time."
				errorTriggered = true
			}
		}

		if (values.discovery.keywords.length === 0) {
			errors.discovery.keywords = "Topic keywords must be given."
			errorTriggered = true
		}

		return errorTriggered ? errors : {}
	}

	const convertSearchingValues = (
		searchConfig: SearchSearching,
		searching: FormSearching
	) => {
		if (searching.keywords.length > 0)
			searchConfig.keywords = searching.keywords
				.split(",")
				.map((val) => val.trim())
				.filter((val) => val.length > 0)
		else searchConfig.keywords = []

		if (searching.hashtags.length > 0)
			searchConfig.hashtags = searching.hashtags
				.split(",")
				.map((val) => val.trim())
				.filter((val) => val.length > 0)
		else searchConfig.hashtags = []

		if (searching.exclude && searching.exclude.length > 0)
			searchConfig.exclude = searching.exclude
				.split(",")
				.map((val) => val.trim())
				.filter((val) => val.length > 0)
		else searchConfig.exclude = []

		if (searching.countries && searching.countries.length > 0)
			searchConfig.countries = searching.countries
				.split(",")
				.map((val) => val.trim())
				.filter((code) => countries.isValid(code))
		else searchConfig.countries = []

		if (searching.languages && searching.languages.length > 0)
			searchConfig.languages = searching.languages
				.split(",")
				.map((val) => val.trim())
				.filter((code) => tags.check(code))
		else searchConfig.languages = []

		if (searching.start_time && searching.start_time.length > 0)
			searchConfig.start_time = searching.start_time + ":00Z"
		else searchConfig.start_time = undefined

		if (searching.end_time && searching.end_time.length > 0)
			searchConfig.end_time = searching.end_time + ":00Z"
		else searchConfig.end_time = undefined
	}

	const convertValues = (config: FormConfiguration): Configuration => {
		const { searching, discovery } = config
		let searchConfig: any = config

		convertSearchingValues(searchConfig.searching, searching)

		if (discovery.keywords.length > 0)
			searchConfig.discovery.keywords = discovery.keywords
				.split(",")
				.map((val) => val.trim())
				.filter((val) => val.length > 0)

		return searchConfig
	}

	const triggerTweetTest = (currentValues: FormConfiguration) => {
		const searchingConfig: any = { ...currentValues.searching }

		const errors = validateForm(currentValues)

		if (errors.searching && Object.keys(errors.searching).length > 0) {
			return
		}

		convertSearchingValues(searchingConfig, currentValues.searching)

		setTestConfig(searchingConfig)
	}

	return (
		<>
			<div>
				<Formik
					initialValues={initialValues}
					validate={validateForm}
					onSubmit={(
						values: FormConfiguration,
						{ resetForm }: FormikHelpers<FormConfiguration>
					) => {
						const configuration = convertValues(values)

						fetch(`${process.env.REACT_APP_API_HOST}/search`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(configuration),
						})
							.then((response) => {
								if (response.status >= 400) {
									resetForm({ values: initialValues })
									alert(`Error ${response.status} submitting query.`)
								} else {
									setTimeout(() => navigate("searches"), 500)
								}
							})
							.catch((error) => {
								resetForm({ values: initialValues })
								alert(`Error submitting query: ${error}`)
							})
					}}
				>
					{({ values }) => (
						<Form className="search-form">
							<section>
								<h2>Searching Parameters</h2>
								<span>
									<label htmlFor="searching.profiles">
										Number of Profiles:
										<Field
											id="searching.profiles"
											name="searching.profiles"
											type="number"
											min={1}
											max={10000}
										/>
									</label>
								</span>

								<span>
									<label htmlFor="searching.keywords">
										Search Keywords:
										<Field id="searching.keywords" name="searching.keywords" />
									</label>
									<ErrorMessage name="searching.keywords">
										{(msg) => <div className="error">{msg}</div>}
									</ErrorMessage>
								</span>

								<span>
									<label htmlFor="searching.hashtags">
										Search Hashtags:
										<Field id="searching.hashtags" name="searching.hashtags" />
									</label>
									<ErrorMessage name="searching.hashtags">
										{(msg) => <div className="error">{msg}</div>}
									</ErrorMessage>
								</span>

								<span>
									<label htmlFor="searching.exclude">
										Search Excluded Words:
										<Field id="searching.exclude" name="searching.exclude" />
									</label>
								</span>

								<div className="code-inputs">
									<span>
										<label htmlFor="searching.countries">
											Search Countries (ISO code):
											<Field
												id="searching.countries"
												name="searching.countries"
											/>
										</label>
										<ErrorMessage name="searching.countries">
											{(msg) => <div className="error">{msg}</div>}
										</ErrorMessage>
									</span>

									<span>
										<label htmlFor="searching.languages">
											Languages (BCP-47 identifier):
											<Field
												id="searching.languages"
												name="searching.languages"
											/>
										</label>
										<ErrorMessage name="searching.languages">
											{(msg) => <div className="error">{msg}</div>}
										</ErrorMessage>
									</span>
								</div>

								<div className="date-inputs">
									<span>
										<label htmlFor="searching.start_time">
											Start time:
											<Field
												id="searching.start_time"
												name="searching.start_time"
												type="datetime-local"
												min="2006-03-21T20:50"
												max={getTodayDate()}
											/>
										</label>
										<ErrorMessage name="searching.start_time">
											{(msg) => <div className="error">{msg}</div>}
										</ErrorMessage>
									</span>

									<span>
										<label htmlFor="searching.end_time">
											End time:
											<Field
												id="searching.end_time"
												name="searching.end_time"
												type="datetime-local"
												min="2006-03-21T20:50"
												max={getTodayDate()}
											/>
										</label>
										<ErrorMessage name="searching.end_time">
											{(msg) => <div className="error">{msg}</div>}
										</ErrorMessage>
									</span>
								</div>

								<button
									className="search-test-button"
									type="button"
									onClick={() => triggerTweetTest(values)}
								>
									Test Searching Results
								</button>
							</section>

							<section>
								<h2>Discovery Parameters</h2>
								<span>
									<label htmlFor="discovery.tweets_per_profile">
										Tweets per Profile:
										<Field
											id="discovery.tweets_per_profile"
											name="discovery.tweets_per_profile"
											type="number"
											min={1}
											max={5000}
										/>
									</label>
								</span>

								<span>
									<label htmlFor="discovery.keywords">
										Topic Keywords:
										<Field id="discovery.keywords" name="discovery.keywords" />
									</label>
									<ErrorMessage name="discovery.keywords">
										{(msg) => <div className="error">{msg}</div>}
									</ErrorMessage>
								</span>
							</section>

							<section>
								<h2>Extraction Parameters</h2>
								<span>
									<label htmlFor="extraction.links_per_profile">
										Links per Profile:
										<Field
											id="extraction.links_per_profile"
											name="extraction.links_per_profile"
											type="number"
											min={1}
											max={10000}
										/>
									</label>
								</span>

								<div className="entities-selection">
									<label>Include Entities:</label>
									<ul>
										{entityKeys.map((entity) => (
											<li key={entity}>
												<label className="checkbox-container">
													<Field
														id={`extraction.entities.${entity}`}
														name={`extraction.entities.${entity}`}
														type="checkbox"
													/>
													<span className="checkmark" />
													{entityNameMapping[entity]}
												</label>
											</li>
										))}
									</ul>
								</div>
							</section>

							<button type="submit">Search</button>
						</Form>
					)}
				</Formik>
			</div>
			{testConfig && (
				<TweetTest
					config={testConfig}
					setTestConfig={setTestConfig}
				></TweetTest>
			)}
		</>
	)
}

export default SearchForm
