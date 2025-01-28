import { Timestamp } from "firebase-admin/firestore";

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

export interface ReviewHistoryEntry {
  date: string | Date;
  confidence: 1 | 2 | 3 | 4;
}

export interface FirestoreStats {
  lastCompleted?: Timestamp;
  nextReviewDate?: Timestamp;
  scheduledFor?: Timestamp;
  reviewHistory?: Array<{
    date: Timestamp;
    confidence: 1 | 2 | 3 | 4;
  }>;
  lastConfidence?: 1 | 2 | 3 | 4;
}

export interface ProblemStats {
  lastReviewed?: string;
  nextReview?: string;
  confidence?: number;
  isAutoScheduled?: boolean;
  scheduledFor?: string;
  nextReviewDate?: string;
  lastCompleted?: string;
  reviewHistory?: Array<{
    date: string;
    confidence: 1 | 2 | 3 | 4;
  }>;
  lastConfidence?: 1 | 2 | 3 | 4;
  completionCount?: number;
  reviewCount?: number;
  skipReview?: boolean;
}

export interface CalendarProblem {
  id: string;
  title: string;
  url: string;
  difficulty: "Easy" | "Medium" | "Hard";
  confidence?: number;
  lastConfidence?: 1 | 2 | 3 | 4;
  reviewHistory?: Array<{
    date: Date;
    confidence: 1 | 2 | 3 | 4;
  }>;
  scheduledFor?: Date;
  nextReviewDate?: Date;
  lastCompleted?: Date;
}
