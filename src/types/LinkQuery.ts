export type LinkQueryFields =
	| "internal_links"
	| "name"
	| "title"
	| "description"
	| "keywords"
	| "emails"
	| "phone_numbers"

export type LinkQueryForm = {
	query: string
	fields: Array<LinkQueryFields>
}

export type LinkQueryRequest = {
	q: string
	fields?: string
}

export const fieldOptions = [
	{
		label: "Internal Links",
		value: "internal_links",
	},
	{
		label: "Name",
		value: "name",
	},
	{
		label: "Title",
		value: "title",
	},
	{
		label: "Description",
		value: "description",
	},
	{
		label: "Keywords",
		value: "keywords",
	},
	{
		label: "Emails",
		value: "emails",
	},
	{
		label: "Phone Numbers",
		value: "phone_numbers",
	},
]
