import Link from "next/link"
import Head from "next/head"
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

    const mailToLink = createMailToLink(to, subject, body)
    const urlParamString = createURLParamString(to, subject, body)

    return (
        <main>
            <Head>
                <title>Send Email Template</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="twitter:title" content="Email Template" />
                <meta
                    name="twitter:description"
                    content="Click to send a templated email"
                />
            </Head>

            <h3>Your email client should now open.</h3>
            <h3>If not, click the button below to try again.</h3>

            <h4 className="secondary helper">
                (may not work in in-app browsers such as twitter)
            </h4>

            <a className="button-link" href={mailToLink}>
                <div className="button link-container box">
                    <h3>Open Email Client</h3>
                </div>
            </a>

            <Link href={`/${urlParamString}`}>
                <div className="button link-container secondary-container box">
                    <h3>📝Copy &amp; Edit this Template</h3>
                </div>
            </Link>
        </main>
    )
}
