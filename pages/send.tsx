import Link from "next/link"
import { useEffect, useState } from "react"
import { createMailToLink, getParam, createURLParamString } from "../utils"

export default function Send() {
    const [to, setTo] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        const searchParams = window.location.search
        const newTo = getParam("to", searchParams)
        const newSubject = getParam("subject", searchParams)
        const newBody = getParam("body", searchParams)

        setTo(newTo)
        setSubject(newSubject)
        setBody(newBody)

        const newMailLink = createMailToLink(newTo, newSubject, newBody)
        window.location.href = newMailLink
    }, [])

    const mailLink = createMailToLink(to, subject, body)
    const urlParamString = createURLParamString(to, subject, body)

    return (
        <>
            <p>
                Your email client should open - if not you can{" "}
                <a href={mailLink}>click here</a> to try again.
            </p>
            <p>
                You can also edit &amp; re-share this template on the{" "}
                <Link href={`/${urlParamString}`}>edit page</Link>.
            </p>
        </>
    )
}
