import Head from "next/head"
import { useState, useEffect } from "react"
import {
    useURLState,
    createMailToLink,
    createURLParamString,
    fetchShortenedUrl,
} from "../utils"
import { GlobalStyle } from "../utils/globalStyle"

function LinkCreator(props) {
    const { children, url, secondary, areLinksValid, setAreLinksValid } = props
    const [shortLink, setShortLink] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!areLinksValid) setShortLink(null)
    }, [areLinksValid])

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

    return (
        <div className="link-container box">
            {shortLink && areLinksValid ? (
                <div className="link">
                    <input type="text" readOnly value={shortLink} />
                </div>
            ) : (
                <div onClick={createLink}>
                    {loading ? <h3>Creating Link…</h3> : children}
                </div>
            )}

            <style jsx>{`
                .link-container {
                    margin-bottom: var(--space);
                    text-align: center;
                    height: calc(var(--space) * 2.5);
                    border-color: ${secondary ? "var(--gray)" : "#000000"};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }

                .link {
                    flex: 1;
                    height: 100%;
                }

                .link input {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    flex: 1;
                    border: 0;
                }
            `}</style>
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
    const templateUrl = baseURL + createURLParamString(to, subject, body)

    return (
        <div className="container">
            <Head>
                <title>Email Template</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h4>To</h4>
                <input
                    type="text"
                    className="box"
                    placeholder="Email Address"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <h4>Subject</h4>
                <input
                    type="text"
                    className="box"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <h4>Body</h4>
                <textarea
                    className="box"
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

                <div className="divider" />

                <h4>
                    Email Link{" "}
                    <span className="secondary">
                        A link that auto-composes the email
                    </span>
                </h4>

                <LinkCreator
                    url={sendUrl}
                    areLinksValid={areLinksValid}
                    setAreLinksValid={setAreLinksValid}
                >
                    <h3>
                        <span role="img" aria-label="email">
                            ✉️
                        </span>{" "}
                        Create Link
                    </h3>
                </LinkCreator>

                <h4>
                    Template Link{" "}
                    <span className="secondary">
                        A link to a copy of this template
                    </span>
                </h4>
                <LinkCreator
                    url={templateUrl}
                    areLinksValid={areLinksValid}
                    setAreLinksValid={setAreLinksValid}
                    secondary
                >
                    <h3>
                        <span role="img" aria-label="template">
                            📝
                        </span>{" "}
                        Create Link
                    </h3>
                </LinkCreator>
            </main>

            <footer className="secondary">
                currently only supports plain text •{" "}
                <a
                    href="https://github.com/huntercaron/email-template"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    github repo
                </a>
            </footer>

            <style jsx global>{`
                .container {
                    --space: 12px;
                    --gray: rgba(0, 0, 0, 0.4);
                    --light-gray: rgba(0, 0, 0, 0.12);
                    padding: var(--space);
                }

                .box {
                    border: 1px solid #000;
                    border-radius: 3px;
                }

                h3 {
                    font-weight: 500;
                    margin: 0;
                    font-size: 14px;
                    letter-spacing: -0.25px;
                }

                h4 {
                    font-size: 12px;
                    letter-spacing: -0.2px;
                    margin: 0 0 4px;
                }

                .divider {
                    width: 100%;
                    height: 1px;
                    flex-shrink: 0;
                    border-top: 1px solid var(--light-gray);
                    margin: var(--space) 0;
                }

                .secondary {
                    color: var(--gray);
                    font-weight: 400;
                }

                .action {
                    color: #000;
                    font-size: 12px;
                    margin-right: 10px;
                    text-decoration: underline;
                }

                main {
                    display: flex;
                    flex-direction: column;
                    max-width: 400px;
                }

                input,
                textarea {
                    background-color: transparent;
                    font-size: 13px;
                    letter-spacing: -0.1px;
                    padding: 0.5rem;
                    margin-bottom: var(--space);
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                textarea {
                    height: 150px;
                    min-height: 100px;
                    min-width: 100%;
                    margin-bottom: 0px;
                }

                footer {
                    font-size: 12px;
                }

                @media (min-width: 350px) {
                    .container {
                        --space: 16px;
                    }
                }
            `}</style>

            <GlobalStyle />
        </div>
    )
}
