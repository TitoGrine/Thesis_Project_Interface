import { useState, useEffect } from "react"
import { ProfileResult } from "../types/ProfileResult"
import { useLocation, useParams, Navigate } from "react-router-dom"
import ProfileCard from "./ProfileCard"
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik"
import {
	QueryForm,
	QueryFields,
	fieldOptions,
	QueryRequest,
} from "../types/QueryForm"
import MultiSelect from "./MultiSelect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faClock } from "@fortawesome/free-solid-svg-icons"

type props = {
	search_id: string
}

function SearchPage() {
	const { search_id } = useParams()
	const [profiles, setProfiles] = useState<Array<ProfileResult>>()

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_HOST}/searches/${search_id}`)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error()
				}

				return response.json()
			})
			.then((data) => setProfiles(data?.profiles))
			.catch(() => setProfiles([]))
	}, [search_id])

	const validateSearch = (values: QueryForm) => {
		const { query } = values

		if (query.length === 0)
			return {
				query: "A query must be provided.",
			}

		return {}
	}

	const getQueryForm = () => {
		return (
			<div>
				<Formik
					initialValues={{
						query: "",
						fields: [] as Array<QueryFields>,
					}}
					validate={validateSearch}
					onSubmit={(
						values: QueryForm,
						{ setSubmitting, resetForm }: FormikHelpers<QueryForm>
					) => {
						const { query, fields } = values
						let params: QueryRequest = {
							q: query,
						}

						if (fields.length > 0) params["fields"] = fields.join(",")

						fetch(
							`${
								process.env.REACT_APP_API_HOST
							}/searches/${search_id}?${new URLSearchParams(params)}`
						)
							.then((response) => {
								if (response.status >= 400) {
									throw new Error()
								}

								return response.json()
							})
							.then((data) => setProfiles(data?.profiles))
							.catch(() => setProfiles([]))
					}}
				>
					<Form className="query-form">
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
			{getQueryForm()}
			<div className="profiles">{profiles && getProfileCards()}</div>
		</>
	)
}

export default SearchPage
