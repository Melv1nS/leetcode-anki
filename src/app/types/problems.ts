export interface Problem {
  id: string;
  title: string;
  url: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Category {
  name: string;
  problems: Problem[];
}

export interface UserProblem extends Problem {
  nextReviewDate: Date;
  reviewCount: number;
  lastConfidence: 1 | 2 | 3 | 4;
  userId: string;
}

export interface ReviewEntry {
  date: Date;
  confidence: 1 | 2 | 3 | 4;
}

export interface ProblemStats {
  lastCompleted: Date;
  nextReviewDate: Date;
  completionCount: number;
  lastConfidence: 1 | 2 | 3 | 4;
  reviewHistory: ReviewEntry[];
  skipReview?: boolean;
  scheduledFor?: Date;
  isAutoScheduled?: boolean;
}
