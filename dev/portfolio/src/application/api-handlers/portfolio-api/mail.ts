import {createTransport} from "nodemailer"

/**
 * @returns Transporter Mail transporter
 */
export const getTransport = () => createTransport({
    pool: true,
    host: process.env.MAIL_HOST!,
    port: parseInt(process.env.MAIL_PORT!),
    secure: false,
    auth: {
        user: process.env.MAIL_EMAIL!,
        pass: process.env.MAIL_PASSWORD!,
    },
    from: `Yahaya Bathily ${process.env.MAIL_EMAIL!}`
})

/**
 * Build the mail send to the user
 * @param message User message
 * @returns string Built message
 */
export const buildContactUserMail = (
    {message}:
    { message: string }
): string => {
    return `Bonjour,
Je vous accuse réception de votre message et tâcherai d'y répondre le plus rapidement possible.

Voici une copie de votre message :
${message}`
}

/**
 * Build the mail send to me
 * @param email User email
 * @param object User object message
 * @param message User message
 * @returns string Built message
 */
export const buildContactPersonalMail = (
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
): string => {
    return `Réception d'un nouveau mail.
Email: ${email}
Object : ${object}
Message: ${message}`
}
