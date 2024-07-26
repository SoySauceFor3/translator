import FormData from "form-data";

export const fetchSpeechToText = async (uri: string): Promise<string> => {
  const form = new FormData();
  const fileType = uri.split(".").pop();

  // Read the file from the given URI
  const file = {
    uri,
    type: `audio/${fileType}`,
    name: `recording.${fileType}`,
  };

  form.append("file", file);

  let response;
  try {
    response = await fetch("http://localhost:3000/transcription/upload", {
      method: "POST",
      body: form as any,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const result = await response.text();
  return result;
};
