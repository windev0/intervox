// src/types/vapi.ts

export type SpeakerRole = "assistant" | "user";

export interface VoiceMessage {
  id: string;
  role: SpeakerRole;
  content: string;
  timestamp: string;
}

export interface VoiceSessionState {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  error?: string;
}
