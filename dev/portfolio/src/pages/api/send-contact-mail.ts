import {NextApiRequest, NextApiResponse,} from "next";
import {SendContactMailResponse} from "@/application/api-handlers/portfolio-api/responses.dto";
import {z} from "zod"
import {
    buildContactPersonalMail,
    buildContactUserMail,
    getTransport
} from "@/application/api-handlers/portfolio-api/mail";

export const config = {
    maxDuration: 30
}

const schema = z.object({
    email: z.string().email("Veuillez fournir un email valid"),
    messageObject: z.string().min(10, "Veuillez fournir un objet descriptif"),
    message: z.string().min(20, "Veuillez fournir un message descriptif"),
}, {
    message: "Requête invalide"
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<SendContactMailResponse>) {
    if (req.method !== "POST") {
        res.json({error: "Requête invalide"})
        return
    }

    // validation
    const {success, data, error} = schema.safeParse(JSON.parse(req.body))

    if (!success) {
        res.json({error: error?.issues[0].message ?? "Une erreur s'est produite"})
        return
    }

    // send mail
    const mailTransport = getTransport()

    mailTransport.verify(async (error) => {
        try {
            if (error !== null) {
                console.log(error.message)
                res.json({error: "Une erreur technique s'est produite veuillez utiliser l'icône de mail sur la page d'accueil"})
                return
            }

            await mailTransport
                .sendMail({
                    to: process.env.MAIL_EMAIL,
                    subject: "Message reçu du portfolio",
                    text: buildContactPersonalMail({
                        message: data!.message,
                        email: data!.email,
                        object: data!.messageObject
                    })
                })

            await mailTransport
                .sendMail({
                    to: data.email,
                    subject: "Confirmation de mail",
                    text: buildContactUserMail({message: data!.message})
                })

            res.json({error: null})
        } catch (_) {
            res.json({error: "Une erreur technique s'est produite veuillez utiliser l'icône de mail sur la page d'accueil"})
        }
    })
}
