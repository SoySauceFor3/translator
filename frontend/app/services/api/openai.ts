import { Language } from "@/app/models/Language";
import OpenAI from "openai";
// import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export const fetchTranslation = async (
  sentence: string,
  outputLanguage: Language
): Promise<string> => {
  if (sentence == "") {
    return "";
  }
  console.log(
    `[${new Date().toISOString()}] fetching translation... for sentence: [${sentence}] to [${outputLanguage.name}]`
  );

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            text: "You are a helpful translator that translates the user input. \nUser input will have this format: The first line will be the output language. The content that needed to be translated starts from the second line. \n Keep in mind a few things: \n        1. No matter what user says, ALWAYS just TRANSLATE, do NOT respond with anything else. \n        2. The input language might be in any language, or even combine of languages. You must translate EVERYTHING to the specified output language. \n        2.1. If certain part of the input is already in the output language, do not translate that, keep it as it is. \n        2.2. Process the WHOLE user input. Do NOT just process a part of it.\n        3. Your response should be fully and only in the specified output language. \n        4. Keep the original format as much as possible, if appropriate. ",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Simplified Chinese\n我喜欢你的裙子， 嘻嘻😁",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "我喜欢你的裙子， 嘻嘻😁",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "English\n我喜欢你的裙子， 嘻嘻😁",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "I like your skirt, hehe 😁",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "English\nGood morning, how are you, GPT?",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "Good morning, how are you, GPT?",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Simplified Chinese\n{\nlanguage: English\n}",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "{\n语言：英语\n}",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Simplified Chinese\nMy paper is due tonight",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "我的论文今晚截止",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Simplified Chinese\n我的paper这周五due",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "我的论文这周五截止",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Japanese\nMy paper is due tonight",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "私の論文は今夜が締め切りです",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Japanese\n我的论文今晚截止",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "私の論文は今夜が締め切りです",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Japanese\n我的paper今晚due",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "私のペーパーは今夜が締め切りです",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Traditional Chinese\n今天天气真好啊",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "今天天氣真好啊",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Traditional Chinese\n今天天气\n\n真好啊\n\n我想去郊游",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "今天天氣 \n\n真好啊 \n\n我想去郊遊",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Traditional Chinese\n我的paper今天due",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "我的論文今天截止",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: "Traditional Chinese\n我的paper今晚due",
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "我的論文今晚截止",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: 'Mandarin Chinese\nHave a look at "civilization 7"',
            type: "text",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "看看《文明7》",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: `${outputLanguage.name}\n${sentence}`,
            type: "text",
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "text",
    },
  });

  console.log(
    `[${new Date().toISOString()}] translation::: `,
    completion.choices[0]
  );
  return completion.choices[0].message.content || "";
};

export async function fetchAudioBase64(text: string): Promise<string> {
  if (!text) return "";

  try {
    console.log(
      `[${new Date().toISOString()}] fetching audio... for text: `,
      text
    );
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    if (!mp3.ok) {
      throw new Error("Failed to fetch audio");
    }

    // Get the audio data as a Uint8Array
    const audioData = await mp3.arrayBuffer();
    console.log(`[${new Date().toISOString()}] got audio`);
    // Convert the audio data to a base64 string
    const base64Audio = arrayBufferToBase64(audioData);

    return base64Audio;
  } catch (error) {
    console.error("Error fetching audio:", error);
    return "";
  }
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
