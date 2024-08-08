import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import Configuration, {OpenAI } from "openai";



export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;

    // Add validation check
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    const config = new Configuration({
      apiKey: process.env.OPEN_AI_SECRET,
      organization: process.env.OPENAI_ORGANIZATION_ID,
    });

    const openai = new OpenAI({ apiKey: config.apiKey });

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      ...user.chats.map(({ role, content }) => ({ role, content })),
      { role: "user", content: message },
    ];

   // console.log("Constructed messages:", messages);

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    };

   // console.log("OpenAI API Request Params:", params);

    const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);

   // console.log("OpenAI API Response:", chatCompletion);

    if (chatCompletion.choices && chatCompletion.choices.length > 0) {
      const assistantMessage = {
        role: "assistant",
        content: chatCompletion.choices[0].message.content,
      };

      const userMessage = {
        role: "user",
        content: message,
      };

      user.chats.push(userMessage, assistantMessage); // Save both user and assistant messages
      console.log("User chats after adding messages:", user.chats);
      await user.save();

      return res.status(200).json({ chats: user.chats });
    } else {
      console.log("OpenAI response is invalid");
      return res.status(500).json({ message: "OpenAI response is invalid" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  
  export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log('deleteChats function called'); 
  
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
