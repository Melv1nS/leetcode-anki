"use client";

import { useState } from "react";
import { DifficultyBadge } from "@/app/components/DifficultyBadge";
import type { UserProblem } from "@/app/types/problems";
import { ConfidenceModal } from "@/app/components/ConfidenceModal";

interface DueProblemsProps {
  problems: UserProblem[];
  onReviewComplete: (
    problem: UserProblem,
    confidence: 1 | 2 | 3 | 4
  ) => Promise<void>;
}

export function DueProblems({ problems, onReviewComplete }: DueProblemsProps) {
  const [selectedProblem, setSelectedProblem] = useState<UserProblem | null>(
    null
  );
  const [showConfidence, setShowConfidence] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfidenceSelect = async (confidence: 1 | 2 | 3 | 4) => {
    if (!selectedProblem || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onReviewComplete(selectedProblem, confidence);
      setShowConfidence(false);
      setSelectedProblem(null);
    } catch (error) {
      console.error("Error completing review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (problems.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Due for Review
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          No problems are due for review. Great job staying on top of your
          studies!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Due for Review ({problems.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {problems.map((problem, index) => (
            <div
              key={`${problem.id || `problem-${index}`}-${
                problem.nextReviewDate?.toISOString() || Date.now()
              }`}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setSelectedProblem(problem);
                    setShowConfidence(true);
                  }}
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                >
                  Complete Review
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
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>
          ))}
        </div>
      </div>

      <ConfidenceModal
        isOpen={showConfidence}
        onClose={() => {
          if (!isSubmitting) {
            setShowConfidence(false);
            setSelectedProblem(null);
          }
        }}
        onSelect={handleConfidenceSelect}
      />
    </>
  );
}
