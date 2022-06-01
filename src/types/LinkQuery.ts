export type LinkQueryFields =
	| "original_link"
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
		label: "Original Link",
		value: "original_link",
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
