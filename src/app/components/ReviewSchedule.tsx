"use client";

import { DifficultyBadge } from "@/app/components/DifficultyBadge";
import type { UserProblem } from "@/app/types/problems";
import { CONFIDENCE_LABELS } from "@/app/components/ConfidenceModal";
import { useState } from "react";
import { ReviewHistory } from "@/app/components/ReviewHistory";

interface ReviewProblem extends Omit<UserProblem, "userId"> {
  nextReviewDate: Date;
  reviewCount: number;
  lastConfidence: 1 | 2 | 3 | 4;
  reviewHistory: { date: Date; confidence: 1 | 2 | 3 | 4 }[];
  skipReview?: boolean;
  isAutoScheduled: boolean;
  scheduledFor?: Date;
}

interface ReviewScheduleProps {
  problems: ReviewProblem[];
  onReviewComplete: (problemId: string, confidence: number) => void;
}

interface GroupedProblems {
  [key: string]: ReviewProblem[];
}

export function ReviewSchedule({
  problems,
  onReviewComplete,
}: ReviewScheduleProps) {
  const [selectedProblem, setSelectedProblem] = useState<ReviewProblem | null>(
    null
  );

  // Group problems by date
  const groupedProblems = problems.reduce(
    (groups: GroupedProblems, problem) => {
      const date = problem.isAutoScheduled
        ? problem.scheduledFor!.toLocaleDateString()
        : problem.nextReviewDate.toLocaleDateString();

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(problem);
      return groups;
    },
    {}
  );

  // Sort dates
  const sortedDates = Object.keys(groupedProblems).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Study Schedule
          </h2>
        </div>
        {problems.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No problems completed yet. Start solving problems to build your
              review schedule!
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid gap-6">
              {sortedDates.map((date) => {
                const dateObj = new Date(date);
                const isOverdue = dateObj < today;
                const isToday =
                  dateObj.toLocaleDateString() === today.toLocaleDateString();

                return (
                  <div key={date} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-medium ${
                          isOverdue
                            ? "text-red-600 dark:text-red-400"
                            : isToday
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {isToday
                          ? "Today"
                          : dateObj.toLocaleDateString(undefined, {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {groupedProblems[date].length} problems
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {groupedProblems[date].map((problem) => (
                        <div
                          key={problem.id}
                          className={`p-4 rounded-lg border ${
                            problem.skipReview
                              ? "border-gray-200 dark:border-gray-700 opacity-60"
                              : isOverdue
                              ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
                              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                          } cursor-pointer transition-colors`}
                          onClick={() => setSelectedProblem(problem)}
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between">
                              <a
                                href={problem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {problem.title}
                              </a>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onReviewComplete(
                                    problem.id,
                                    problem.lastConfidence
                                  );
                                }}
                                className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              >
                                Review
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <DifficultyBadge
                                difficulty={problem.difficulty}
                              />
                              {problem.lastConfidence && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Last:{" "}
                                  {
                                    CONFIDENCE_LABELS[
                                      problem.lastConfidence.toString()
                                    ]
                                  }
                                </span>
                              )}
                            </div>
                            {problem.reviewHistory?.length > 0 && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {problem.reviewHistory.length} reviews
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <ReviewHistory
        history={selectedProblem?.reviewHistory || []}
        isOpen={!!selectedProblem}
        onClose={() => setSelectedProblem(null)}
      />
    </>
  );
}
