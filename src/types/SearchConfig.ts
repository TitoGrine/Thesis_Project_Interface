export class Entities {
	person?: boolean
	norp?: boolean
	fac?: boolean
	organization?: boolean
	location?: boolean
	places?: boolean
	product?: boolean
	event?: boolean
	art?: boolean
	law?: boolean
	language?: boolean
	date?: boolean
	time?: boolean
	percent?: boolean
	money?: boolean
	quantity?: boolean
	ordinal?: boolean
	cardinal?: boolean
}

export type EntitiesArray = Array<keyof Entities>

export type Searching = {
	users: number
	keywords: Array<string>
	hashtags: Array<string>
	exclude?: Array<string>
	countries?: Array<string>
	languages?: Array<string>
	start_time?: string
	end_time?: string
}

export type Discovery = {
	keywords: Array<string>
	tweets_per_user: number
}

export type Extraction = {
	links_per_user: number
	entities: Entities
}

export type Configuration = {
	searching: Searching
	discovery: Discovery
	extraction: Extraction
}

export type ConfigurationHistory = Configuration & {
	timestamp: string
	state?: "running" | "error" | "completed"
	error?: string
}

export type SearchConfig = {
	id: string
	config: ConfigurationHistory
}
