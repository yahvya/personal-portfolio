import React, {useState, useEffect} from "react"
import {eachDayOfInterval, startOfMonth, endOfMonth, format} from "date-fns"
import {fr} from "date-fns/locale"
import {CalendarElement} from "@/application/components/calendar-element/calendar-element"
import "./calendar.scss"
import {CalendarDayChoice} from "@/application/components/calendar-day-choice/calendar-day-choice"

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
export interface Availability {
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
        availabilityGetter: (selectedMonth: number, selectedDay: number) => Promise<AvailabilityMap>,
        onAvailabilityChosen: (selectedMonth: number, selectedDay: number, availability: Availability) => void
    }
): React.ReactElement {
    // states and effects
    const [ currentMonth, setCurrentMonth ] = useState<number>(startMonth)
    const [ selectedDayData, setSelectedDay ] = useState<DayInfo | null>(null)
    const [ availabilityMap, setAvailabilityMap ] = useState<AvailabilityMap | null>(null)
    const [ selectedAvailability, setSelectedAvailability ] = useState<number | null>(null)

    useEffect((): void => {
        if (selectedDayData) {
            availabilityGetter(currentMonth, selectedDayData.number)
                .then((availabilityMap: AvailabilityMap): void => setAvailabilityMap(availabilityMap))

            setSelectedAvailability(null)
        }
    }, [ selectedDayData ])

    useEffect(() => {
        setSelectedDay(null)
        setAvailabilityMap(null)
    }, [ currentMonth ])

    const daysList: string[] = [ "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche" ]
    const monthDate = new Date(year, currentMonth - 1, 1)
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
    const monthString: string = format(monthDate, "LLLL", {locale: fr})

    // handlers

    const decrementCurrentMonth = (): void => {
        setCurrentMonth(prev => (prev === 1 ? 12 : prev - 1))
    }

    const incrementCurrentMonth = (): void => {
        setCurrentMonth(prev => (prev === 12 ? 1 : prev + 1))
    }

    const handleSelectDay = (rowDay: DayInfo) => {
        selectedDayData?.number !== rowDay.number && setSelectedDay({
            number: rowDay.number,
            day: rowDay.day
        })
    }

    const calendarDayChoiceHandler = (index: number, availabity: Availability): void => {
        setSelectedAvailability(index)
        onAvailabilityChosen(currentMonth, selectedDayData!.number, availabity)
    }

    return (
        <div className="calendar">
            <div className="calendar-container">
                <div className="calendar-header-controls">
                    <p className="calendar-title">{monthString} {year}</p>
                    <div className="controls">
                        <span
                            onClick={decrementCurrentMonth}
                        >&lt;</span>

                        <span
                            onClick={incrementCurrentMonth}
                        >&gt;</span>
                    </div>
                </div>

                <table>
                    <thead>
                    <tr>
                        {
                            daysList.map((day: string, index: number): React.ReactElement => <th
                                key={index}>{day.slice(0, 3).toUpperCase()}.</th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        // print rows
                        formatedCalendarDays.map((rowCalendarDays: (DayInfo | null)[], index: number): React.ReactElement => (
                            <tr key={index}>
                                {
                                    // print row content
                                    rowCalendarDays.map((rowDay: DayInfo | null, index: number): React.ReactElement | null => {
                                        return (
                                            <td key={index}>
                                                {
                                                    rowDay !== null &&
                                                    <CalendarElement
                                                        dayNumber={rowDay.number}
                                                        onSelect={(_) => handleSelectDay(rowDay)}
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
                    <p>Disponibilité(s) du {selectedDayData!.day}</p>

                    {
                        // show availabilities

                        Object
                            .keys(availabilityMap)
                            .map((key: string): number => parseInt(key))
                            .map((key: number, index: number): React.ReactElement =>
                                <div key={index}>
                                    {
                                        availabilityMap[key].map((availabity: Availability, index: number): React.ReactElement => (
                                            <CalendarDayChoice
                                                key={index}
                                                startTimeText={availabity.start}
                                                endTimeText={availabity.end}
                                                selected={selectedAvailability === index}
                                                onSelect={() => calendarDayChoiceHandler(index, availabity)}
                                            />
                                        ))
                                    }
                                </div>
                            )
                    }
                </div>
            }
        </div>
    )
}
