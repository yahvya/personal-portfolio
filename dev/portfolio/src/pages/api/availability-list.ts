import {NextApiRequest, NextApiResponse} from "next"
import {z} from "zod"
import {AvailabilityFormat, AvailabilityListResponse} from "@/application/api-handlers/portfolio-api/responses.dto"
import {getGoogleClient} from "@/application/utils/google-apis"
import {google} from "googleapis"

export const config = {
    maxDuration: 30
}

const schema = z.object({
    month: z.number({message: "Mois invalide"}).gte(1).lte(12),
    monthDay: z.number({message: "Jour du mois invalide"}).gte(1).lte(31),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<AvailabilityListResponse>) {
    try {
        // data validation
        if (req.method !== "POST") {
            res.json({})
            return
        }

        const {success, data} = schema.safeParse(JSON.parse(req.body))

        if (!success) {
            res.json({})
            return
        }

        // check for the availabilities

        const client = await getGoogleClient({
            scopes: [ "https://www.googleapis.com/auth/calendar" ]
        })

        const calendar = google.calendar({
            version: "v3",
            auth: client
        })

        const {data: portfolioCalendar} = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID
        })

        if (!("items" in portfolioCalendar)) {
            res.json({})
            return
        }

        const todayDate = new Date()
        const meetDayItems = portfolioCalendar.items!.filter(item => {
            const itemStartDate: Date = new Date(item.start!.dateTime!)

            return todayDate.getFullYear() === itemStartDate.getFullYear() &&
                data!.month === itemStartDate.getMonth() + 1 &&
                data!.monthDay === itemStartDate.getDate()
        })

        // build availabilities
        const availabilities: AvailabilityFormat[] = []

        let meetingStartHour = parseInt(process.env.PERSONAL_MEETING_START_HOUR!)
        const meetingEndHour = parseInt(process.env.PERSONAL_MEETING_END_HOUR!)

        for (; meetingStartHour < meetingEndHour; meetingStartHour++) {
            let todayItem
            let haveToSkip = false

            for (todayItem of meetDayItems) {
                const itemStartDate: Date = new Date(todayItem.start!.dateTime!)

                if (itemStartDate.getHours() === meetingStartHour) {
                    haveToSkip = true
                    break
                }
            }

            if (haveToSkip)
                continue

            availabilities.push({
                start: `${meetingStartHour}H`,
                end: `${meetingStartHour + 1}H`,
            } as AvailabilityFormat)
        }

        res.json({
            [data!.monthDay]: availabilities
        })
    } catch (_) {
        console.dir(_, {depth: null})
        res.json({})
    }
}
