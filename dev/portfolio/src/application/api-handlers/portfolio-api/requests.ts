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
    const options = {
        method: "POST",
        body: JSON.stringify({
            month: month,
            monthDay: monthDay
        })
    }

    const response = await fetch("/api/availability-list", options)

    return await response.json() as AvailabilityListResponse
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
    const options = {
        method: "POST",
        body: JSON.stringify({
            month: month,
            monthDay: monthDay,
            availabilityStart: availabilityStart,
            availabilityEnd: availabilityEnd,
            email: email
        })
    }

    const response = await fetch("/api/book-meet", options)

    return await response.json() as BookMeetResponse
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
