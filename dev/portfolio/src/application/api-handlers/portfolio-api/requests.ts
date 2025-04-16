import {
    AvailabilityListResponse,
    BookMeetResponse,
    SendContactMailResponse
} from "@/application/api-handlers/portfolio-api/responses.dto"

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
 * @param email User email
 * @attention month Start from 1 to 12
 */
export async function requestBookMeet(
    {
        month,
        monthDay,
        availabilityStart,
        availabilityEnd,
        email
    }:
    {
        month: number,
        monthDay: number,
        availabilityStart: string,
        availabilityEnd: string,
        email: string
    }
): Promise<BookMeetResponse> {
    return {
        error: null
    }
}

/**
 * Request send contact mail
 * @param email Email
 * @param object Mail object
 * @param message Mail message
 */
export async function requestSendContactMail(
    {
        email,
        object,
        message
    }:
    {
        email: string,
        object: string,
        message: string
    }
): Promise<SendContactMailResponse> {
    const options = {
        method: "POST",
        body: JSON.stringify({
            email: email,
            messageObject: object,
            message: message
        })
    }

    const response = await fetch("/api/send-contact-mail", options)

    return await response.json() as SendContactMailResponse
}
