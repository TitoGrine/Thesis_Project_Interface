export type ImageInfo = {
	src: string
	alt?: string
	type?: string
	width?: number
	height?: number
}

export type Entities = {
	person?: Array<string>
	norp?: Array<string>
	fac?: Array<string>
	organization?: Array<string>
	location?: Array<string>
	places?: Array<string>
	product?: Array<string>
	event?: Array<string>
	art?: Array<string>
	law?: Array<string>
	language?: Array<string>
	date?: Array<string>
	time?: Array<string>
	percent?: Array<string>
	money?: Array<string>
	quantity?: Array<string>
	ordinal?: Array<string>
	cardinal?: Array<string>
}

export type LinkInfo = {
	original_link: string
	name: Array<string>
	title: Array<string>
	is_link_tree: boolean
	description: string
	keywords: Array<string>
	internal_links: Array<string>
	external_links: Array<string>
	emails: Array<string>
	phone_numbers: Array<string>
	score: string
	images: Array<ImageInfo>
	entities: Array<Entities>
}

export type ProfileResult = {
	id: number
	username: string
	name: string
	profile_img: string
	location: string
	description: Array<string>
	entities: Array<string>
	score: string
	processed_links: Array<LinkInfo>
	unprocessed_links: Array<string>
}
