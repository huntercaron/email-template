import Cors from "cors";
import initMiddleware from "../../utils/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  console.log(req.body.url);

  const url = req.body.url;

  const shortenRes = await fetch(
    `https://tinyurl.com/api-create.php?url=${url}`,
    {
      method: "POST",
    }
  );
  console.log(shortenRes);
  // const data = await shortenRes.json();

  if (shortenRes.status !== 200) {
    throw new Error(data.message);
  }
  console.log(data);
  return data;
}
