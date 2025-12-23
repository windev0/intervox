import type { InterviewFeedback } from "./feedback";
import type { InterviewSession } from "./interview";
import type { AnalyzedJobOffer } from "./job";

export interface AppState {
  jobOffer?: AnalyzedJobOffer;
  interviewSession?: InterviewSession;
  feedback?: InterviewFeedback;
}
