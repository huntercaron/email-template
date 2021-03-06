import Head from "next/head"
import { useState, useEffect, useRef } from "react"
import {
    useURLState,
    createMailToLink,
    createURLParamString,
    fetchShortenedUrl,
} from "../utils"

function LinkCreator(props) {
    const { children, url, secondary, areLinksValid, setAreLinksValid } = props
    const inputEl = useRef<HTMLInputElement>()
    const [shortLink, setShortLink] = useState()
    const [loading, setLoading] = useState(false)
    const [iOS, setIOS] = useState(false)
    const [copiedLink, setCopiedLink] = useState(false)
    const copyTimeout = useRef<number>()

    useEffect(() => {
        setIOS(
            navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
        )
    }, [])

    useEffect(() => {
        if (!areLinksValid) setShortLink(null)
    }, [areLinksValid])

    useEffect(() => {
        if (shortLink && inputEl.current) {
            inputEl.current.focus()
            inputEl.current.setSelectionRange(0, 9999)
            inputEl.current.select()
        }
    }, [shortLink])

    function createLink() {
        setLoading(true)

        fetchShortenedUrl(url).then((link) => {
            setLoading(false)
            setAreLinksValid(true)
            console.log(link)
            if (link) {
                setShortLink(link)
            }
        })
    }

    function copyLink() {
        setCopiedLink(true)
        inputEl.current.focus()
        inputEl.current.select()
        document.execCommand("copy")

        copyTimeout.current = window.setTimeout(
            () => setCopiedLink(false),
            2000
        )
    }

    return (
        <div className="link-container box">
            {shortLink && areLinksValid ? (
                <div className="link">
                    <input
                        ref={inputEl}
                        type="text"
                        readOnly={!iOS}
                        value={shortLink}
                    />
                    <div className="button" onClick={copyLink}>
                        <h3>{copiedLink ? "Copied" : "Copy"}</h3>
                    </div>
                </div>
            ) : (
                <div className="button" onClick={createLink}>
                    {loading ? <h3>Creating Link…</h3> : children}
                </div>
            )}
        </div>
    )
}

export default function Home() {
    // data fields bound to URL
    const [to, setTo] = useURLState("to")
    const [subject, setSubject] = useURLState("subject")
    const [body, setBody] = useURLState("body")
    const [baseURL, setBaseURL] = useState("")
    const [areLinksValid, setAreLinksValid] = useState(false)

    useEffect(() => {
        setBaseURL(window.location.origin)
    }, [])

    useEffect(() => {
        setAreLinksValid(false)
    }, [to, subject, body])

    function clearEmail() {
        if (confirm("Are you sure you want to clear this email?")) {
            setTo("")
            setSubject("")
            setBody("")
        }
    }

    // building links
    const mailToLink = createMailToLink(to, subject, body)
    const sendUrl = baseURL + "/send" + createURLParamString(to, subject, body)

    return (
        <div className="container">
            <Head>
                <title>Email Template</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta name="twitter:title" content="Email Template" />
                <meta
                    name="twitter:description"
                    content="Create &amp; share email template links"
                />
                <meta
                    name="twitter:image"
                    content="https://email-template.now.sh/thumbnail.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <main>
                <h4>To</h4>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <h4>Subject</h4>
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <h4>Body</h4>
                <textarea
                    placeholder="Write your email here…"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <div>
                    <a className="action" href={mailToLink}>
                        Open in Email Client
                    </a>
                    <span className="action" onClick={clearEmail}>
                        Clear Email
                    </span>
                </div>

                <LinkCreator
                    url={sendUrl}
                    areLinksValid={areLinksValid}
                    setAreLinksValid={setAreLinksValid}
                >
                    <h3>
                        <span role="img" aria-label="email">
                            ✉️
                        </span>
                        &nbsp; Create Email Compose Link
                    </h3>
                </LinkCreator>

                <h4>
                    Ideal for sharing on social media. When someone clicks the
                    link, it will open their email client with the template
                    ready to send.
                </h4>

                <footer className="secondary">
                    <p>
                        plain text only • saves automatically •{" "}
                        <a
                            href="https://github.com/huntercaron/email-template"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            github repo
                        </a>
                    </p>
                </footer>
            </main>
        </div>
    )
}
