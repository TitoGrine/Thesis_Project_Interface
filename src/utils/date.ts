export const formatDate = (rawDate: string): string => {
	const timestamp = new Date(rawDate)
	const options = {
		day: "2-digit" as const,
		month: "2-digit" as const,
		year: "numeric" as const,
		hour: "2-digit" as const,
		minute: "2-digit" as const,
		hour12: false,
	}

	return timestamp.toLocaleString("en-UK", options)
}
