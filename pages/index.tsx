import { useState, useEffect } from "react"
import Head from "next/head"

function getParam(name, location) {
    const searchParams = new URLSearchParams(location.search)
    return decodeURIComponent(searchParams.get(name) || "")
}

function setParams(name, value, location) {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(name, encodeURIComponent(value))
    window.history.replaceState(null, null, "?" + searchParams.toString())
}

// hook for storing state in URL so links can be shared
const useURLState = (name: string): [string, (item: string) => void] => {
    const [param, setParamValue] = useState("")
    const setParam = (newValue) => {
        setParamValue(newValue)
        setParams(name, newValue, window.location)
    }
    useEffect(() => {
        const currentParamValue = getParam(name, window.location)
        setParamValue(currentParamValue)
    }, [])
    return [param, setParam]
}

export default function Home() {
    const [to, setTo] = useURLState("to")
    const [subject, setSubject] = useURLState("subject")
    const [body, setBody] = useURLState("body")

    const mailLink = `mailto:${to}?subject=${subject}&body=${body}`

    return (
        <div className="container">
            <Head>
                <title>email this email</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h4>To:</h4>
                <input
                    type="text"
                    placeholder="Email Subject"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="card"
                />

                <h4>Subject:</h4>
                <input
                    type="text"
                    placeholder="Email Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="card"
                />

                <h4>Body:</h4>
                <textarea
                    placeholder="Email Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="card"
                />

                <a className="button" href={mailLink}>
                    Compose Email
                </a>
                <input type="text" disabled value={mailLink} />
            </main>

            <style jsx>{`
                main {
                    display: flex;
                    flex-direction: column;
                    max-width: 400px;
                    padding: 16px;
                }

                input,
                textarea {
                    border: 1px solid #aaa;
                    border-radius: 5px;
                    font-size: 14px;
                    padding: 0.5rem;
                    margin-bottom: 16px;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                textarea {
                    height: 200px;
                }

                h4 {
                    font-size: 14px;
                    margin: 4px 0;
                }

                .button {
                    background-color: #eee;
                    margin: 8px 0;
                    text-decoration: none;
                    color: #333;
                    text-align: center;
                    font-weight: 600;
                    padding: 8px;
                    border-radius: 5px;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>

            <style jsx global>{`
                *,
                *:before,
                *:after {
                    -webkit-overflow-scrolling: touch;
                    box-sizing: border-box;
                }

                html,
                body {
                    margin: 0;
                    height: 100%;
                    overflow-x: hidden;
                    line-height: 1.6;
                    font-weight: 400;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                    color: #222;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                    text-rendering: optimizeLegibility;

                    -moz-font-feature-settings: "kern" 1;
                    -ms-font-feature-settings: "kern" 1;
                    -o-font-feature-settings: "kern" 1;
                    -webkit-font-feature-settings: "kern" 1;
                    font-feature-settings: "kern" 1;
                    font-kerning: normal;
                }
            `}</style>
        </div>
    )
}
