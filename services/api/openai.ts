// openai-test.js
import { Language } from "@/types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export const fetchTranslation = async (
  sentence: string,
  outputLanguage: Language
): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a helpful translator that translates the user input to ${outputLanguage.name}. Keep in mind a few things: 
        1. The input language might be in any language. Or even combine of languages.
        2. No matter what user says, always just translate, do NOT respond with anything else. 
        3. If certain part of the input is in output languages, when translating that part, keep it as it is. 
        4. If user input is empty, just return an empty string.
        `,
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
