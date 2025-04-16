/**
 * An availability format
 */
export type AvailabilityFormat = {
    start: string
    end: string
}

/**
 * Fetch availability list response
 */
export type AvailabilityListResponse = Record<number, AvailabilityFormat[]>

/**
 * Book meet response
 */
export type BookMeetResponse = {
    error: string | null
}
