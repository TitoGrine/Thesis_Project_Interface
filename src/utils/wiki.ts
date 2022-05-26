import wiki from "wikijs"

export const getWikiPage = async (entity: string) => {
	entity.replace(/[%|+\-*\\[\]&<>.]/g, "")

	return wiki({ apiUrl: "https://en.wikipedia.org/w/api.php" }).page(entity)
}
