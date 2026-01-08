import React, { useState, useEffect } from "react";
import vapiInstance from "../config/vapi.config";
import type { JobOfferInput } from "../types/job";

interface VapiWidgetProps {
  jobOffer: JobOfferInput;
  onTranscriptUpdate?: (transcript: Array<{ role: string; text: string }>) => void;
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
  onEnd?: () => void;
}

const VapiWidget: React.FC<VapiWidgetProps> = ({
  apiKey,
  assistantId,
  config = {},
  onEnd,
}) => {
  const [vapi, setVapi] = useState<typeof vapiInstance | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<
    Array<{ role: string; text: string }>
  >([]);

  // Apply config changes
  useEffect(() => {
    console.log("config", config);

    return () => {
      null;
    };
  }, [config]);

  useEffect(() => {
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role,
            text: message.transcript,
          },
        ]);
      }
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  const startCall = () => {
    if (vapi) {
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
      if (onEnd) onEnd();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {!isConnected ? (
        <button
          onClick={startCall}
          style={{
            background: "#12A594",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            padding: "16px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(18, 165, 148, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 16px rgba(18, 165, 148, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(18, 165, 148, 0.3)";
          }}
        >
          🎤 Talk to Assistant
        </button>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            width: "400px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            border: "1px solid #e1e5e9",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              minHeight: "60px",
            }}
          >
            {isSpeaking ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  height: "60px",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "4px",
                      background: "#12A594",
                      borderRadius: "2px",
                      animation: `wave 0.6s ease-in-out ${i * 0.1}s infinite`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <span style={{ fontSize: "48px" }}>👤</span>
            )}
            <span
              style={{ fontWeight: "bold", color: "#333", marginTop: "12px" }}
            >
              {isSpeaking ? "Assistant Speaking..." : "Listening..."}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "12px",
            }}
          >
            <button
              onClick={endCall}
              style={{
                background: "#ff4444",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              End Call
            </button>
          </div>

          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              marginBottom: "12px",
              padding: "8px",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            {transcript.length === 0 && !isSpeaking ? (
              <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
                Conversation will appear here...
              </p>
            ) : (
              transcript.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    textAlign: msg.role === "user" ? "right" : "left",
                  }}
                >
                  <span
                    style={{
                      background: msg.role === "user" ? "#12A594" : "#e0e0e0",
                      color: msg.role === "user" ? "#fff" : "#333",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      display: "inline-block",
                      fontSize: "14px",
                      maxWidth: "85%",
                      wordWrap: "break-word",
                      animation: `typing 0.3s steps(40, end)`,
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes wave {
          0%, 100% { height: 20px; }
          50% { height: 50px; }
        }
        @keyframes typing {
          from {
            width: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default VapiWidget;

// Usage in your app:
// <VapiWidget
//   apiKey="your_public_api_key"
//   assistantId="your_assistant_id"
// />
