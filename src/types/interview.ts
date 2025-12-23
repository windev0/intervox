// src/types/interview.ts

export type InterviewStatus = "idle" | "in_progress" | "completed";

export type InterviewMode = "technical" | "behavioral";

export interface InterviewQuestion {
  id: string;
  question: string;
  topic: string; // ex: Hooks, Performance
  difficulty: 1 | 2 | 3;
}

export interface InterviewSession {
  id: string;
  jobOfferId: string;
  mode: InterviewMode;
  status: InterviewStatus;
  questions: InterviewQuestion[];
  startedAt?: string;
  endedAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
