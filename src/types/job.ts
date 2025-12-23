// src/types/job.ts

export type JobLevel = "intern" | "junior" | "mid" | "senior";

export interface JobOfferInput {
  rawText: string;
  detectedStack: string[];
  level: JobLevel;
}

export interface JobSkill {
  name: string; // ex: React, TypeScript
  category: "frontend" | "backend" | "tooling" | "soft";
}

export interface AnalyzedJobOffer {
  id: string;
  title: string;
  company?: string;
  level: JobLevel;
  skills: JobSkill[];
  detectedStack: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
