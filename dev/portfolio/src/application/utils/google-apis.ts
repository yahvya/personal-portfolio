import {google} from "googleapis"

/**
 * Create the authentication google client
 * @param scopes Scopes
 */
export async function getGoogleClient(
    {scopes}:
    { scopes: string[] }
) {
    const authHandler = new google.auth.GoogleAuth({
        keyFile: `${process.cwd()}${process.env.GOOGLE_AUTH_FILE}`,
        scopes: scopes
    })

    return await authHandler.getClient()
}

/**
 * Format availability data
 * @param month Month number (1 to 12)
 * @param monthDay Month day number
 * @param availabilityStart Availability start hourH
 * @param availabilityEnd Availability end hourH
 * @return The formated format
 */
export function createStartEndDateFromAvailabilityString(
    {
        month,
        monthDay,
        availabilityStart,
        availabilityEnd
    }:
    {
        month: number,
        monthDay: number,
        availabilityStart: string,
        availabilityEnd: string
    }
): { start: Date, end: Date } {
    const currentYear = new Date().getFullYear()
    const formatedMonthDay = monthDay < 10 ? `0${monthDay}` : `${monthDay}`
    const formatedMonth = month < 10 ? `0${month}` : `${month}`
    const formatedStart = availabilityStart.substring(0, availabilityStart.length - 1)
    const formatedEnd = availabilityEnd.substring(0, availabilityEnd.length - 1)

    return {
        start: new Date(`${currentYear}-${formatedMonth}-${formatedMonthDay} ${formatedStart}:00:00`),
        end: new Date(`${currentYear}-${formatedMonth}-${formatedMonthDay} ${formatedEnd}:00:00`)
    }
}
