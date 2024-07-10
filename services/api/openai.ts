// openai-test.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export const fetchTranslation = async (sentence: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful translator that translates English to Chinese. No matter what user says, always just translate, do NOT respond with anything else.",
      },
      {
        role: "user",
        content: sentence,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content || "";
};
