export const formatDate = (
	rawDate: string,
	UTC: boolean,
	timeZone: string = "UTC"
): string => {
	const timestamp = new Date(`${rawDate}${UTC ? "Z" : ""}`)
	const options = {
		day: "2-digit" as const,
		month: "2-digit" as const,
		year: "numeric" as const,
		hour: "2-digit" as const,
		minute: "2-digit" as const,
		hour12: false,
		timeZone: timeZone,
	}

	return timestamp.toLocaleString("en-UK", options)
}

export const getTodayDate = () => {
	const dateArray = new Date().toISOString().split(":")

	return `${dateArray[0]}:${Math.min(Number(dateArray[1]) + 5, 59)}`
}

export const formatDuration = (seconds?: number): string => {
	return seconds
		? new Date(seconds * 1000).toISOString().substring(11, 19)
		: "-"
}
