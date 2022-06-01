import { useState, useEffect, useCallback } from "react"
import { ProfileResult } from "../types/ProfileResult"
import { useParams } from "react-router-dom"
import ProfileCard from "./ProfileCard"
import { Formik, Field, Form, FormikHelpers } from "formik"
import {
	ProfileQueryForm,
	ProfileQueryFields,
	fieldOptions,
	ProfileQueryRequest,
} from "../types/ProfileQuery"
import MultiSelect from "./MultiSelect"
import LoadingSpinner from "./LoadingSpinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faMagnifyingGlass,
	faRotateLeft,
} from "@fortawesome/free-solid-svg-icons"

function SearchPage() {
	const { search_id } = useParams()
	const [loading, setLoading] = useState<Boolean>(true)
	const [profiles, setProfiles] = useState<Array<ProfileResult>>()

	const getAllProfiles = useCallback(() => {
		setLoading(true)

		fetch(`${process.env.REACT_APP_API_HOST}/searches/${search_id}`)
			.then((response) => {
				setLoading(false)

				if (response.status >= 400) {
					throw new Error()
				}

				return response.json()
			})
			.then((data) => setProfiles(data?.profiles))
			.catch(() => setProfiles([]))
	}, [search_id])

	useEffect(() => {
		getAllProfiles()
	}, [getAllProfiles])

	const validateSearch = (values: ProfileQueryForm) => {
		const { query } = values

		if (query.length === 0)
			return {
				query: "A query must be provided.",
			}

		return {}
	}

	const getProfileQueryForm = () => {
		return (
			<div>
				<Formik
					initialValues={{
						query: "",
						fields: [] as Array<ProfileQueryFields>,
					}}
					validate={validateSearch}
					onSubmit={(
						values: ProfileQueryForm,
						{ setSubmitting, resetForm }: FormikHelpers<ProfileQueryForm>
					) => {
						const { query, fields } = values
						let params: ProfileQueryRequest = {
							q: query,
						}

						if (fields.length > 0) params["fields"] = fields.join(",")

						setLoading(true)

						fetch(
							`${
								process.env.REACT_APP_API_HOST
							}/searches/${search_id}?${new URLSearchParams(params)}`
						)
							.then((response) => {
								setLoading(false)

								if (response.status >= 400) {
									throw new Error()
								}

								return response.json()
							})
							.then((data) => setProfiles(data?.profiles))
							.catch(() => setProfiles([]))
					}}
				>
					{({ submitForm, resetForm }) => (
						<Form className="query-form">
							<button
								type="button"
								onClick={() => {
									resetForm()
									getAllProfiles()
								}}
							>
								<FontAwesomeIcon icon={faRotateLeft} />
							</button>
							<label>
								<Field
									id="query"
									name="query"
									placeHolder="Filter by keywords..."
								/>
								<button type="submit">
									{" "}
									<FontAwesomeIcon icon={faMagnifyingGlass} />
								</button>
							</label>
							<Field
								className="custom-select"
								name="fields"
								options={fieldOptions}
								component={MultiSelect}
								placeholder="Select fields..."
							/>
						</Form>
					)}
				</Formik>
			</div>
		)
	}

	const getProfileCards = () => {
		if (profiles?.length === 0)
			return (
				<div className="no-results">This search returned no profiles...</div>
			)

		return profiles
			?.sort(
				({ score: score1 }, { score: score2 }) =>
					Number(score2) - Number(score1)
			)
			.map((profile) => <ProfileCard key={profile.id} {...profile} />)
	}

	return (
		<>
			{getProfileQueryForm()}
			<div className="profiles">
				{!loading && profiles && getProfileCards()}
				{loading && <LoadingSpinner />}
			</div>
		</>
	)
}

export default SearchPage
