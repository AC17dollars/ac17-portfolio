import { Message } from "../types";

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string,
): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        history,
        message: newMessage,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from backend");
    }

    const data = await response.json();
    return (
      data.text || "I'm pondering that... but I couldn't generate a response."
    );
  } catch (error) {
    console.error("Backend API Error:", error);
    return "I seem to be having trouble connecting to my neural network right now. Please try again later.";
  }
};
