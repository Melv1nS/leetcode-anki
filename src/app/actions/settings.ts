"use server";

import { db } from "@/app/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { BLIND75_CATEGORIES } from "@/app/data/blind75";
import { NEETCODE150_CATEGORIES } from "@/app/data/neetcode150";

// Replace any with proper type
interface InterviewSettings {
  interviewDate?: string;
  autoScheduleEnabled?: boolean;
  selectedList?: "blind75" | "neetcode150";
}

interface ProblemUpdate {
  scheduledFor: Timestamp;
  isAutoScheduled: boolean;
  difficulty: string;
  nextReviewDate: Timestamp;
  reviewHistory: ReviewHistoryEntry[];
  completionCount: number;
  category: string;
}

interface ReviewHistoryEntry {
  date: Timestamp;
  confidence: number;
}

// Remove unused FirestoreSettings interface
// interface FirestoreSettings { ... }

export async function setInterviewDate(
  userId: string,
  date: Date,
  selectedList: "blind75" | "neetcode150"
): Promise<boolean> {
  try {
    const settingsRef = db.collection("settings").doc(userId);

    // First update the settings
    await settingsRef.set(
      {
        interviewDate: Timestamp.fromDate(date),
        selectedList,
      },
      { merge: true }
    );

    // Then schedule the problems
    const scheduleSuccess = await scheduleProblems(userId, date, selectedList);
    if (!scheduleSuccess) {
      throw new Error("Failed to schedule problems");
    }

    return true;
  } catch (error) {
    console.error("Error setting interview date:", error);
    // Attempt to rollback settings update if scheduling failed
    try {
      const settingsRef = db.collection("settings").doc(userId);
      await settingsRef.delete();
    } catch (rollbackError) {
      console.error("Error rolling back settings:", rollbackError);
    }
    return false;
  }
}

async function scheduleProblems(
  userId: string,
  interviewDate: Date,
  listType: "blind75" | "neetcode150"
) {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data() || {};
    const completedProblems = new Set(userData.completedProblems || []);
    const problemStats = userData.problemStats || {};

    const categories =
      listType === "blind75" ? BLIND75_CATEGORIES : NEETCODE150_CATEGORIES;

    // Get all remaining problems organized by category
    const remainingProblemsByCategory = categories
      .map((category) => {
        const problems = category.problems.filter(
          (p) =>
            !completedProblems.has(p.id) && !problemStats[p.id]?.isAutoScheduled
        );

        // Sort problems by difficulty (Easy -> Medium -> Hard)
        return {
          name: category.name,
          problems: problems.sort((a, b) => {
            const difficultyScore = { Easy: 0, Medium: 1, Hard: 2 };
            return (
              difficultyScore[a.difficulty] - difficultyScore[b.difficulty]
            );
          }),
        };
      })
      .filter((category) => category.problems.length > 0);

    const totalProblems = remainingProblemsByCategory.reduce(
      (sum, category) => sum + category.problems.length,
      0
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysUntilInterview = Math.ceil(
      (interviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilInterview <= 0) {
      throw new Error("Interview date must be in the future");
    }

    // Calculate minimum and maximum problems per day
    const averageProblemsPerDay = totalProblems / daysUntilInterview;
    const minProblemsPerDay = Math.floor(averageProblemsPerDay);
    const extraProblems =
      totalProblems - minProblemsPerDay * daysUntilInterview;

    // Create array of dates and their target problem counts
    const dateTargets = Array.from({ length: daysUntilInterview }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      return {
        date,
        targetCount: minProblemsPerDay + (i < extraProblems ? 1 : 0),
        currentCount: 0,
      };
    });

    const updates: Record<string, ProblemUpdate> = {};

    // Distribute problems category by category
    remainingProblemsByCategory.forEach((category) => {
      category.problems.forEach((problem) => {
        // Find the earliest day that's below its target count
        const targetDay =
          dateTargets.find((dt) => dt.currentCount < dt.targetCount) ||
          dateTargets[0];
        targetDay.currentCount++;

        updates[`problemStats.${problem.id}`] = {
          scheduledFor: Timestamp.fromDate(targetDay.date),
          isAutoScheduled: true,
          difficulty: problem.difficulty,
          nextReviewDate: Timestamp.fromDate(targetDay.date),
          reviewHistory: [],
          completionCount: 0,
          category: category.name, // Add category for reference
        };
      });
    });

    if (Object.keys(updates).length > 0) {
      await userRef.update(updates);
    }

    return true;
  } catch (error) {
    console.error("Error scheduling problems:", error);
    return false;
  }
}

export async function getInterviewSettings(userId: string) {
  try {
    // Changed from users collection to settings collection
    const settingsDoc = await db.collection("settings").doc(userId).get();
    const settings = settingsDoc.data() || {};

    return {
      interviewDate: settings.interviewDate?.toDate(),
      selectedList: settings.selectedList,
    };
  } catch (error) {
    console.error("Error fetching interview settings:", error);
    return null;
  }
}

export async function updateInterviewSettings(
  userId: string,
  settings: InterviewSettings
): Promise<boolean> {
  try {
    const userRef = db.collection("users").doc(userId);
    await userRef.update({
      settings: settings,
    });
    return true;
  } catch (error) {
    console.error("Error updating interview settings:", error);
    return false;
  }
}
