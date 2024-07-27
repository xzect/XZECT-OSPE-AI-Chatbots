import { NextResponse } from "next/server";
import Replicate from "replicate";
import { MongoClient } from "mongodb";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;

const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("Connected to MongoDB");
    }
    return client.db("db");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
export async function GET(request) {
  try {
    console.log("Received request for fetching old chats");
    const db = await connectToDatabase();
    console.log("db connected");
    const result = await db.collection("fitness").find({}).toArray();
    if (result.length > 0) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}
const prompts = [
  "Hi there! How can I help you with your fitness goals today?",
  "Would you like to log a new workout or view your progress so far?",
  "What type of exercise did you do today? Please specify the activity and duration.",
  "Great job! Do you want to set a new fitness goal for this week?",
  "Would you like recommendations for workouts based on your fitness level and goals?",
  "How are you feeling after your recent workout? Any feedback or notes you'd like to add?",
  "Let's track your nutrition as well! What did you eat today?",
  "Would you like to see a summary of your weekly fitness progress?"
];

export async function POST(request) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        {
          detail:
            "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.",
        },
        { status: 500 }
      );
    }

    const { prompt, consent } = await request.json();
    console.log(
      "Received request with prompt:",
      prompt,
      "and consent:",
      consent
    );

    const options = {
      version:
        "f1d50bb24186c52daae319ca8366e53debdaa9e0ae7ff976e918df752732ccc4",
      input: { 
        prompt,
      }
    };
    if (WEBHOOK_HOST) {
      options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
      options.webhook_events_filter = ["start", "completed"];
    }
    const resp = await replicate.predictions.create(options);
    console.log("created prediction id");
    if (resp?.error) {
      return NextResponse.json({ detail: resp.error }, { status: 500 });
    }
    const id = resp.id;
    console.log(id);

    if (!id) {
      return NextResponse.json(
        { detail: "Prediction ID is required." },
        { status: 400 }
      );
    }

    let prediction = await replicate.predictions.get(id);

    console.log("fetched-resp");
    if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }
    if (consent === true) {
      const db = await connectToDatabase();
      console.log("db connected");
      const result = await db.collection("fitness").insertOne({
        id,
        prompt: prompt,
        response: prediction.output.join(""),
        timestamp: new Date(),
      });
      console.log("Chat interaction saved to database:", result);
    }

    console.log("Bot response:", prediction);

    return NextResponse.json(prediction, { status: 200 });
  } catch (error) {
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}

