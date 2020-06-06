import Head from "next/head";
import { useState, useEffect } from "react";
import {
  useURLState,
  createMailToLink,
  createURLParamString,
  getShortenedUrl,
} from "../utils";
import { GlobalStyle } from "../utils/globalStyle";

/*
    TODO
    add URL shortening
    add 'clear email' button
*/

export default function Home() {
  // data fields bound to URL
  const [to, setTo] = useURLState("to");
  const [subject, setSubject] = useURLState("subject");
  const [body, setBody] = useURLState("body");
  const [baseURL, setBaseURL] = useState("");

  useEffect(() => {
    setBaseURL(window.location.origin);
  }, []);

  const mailLink = createMailToLink(to, subject, body);
  const sendUrl = baseURL + "/send" + createURLParamString(to, subject, body);

  return (
    <div className="container">
      <Head>
        <title>Email Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h4>To:</h4>
        <input
          type="text"
          placeholder="Email Address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <h4>Subject:</h4>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <h4>Body:</h4>
        <textarea
          placeholder="Write your email here…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <a className="button" href={mailLink}>
          Compose Email
        </a>
        <input type="text" readOnly value={sendUrl} />

        <button className="button" onClick={() => getShortenedUrl(mailLink)}>
          Create Tiny Url
        </button>
      </main>

      <footer>
        currently only supports plain text •{" "}
        <a
          href="https://github.com/huntercaron/email-template"
          target="_blank"
          rel="noopener noreferrer"
        >
          github repo
        </a>
      </footer>

      <style jsx>{`
        .container {
          padding: 16px;
        }

        main {
          display: flex;
          flex-direction: column;
          max-width: 400px;
        }

        input,
        textarea {
          border: 1px solid #aaa;
          border-radius: 5px;
          font-size: 14px;
          padding: 0.5rem;
          margin-bottom: 16px;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
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
          border: 1px solid black;
        }

        footer {
          font-size: 12px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <GlobalStyle />
    </div>
  );
}
