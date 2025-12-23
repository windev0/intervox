// src/types/feedback.ts

export interface SkillFeedback {
  skill: string;
  level: "weak" | "average" | "strong";
  comment: string;
}

export interface InterviewScores {
  technical: number; // 0 - 100
  communication: number;
  clarity: number;
}

export interface InterviewFeedback {
  sessionId: string;
  globalSummary: string;
  strengths: string[];
  weaknesses: string[];
  skillFeedback: SkillFeedback[];
  scores: InterviewScores;
  recommendations: string[];
}
