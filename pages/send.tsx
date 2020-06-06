import Link from "next/link"
import { useEffect, useState } from "react"
import { createMailToLink, getParam, createURLParamString } from "../utils"
import { GlobalStyle } from "../utils/globalStyle"

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
        <main>
            <p>Your email client should open</p>
            <p>
                You can <a href={mailLink}>click here</a> to try again.
                <br /> (This may not work directly in the twitter browser)
            </p>
            <p>
                You can also edit &amp; re-share this template on the{" "}
                <Link href={`/${urlParamString}`}>edit page</Link>.
            </p>

            <style jsx>{`
                main {
                    padding: 16px;
                }

                p {
                    margin-top: 0;
                    font-size: 15px;
                }
            `}</style>

            <GlobalStyle />
        </main>
    )
}
