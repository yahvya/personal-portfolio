import {AvailabilityListResponse, BookMeetResponse} from "@/api-handlers/portfolio-api/responses.dto"

/**
 * Fetch the availability for the provided data
 * @param month For month
 * @param monthDay For month day
 * @attention Month index start at 1
 */
export async function requestAvailabilityListFor(
    {
        month,
        monthDay
    }:
    {
        month: number,
        monthDay: number
    }
): Promise<AvailabilityListResponse> {
    return {
        [monthDay]: [
            {
                start: "10H",
                end: `13H ${monthDay}`
            }
        ]
    }
}

/**
 * Request a book meet
 * @param month Month number
 * @param monthDay Month day number
 * @param availabilityStart Availability start
 * @param availabilityEnd Availability end
 * @attention month Start from 1 to 12
 */
export async function requestBookMeet(
    {
        month,
        monthDay,
        availabilityStart,
        availabilityEnd
    }:
    {
        month: number,
        monthDay: number,
        availabilityStart: string
        availabilityEnd: string
    }
): Promise<BookMeetResponse> {
    return {
        error: null
    }
}
