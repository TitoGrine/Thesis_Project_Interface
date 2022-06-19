export type ProfileQueryFields =
	| "username"
	| "name"
	| "location"
	| "description"
	| "entities"

export type ProfileQueryForm = {
	query: string
	fields: Array<ProfileQueryFields>
}

export type ProfileQueryRequest = {
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
