export const formatDate = (
	rawDate: string,
	UTC: boolean,
	timeZone: string = "UTC"
): string => {
	console.log(rawDate)
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
