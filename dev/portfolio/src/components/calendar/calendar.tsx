import React, {useState, useEffect} from "react"
import {eachDayOfInterval, startOfMonth, endOfMonth, format} from "date-fns"
import {fr} from "date-fns/locale"
import {CalendarElement} from "@/components/calendar-element/calendar-element"
import "./calendar.scss"
import {CalendarDayChoice} from "@/components/calendar-day-choice/calendar-day-choice";

/**
 * A calendar day info
 */
type DayInfo = {
    number: number
    day: string
}

/**
 * An availability format
 */
interface Availability {
    start: string,
    end: string
}

/**
 * Availability map format
 */
export type AvailabilityMap = Record<number, Availability[]>

/**
 * Get days in month
 * @param month Month number 1 to 12
 * @param year Year
 */
export function getDaysInMonth(
    {
        month,
        year
    }:
    {
        month: number,
        year: number
    }
): DayInfo[] {
    const startDate: Date = startOfMonth(new Date(year, month - 1))
    const endDate: Date = endOfMonth(startDate)

    return eachDayOfInterval({start: startDate, end: endDate})
        .map((date: Date) => ({
                number: date.getDate(),
                day: format(date, "EEEE", {locale: fr}),
            })
        )
}

/**
 * Calendar
 * @param startMonth Calendar start month
 * @param year Calendar year
 * @param availabilityGetter Availability getter, called when a day is selected
 * @param onAvailabilityChosen Action do to on availability choice
 * @constructor
 */
export function Calendar(
    {
        startMonth,
        year,
        availabilityGetter,
        onAvailabilityChosen
    }:
    {
        startMonth: number,
        year: number,
        availabilityGetter: (selectedDay: number) => Promise<AvailabilityMap>,
        onAvailabilityChosen: (selectedDay: number, availability: Availability) => void
    }
): React.ReactElement {
    // states and effects
    const [ currentMonth, setCurrentMonth ] = useState<number>(startMonth)
    const [ selectedDayData, setSelectedDay ] = useState<DayInfo | null>(null)
    const [ availabilityMap, setAvailabilityMap ] = useState<AvailabilityMap | null>(null)
    const [ selectedAvailability, setSelectedAvailability ] = useState<number | null>(null)

    useEffect((): void => {
        if (selectedDayData) {
            availabilityGetter(selectedDayData.number)
                .then((availabilityMap: AvailabilityMap): void => setAvailabilityMap(availabilityMap))

            setSelectedAvailability(null)
        }
    }, [ selectedDayData ])

    const daysList: string[] = [ "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche" ]
    const pastDate = new Date(year, startMonth - 1, 0)
    const daysOfMonth: DayInfo[] = getDaysInMonth({month: currentMonth, year: year})

    const formatedCalendarDays: (DayInfo | null)[][] = []

    // build days map
    while (daysOfMonth.length != 0) {
        const weekArray: (DayInfo | null)[] = []

        daysList.forEach((day: string): void => {
            if (daysOfMonth.length > 0 && day === daysOfMonth[0].day) {
                weekArray.push(daysOfMonth[0])
                daysOfMonth.shift()
            } else
                weekArray.push(null)
        })

        formatedCalendarDays.push(weekArray)
    }

    // month string
    const monthString: string = format(pastDate, "LLLL", {locale: fr})

    return (
        <div className="calendar">
            <div className="calendar-container">
                <p className="calendar-title">{monthString} {year}</p>

                <table>
                    <thead>
                    <tr>
                        {
                            daysList.map((day: string): React.ReactElement => <th>{day.slice(0, 3).toUpperCase()}.</th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        // print rows
                        formatedCalendarDays.map((rowCalendarDays: (DayInfo | null)[]): React.ReactElement => (
                            <tr>
                                {
                                    // print row content
                                    rowCalendarDays.map((rowDay: DayInfo | null): React.ReactElement | null => {
                                        return (
                                            <td>
                                                {
                                                    rowDay !== null &&
                                                    <CalendarElement
                                                        dayNumber={rowDay.number}
                                                        onSelect={(day: number): void => {
                                                            selectedDayData?.number !== day && setSelectedDay({
                                                                number: day,
                                                                day: rowDay.day
                                                            })
                                                        }}
                                                        selected={selectedDayData != null && selectedDayData.number === rowDay.number}
                                                    />
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

            {
                availabilityMap != null &&
                <div className="availability">
                    <p>Disponibilité du {selectedDayData!.day}</p>

                    {
                        // show availabilities

                        Object
                            .keys(availabilityMap)
                            .map((key: string): number => parseInt(key))
                            .map((key: number): React.ReactElement =>
                                <>
                                    {
                                        availabilityMap[key].map((availabity: Availability, index: number): React.ReactElement => (
                                            <CalendarDayChoice
                                                startTimeText={availabity.start}
                                                endTimeText={availabity.end}
                                                selected={selectedAvailability === index}
                                                onSelect={(): void => {
                                                    setSelectedAvailability(index)
                                                    onAvailabilityChosen(selectedDayData!.number, availabity)
                                                }}
                                            />
                                        ))
                                    }
                                </>
                            )
                    }
                </div>
            }
        </div>
    )
}
