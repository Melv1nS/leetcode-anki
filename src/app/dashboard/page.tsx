"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { BLIND75_CATEGORIES } from "@/app/data/blind75";
import { NEETCODE150_CATEGORIES } from "@/app/data/neetcode150";
import type { UserProblem, ProblemStats } from "@/app/types/problems";
import { DueProblems } from "@/app/components/DueProblems";
import { DifficultyBadge } from "@/app/components/DifficultyBadge";
import {
  toggleProblemStatus,
  getUserProgress,
  clearUserProgress,
} from "@/app/actions/problems";
import { toast } from "react-hot-toast";
import { ConfidenceModal } from "@/app/components/ConfidenceModal";
import { getNextReviewDate } from "@/app/utils/spaced-repetition";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";
import { InterviewSettings } from "@/app/components/InterviewSettings";
import Link from "next/link";
import { ProblemListSelector } from "@/app/components/ProblemListSelector";
import { setInterviewDate } from "@/app/actions/settings";
import type { Problem } from "@/app/types/problems";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [selectedList, setSelectedList] = useState<"blind75" | "neetcode150">(
    "blind75"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(
    new Set()
  );
  const [problemStats, setProblemStats] = useState<
    Record<string, ProblemStats>
  >({});
  const [selectedProblem, setSelectedProblem] = useState<UserProblem | null>(
    null
  );
  const [showConfidence, setShowConfidence] = useState(false);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const fetchUserProgress = async () => {
    if (!user?.id) return;

    try {
      const progress = await getUserProgress(user.id);
      const validCompletedProblems = (progress.completedProblems || []).filter(
        (id) => progress.problemStats[id]
      );
      setCompletedProblems(new Set(validCompletedProblems));
      setProblemStats(progress.problemStats || {});
    } catch (error) {
      console.error("Error fetching progress:", error);
      toast.error("Failed to load your progress");
      // Set default values on error
      setCompletedProblems(new Set());
      setProblemStats({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchUserProgress();
    }
  }, [isLoaded, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProblemToggle = async (
    problem: Problem & Partial<ProblemStats>
  ) => {
    if (!user?.id) return;

    const userProblem: UserProblem = {
      ...problem,
      userId: user.id,
      nextReviewDate: new Date(),
      reviewCount: 0,
      lastConfidence: problem.lastConfidence || 1,
    };

    if (!completedProblems.has(problem.id)) {
      setSelectedProblem(userProblem);
      setShowConfidence(true);
    } else {
      await handleConfidenceSelect(userProblem, null);
    }
  };

  const handleConfidenceSelect = async (
    problem: UserProblem,
    confidence: 1 | 2 | 3 | 4 | null
  ) => {
    if (!user?.id) return;

    const isCompleting = confidence !== null;
    const newCompletedProblems = new Set(completedProblems);
    const newProblemStats = { ...problemStats };

    if (isCompleting) {
      newCompletedProblems.add(problem.id);
      const now = new Date();
      const nextReviewDate = getNextReviewDate(
        problem.difficulty,
        0,
        confidence
      );

      const existingStats = problemStats[problem.id];
      newProblemStats[problem.id] = {
        ...existingStats,
        lastCompleted: now.toISOString(),
        nextReviewDate: nextReviewDate.toISOString(),
        completionCount: (existingStats?.completionCount || 0) + 1,
        lastConfidence: confidence,
        reviewHistory: [
          ...(existingStats?.reviewHistory || []),
          {
            date: now.toISOString(),
            confidence,
          },
        ],
      };
    } else {
      newCompletedProblems.delete(problem.id);
      delete newProblemStats[problem.id];
    }

    // Optimistically update UI
    setCompletedProblems(newCompletedProblems);
    setProblemStats(newProblemStats);

    try {
      const success = await toggleProblemStatus(
        user.id,
        problem.id,
        isCompleting,
        confidence || undefined,
        problem.difficulty
      );
      if (!success) throw new Error("Failed to update problem status");

      toast.success(
        isCompleting
          ? "Problem marked as completed!"
          : "Problem marked as incomplete"
      );
    } catch (err) {
      console.error("Failed to update problem status:", err);
      // Revert on error
      if (isCompleting) {
        newCompletedProblems.delete(problem.id);
        delete newProblemStats[problem.id];
      } else {
        newCompletedProblems.add(problem.id);
        newProblemStats[problem.id] = problemStats[problem.id];
      }
      setCompletedProblems(newCompletedProblems);
      setProblemStats(newProblemStats);
      toast.error("Failed to update problem status");
    }

    setShowConfidence(false);
    setSelectedProblem(null);
  };

  const handleClearProgress = async () => {
    if (!user?.id) return;

    try {
      const success = await clearUserProgress(user.id);
      if (!success) throw new Error("Failed to clear progress");

      setCompletedProblems(new Set());
      setProblemStats({});
      toast.success("Progress cleared successfully");
    } catch (err) {
      console.error("Failed to clear progress:", err);
      toast.error("Failed to clear progress");
    }
  };

  const handleReviewComplete = async (
    problem: UserProblem,
    confidence: 1 | 2 | 3 | 4
  ) => {
    if (!user?.id) return;

    const now = new Date();
    const nextReviewDate = getNextReviewDate(
      problem.difficulty,
      problem.reviewCount + 1,
      confidence
    );

    const newProblemStats = { ...problemStats };
    const existingStats = problemStats[problem.id];

    newProblemStats[problem.id] = {
      ...existingStats,
      lastCompleted: now.toISOString(),
      nextReviewDate: nextReviewDate.toISOString(),
      reviewCount: (existingStats.reviewCount || 0) + 1,
      lastConfidence: confidence,
      reviewHistory: [
        ...(existingStats.reviewHistory || []),
        {
          date: now.toISOString(),
          confidence,
        },
      ],
    };

    setProblemStats(newProblemStats);

    try {
      const success = await toggleProblemStatus(
        user.id,
        problem.id,
        true,
        confidence,
        problem.difficulty
      );
      if (!success) throw new Error("Failed to update review status");

      await fetchUserProgress();
      toast.success("Review completed!");
    } catch (err) {
      console.error("Failed to update review status:", err);
      setProblemStats(problemStats);
      toast.error("Failed to update review status");
    }
  };

  const handleSetInterviewDate = async (date: Date) => {
    if (!user?.id) return;

    try {
      const success = await setInterviewDate(user.id, date, selectedList);
      if (!success) throw new Error("Failed to set interview date");

      await fetchUserProgress();
      toast.success("Interview date set successfully!");
    } catch (err) {
      console.error("Error setting interview date:", err);
      toast.error("Failed to set interview date");
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const currentProblemList =
    selectedList === "blind75" ? BLIND75_CATEGORIES : NEETCODE150_CATEGORIES;

  // Calculate due problems
  const dueProblems = Object.entries(problemStats)
    .filter(([, stats]) => {
      if (!stats || !stats.nextReviewDate) return false;
      const isNotSkipped = !stats.skipReview;
      const isDue = new Date() >= new Date(stats.nextReviewDate);
      return isNotSkipped && isDue;
    })
    .map(([id, stats]) => {
      const problem = currentProblemList
        .flatMap((cat) => cat.problems)
        .find((p) => p.id === id);

      if (!problem) return null;

      return {
        ...problem,
        ...stats,
        nextReviewDate: stats.nextReviewDate
          ? new Date(stats.nextReviewDate)
          : new Date(),
      };
    })
    .filter((problem): problem is UserProblem => problem !== null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Sign Out */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.firstName || "Coder"}!
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track your progress and keep practicing
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/schedule"
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white dark:bg-gray-800 dark:text-indigo-400 rounded-md border border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              View Schedule
            </Link>
            <InterviewSettings onSetDate={handleSetInterviewDate} />
            <button
              onClick={() => setShowClearConfirmation(true)}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-white dark:bg-gray-800 dark:text-red-400 rounded-md border border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear History
            </button>
            <SignOutButton>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>

        <ProblemListSelector
          selectedList={selectedList}
          onListChange={setSelectedList}
        />

        {/* Due Problems Section */}
        <div className="mb-6">
          <DueProblems
            problems={dueProblems}
            onReviewComplete={handleReviewComplete}
          />
        </div>

        {/* Problem List */}
        <div className="space-y-6">
          {currentProblemList.map((category) => (
            <div
              key={category.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {category.problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={completedProblems.has(problem.id)}
                        onChange={() => handleProblemToggle(problem)}
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                      />
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {problem.title}
                      </a>
                    </div>
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfidenceModal
        isOpen={showConfidence}
        onClose={() => setShowConfidence(false)}
        onSelect={(confidence) =>
          selectedProblem && handleConfidenceSelect(selectedProblem, confidence)
        }
      />

      <ConfirmationModal
        isOpen={showClearConfirmation}
        onClose={() => setShowClearConfirmation(false)}
        onConfirm={handleClearProgress}
        title="Clear Progress"
        message="Are you sure you want to clear all your progress? This will remove all completed problems and their review history. This action cannot be undone."
        confirmText="Clear All Progress"
        cancelText="Cancel"
      />
    </div>
  );
}
