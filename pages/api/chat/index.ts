import { v4 as uuid } from "uuid";
import { SessionsClient } from "@google-cloud/dialogflow";
import Path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;
  const sessionClient = new SessionsClient({
    keyFilename: Path.join("assets/medhub-410516-67f1f2732e15.json"), 
  });

  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.PROJECT_ID,
    uuid()
  );

  // The dialogflow request object
  const request = {
    session: sessionPath,
     queryInput: {
    text: {
      text: message,
      languageCode: "en-US", 
    },
  },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    res.status(200).json({ data: responses });
  } catch (e) {
    console.error(e);
    res.status(422).json({ error: e.message });
  }
}
