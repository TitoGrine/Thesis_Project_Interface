export type QueryFields =
	| "username"
	| "name"
	| "location"
	| "description"
	| "entities"

export type QueryForm = {
	query: string
	fields: Array<QueryFields>
}

export type QueryRequest = {
	q: string
	fields?: string
}

export const fieldOptions = [
	{
		label: "Username",
		value: "username",
	},
	{
		label: "Name",
		value: "name",
	},
	{
		label: "Location",
		value: "location",
	},
	{
		label: "Description",
		value: "description",
	},
	{
		label: "Entities",
		value: "entities",
	},
]
