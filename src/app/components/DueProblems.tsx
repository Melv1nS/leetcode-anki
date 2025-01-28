"use client";

import { useState } from "react";
import { DifficultyBadge } from "@/app/components/DifficultyBadge";
import type { UserProblem } from "@/app/types/problems";

interface DueProblem extends UserProblem {
  nextReviewDate: Date;
  reviewCount: number;
  lastConfidence: 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy
}

const CONFIDENCE_LABELS = {
  "1": "Again",
  "2": "Hard",
  "3": "Good",
  "4": "Easy",
} as const;

function getNextReviewDate(
  difficulty: UserProblem["difficulty"],
  reviewCount: number,
  confidence: 1 | 2 | 3 | 4
): Date {
  const intervals = {
    Easy: [2, 4, 8, 15, 30],
    Medium: [3, 7, 14, 30, 60],
    Hard: [4, 10, 20, 40, 80],
  };

  // If confidence is 1 (Again), reset to first interval
  // If confidence is 2 (Hard), stay at current interval
  // If confidence is 3 (Good), move to next interval
  // If confidence is 4 (Easy), skip next interval

  const baseIntervals = intervals[difficulty];
  let nextInterval: number;

  if (confidence === 1) {
    nextInterval = baseIntervals[0];
  } else if (confidence === 2) {
    nextInterval =
      baseIntervals[Math.min(reviewCount, baseIntervals.length - 1)];
  } else if (confidence === 3) {
    nextInterval =
      baseIntervals[Math.min(reviewCount + 1, baseIntervals.length - 1)];
  } else {
    nextInterval =
      baseIntervals[Math.min(reviewCount + 2, baseIntervals.length - 1)];
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + nextInterval);
  return nextDate;
}

export function DueProblems({ problems }: { problems: UserProblem[] }) {
  const [selectedProblem, setSelectedProblem] = useState<DueProblem | null>(
    null
  );
  const [showConfidence, setShowConfidence] = useState(false);

  const handleProblemComplete = (problem: DueProblem) => {
    setSelectedProblem(problem);
    setShowConfidence(true);
  };

  const handleConfidenceSelect = async (confidence: 1 | 2 | 3 | 4) => {
    if (!selectedProblem) return;

    const nextReviewDate = getNextReviewDate(
      selectedProblem.difficulty,
      selectedProblem.reviewCount,
      confidence
    );

    // TODO: Update problem in Firebase
    console.log("Updating problem:", {
      ...selectedProblem,
      nextReviewDate,
      reviewCount: selectedProblem.reviewCount + 1,
      lastConfidence: confidence,
    });

    setShowConfidence(false);
    setSelectedProblem(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Due for Review
        </h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleProblemComplete(problem as DueProblem)}
                className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Complete
              </button>
              <a
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {problem.title}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Next review: {problem.nextReviewDate.toLocaleDateString()}
              </span>
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>
          </div>
        ))}
      </div>

      {/* Confidence Selection Modal */}
      {showConfidence && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              How well did you solve it?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(CONFIDENCE_LABELS) as [string, string][]).map(
                ([value, label]) => (
                  <button
                    key={value}
                    onClick={() =>
                      handleConfidenceSelect(parseInt(value) as 1 | 2 | 3 | 4)
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
