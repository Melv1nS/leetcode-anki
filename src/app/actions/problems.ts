"use server";

import { db } from "@/app/lib/firebase-admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getNextReviewDate } from "@/app/utils/spaced-repetition";
import { FirestoreStats, ProblemStats } from "@/app/types/problems";

// Remove unused interface
// interface ProblemProgress {
//   problemStats: Record<string, ProblemStats>;
//   // Add other fields as needed
// }

export async function getUserProgress(userId: string): Promise<{
  problemStats: Record<string, ProblemStats>;
  completedProblems: string[];
}> {
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    const data = userDoc.data() || {};
    const problemStats = data.problemStats || {};
    const completedProblems = data.completedProblems || [];

    // Convert Firestore Timestamps to JavaScript Dates
    const formattedStats: Record<string, ProblemStats> = {};
    Object.entries(problemStats).forEach(
      ([problemId, stats]: [string, unknown]) => {
        const firestoreStats = stats as FirestoreStats;
        formattedStats[problemId] = {
          lastCompleted:
            firestoreStats.lastCompleted?.toDate().toISOString() ||
            new Date().toISOString(),
          nextReviewDate:
            firestoreStats.nextReviewDate?.toDate().toISOString() ||
            new Date().toISOString(),
          scheduledFor:
            firestoreStats.scheduledFor?.toDate().toISOString() ||
            new Date().toISOString(),
          reviewHistory: firestoreStats.reviewHistory?.map((entry) => ({
            date: entry.date.toDate().toISOString(),
            confidence: entry.confidence,
          })),
          lastConfidence: firestoreStats.lastConfidence,
        };
      }
    );

    return {
      problemStats: formattedStats,
      completedProblems,
    };
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return {
      problemStats: {},
      completedProblems: [],
    };
  }
}

export async function getCompletedProblems(userId: string): Promise<string[]> {
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    const data = userDoc.data();
    return data?.completedProblems || [];
  } catch (error) {
    console.error("Error fetching completed problems:", error);
    return [];
  }
}

export async function toggleProblemStatus(
  userId: string,
  problemId: string,
  isCompleting: boolean,
  confidence?: 1 | 2 | 3 | 4,
  difficulty?: "Easy" | "Medium" | "Hard"
): Promise<boolean> {
  try {
    const userRef = db.collection("users").doc(userId);

    if (isCompleting && confidence && difficulty) {
      const nextReviewDate = getNextReviewDate(difficulty, 0, confidence);
      const now = Timestamp.now();

      await userRef.update({
        completedProblems: FieldValue.arrayUnion(problemId),
        [`problemStats.${problemId}`]: {
          lastCompleted: now,
          nextReviewDate: Timestamp.fromDate(nextReviewDate),
          completionCount: FieldValue.increment(1),
          lastConfidence: confidence,
          reviewHistory: FieldValue.arrayUnion({
            date: now,
            confidence,
          }),
        },
      });
    } else {
      await userRef.update({
        completedProblems: FieldValue.arrayRemove(problemId),
        [`problemStats.${problemId}`]: FieldValue.delete(),
        [`settings.scheduledProblems.${problemId}`]: FieldValue.delete(),
      });
    }

    return true;
  } catch (error) {
    console.error("Error updating problem status:", error);
    return false;
  }
}

export async function toggleSkipReview(
  userId: string,
  problemId: string,
  skipReview: boolean
): Promise<boolean> {
  try {
    const userRef = db.collection("users").doc(userId);

    await userRef.update({
      [`problemStats.${problemId}.skipReview`]: skipReview,
    });

    return true;
  } catch (error) {
    console.error("Error updating skip review status:", error);
    return false;
  }
}

export async function clearUserProgress(userId: string): Promise<boolean> {
  try {
    const userRef = db.collection("users").doc(userId);

    await userRef.update({
      completedProblems: [],
      problemStats: {},
    });

    return true;
  } catch (error) {
    console.error("Error clearing user progress:", error);
    return false;
  }
}
