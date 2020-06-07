import Cors from "cors";
import initMiddleware from "../../utils/init-middleware";
import TinyURL from "tinyurl";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    methods: ["POST"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  const reqData = await JSON.parse(req.body);
  const url = reqData.url;

  // Request to TinyUrl to shorten URL
  const shortenedUrl = await TinyURL.shorten(url);

  if (shortenedUrl == "Error") {
    res.status(500).json({ message: "Error creating TinyUrl" });
  }

  // send URL if shortened successfully
  res.status(200).json({ url: shortenedUrl });
}
