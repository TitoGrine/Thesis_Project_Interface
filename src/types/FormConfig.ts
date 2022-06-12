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
	profiles: number
	keywords: string
	hashtags: string
	exclude?: string
	countries?: string
	languages?: string
	start_time?: string
	end_time?: string
}

export type Discovery = {
	keywords: string
	tweets_per_profile: number
}

export type Extraction = {
	links_per_profile: number
	entities: Entities
}

export type FormConfiguration = {
	searching: Searching
	discovery: Discovery
	extraction: Extraction
}
