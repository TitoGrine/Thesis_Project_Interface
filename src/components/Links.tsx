import { useState, useEffect, useCallback } from "react"
import LinkCard from "./LinkCard"
import { LinkInfo } from "../types/ProfileResult"
import { useParams } from "react-router-dom"
import { Formik, Field, Form, FormikHelpers } from "formik"
import {
	LinkQueryForm,
	LinkQueryFields,
	fieldOptions,
	LinkQueryRequest,
} from "../types/LinkQuery"
import MultiSelect from "./MultiSelect"
import LoadingSpinner from "./LoadingSpinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faMagnifyingGlass,
	faRotateLeft,
} from "@fortawesome/free-solid-svg-icons"

function LinksPage() {
	const { search_id, profile_id } = useParams()
	const [loading, setLoading] = useState<Boolean>(true)
	const [links, setLinks] = useState<Array<LinkInfo>>()

	const getAllLinks = useCallback(() => {
		setLoading(true)

		fetch(
			`${process.env.REACT_APP_API_HOST}/searches/${search_id}/profiles/${profile_id}`
		)
			.then((response) => {
				setLoading(false)

				if (response.status >= 400) {
					throw new Error()
				}

				return response.json()
			})
			.then((data) => {
				setLinks(data?.links)
			})
			.catch(() => setLinks([]))
	}, [search_id, profile_id])

	useEffect(() => {
		getAllLinks()
	}, [getAllLinks])

	const validateSearch = (values: LinkQueryForm) => {
		const { query } = values

		if (query.length === 0)
			return {
				query: "A query must be provided.",
			}

		return {}
	}

	const getLinkQueryForm = () => {
		return (
			<div>
				<Formik
					initialValues={{
						query: "",
						fields: [] as Array<LinkQueryFields>,
					}}
					validate={validateSearch}
					onSubmit={(
						values: LinkQueryForm,
						{ setSubmitting, resetForm }: FormikHelpers<LinkQueryForm>
					) => {
						const { query, fields } = values
						let params: LinkQueryRequest = {
							q: query,
						}

						if (fields.length > 0) params["fields"] = fields.join(",")

						setLoading(true)

						fetch(
							`${
								process.env.REACT_APP_API_HOST
							}/searches/${search_id}/profiles/${profile_id}?${new URLSearchParams(
								params
							)}`
						)
							.then((response) => {
								setLoading(false)

								if (response.status >= 400) {
									throw new Error()
								}

								return response.json()
							})
							.then((data) => setLinks(data?.links))
							.catch(() => setLinks([]))
					}}
				>
					{({ submitForm, resetForm }) => (
						<Form className="query-form">
							<button
								type="button"
								onClick={() => {
									resetForm()
									getAllLinks()
								}}
							>
								<FontAwesomeIcon icon={faRotateLeft} />
							</button>
							<label>
								<Field
									id="query"
									name="query"
									placeHolder="Filter by keywords..."
									onKeyPress={(event: any) => {
										if (event.key === "Enter") {
											submitForm()
										}
									}}
								/>
								<button type="submit">
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

	const getLinkCards = () => {
		if (links?.length === 0)
			return (
				<div className="no-results">This profile has no related links...</div>
			)

		return links
			?.sort(
				({ score: score1 }, { score: score2 }) =>
					Number(score2) - Number(score1)
			)
			.map((link) => <LinkCard key={link.original_link} {...link} />)
	}

	return (
		<>
			{getLinkQueryForm()}
			<div className="links">
				{!loading && links && getLinkCards()}
				{loading && <LoadingSpinner />}
			</div>
		</>
	)
}

export default LinksPage
