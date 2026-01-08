import Vapi from "@vapi-ai/web";

const vapiInstance = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

// Listen for events
vapiInstance.on("call-start", () => console.log("Call started"));
vapiInstance.on("call-end", () => console.log("Call ended"));
vapiInstance.on(
  "message",
  (message: { type: string; role: any; transcript: any }) => {
    if (message.type === "transcript") {
      console.log(`${message.role}: ${message.transcript}`);
    }
  }
);
vapiInstance.on("error", (error: string) => console.error("Error:", error));

export default vapiInstance;
const apiKey = import.meta.env.VITE_VAPI_PUBLIC_KEY || "";
const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || "";
export { apiKey, assistantId };
