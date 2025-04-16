import {NextApiRequest, NextApiResponse} from "next"
import {createStartEndDateFromAvailabilityString, getGoogleClient} from "@/application/utils/google-apis"
import {BookMeetResponse} from "@/application/api-handlers/portfolio-api/responses.dto"
import {google} from "googleapis"
import {z} from "zod"

export const config = {
    maxDuration: 30
}

const schema = z.object({
    month: z.number({message: "Mois invalide"}).gte(1).lte(12),
    monthDay: z.number({message: "Jour du mois invalide"}).gte(1).lte(31),
    availabilityStart: z.string({message: "Données invalide"}),
    availabilityEnd: z.string({message: "Données invalide"}),
    email: z.string({message: "Email invalide"}).email("Veuillez fournir un email valide")
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<BookMeetResponse>) {
    try {
        // data validation

        if (req.method !== "POST") {
            res.json({error: "Requête invalide"})
            return
        }

        const {success, error, data} = schema.safeParse(JSON.parse(req.body))

        if (!success) {
            res.json({error: error?.issues[0].message ?? "Une erreur s'est produite"})
            return
        }

        const {start: startDate, end: endDate} = createStartEndDateFromAvailabilityString({
            month: data!.month,
            monthDay: data!.monthDay,
            availabilityStart: data!.availabilityStart,
            availabilityEnd: data!.availabilityEnd,
        })

        // book the meet

        const client = await getGoogleClient({
            scopes: [ "https://www.googleapis.com/auth/calendar" ]
        })

        // create the event in the agenda
        const calendar = google.calendar({
            version: "v3",
            auth: client
        })

        await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            sendNotifications: true,
            resource: {
                start: {
                    dateTime: startDate.toISOString(),
                    timeZone: "Europe/Paris"
                },
                end: {
                    dateTime: endDate.toISOString(),
                    timeZone: "Europe/Paris"
                },
                description: `Rencontre avec ${data!.email}`,
                eventType: "default",
                location: "France",
                originalStartTime: {
                    dateTime: startDate.toISOString(),
                    timeZone: "Europe/Paris"
                },
                summary: "Rencontre",
                visibility: "private"
            }
        })

        res.json({error: null})
    } catch (_) {
        res.json({error: "Une erreur s'est produite"})
    }
}
