"use client";

import { useState } from "react";
import { DifficultyBadge } from "@/app/components/DifficultyBadge";
import { CONFIDENCE_LABELS } from "@/app/components/ConfidenceModal";
import { ReviewHistory } from "@/app/components/ReviewHistory";
import { BLIND75_CATEGORIES } from "@/app/data/blind75";
import { format, isSameDay, isSameMonth } from "date-fns";
import {
  ProblemStats,
  CalendarProblem as ICalendarProblem,
} from "@/app/types/problems";

interface CalendarProps {
  problemStats: Record<string, ProblemStats>;
  interviewDate?: Date;
}

// Remove duplicate interfaces since we're importing them
type CalendarProblem = ICalendarProblem;

export function Calendar({ problemStats, interviewDate }: CalendarProps) {
  const [selectedProblem, setSelectedProblem] =
    useState<CalendarProblem | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get days in month
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  // Get first day of month
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Create calendar days array
  const days = Array.from(
    { length: daysInMonth },
    (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _,
      index
    ) => {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        index + 1
      );
      date.setHours(0, 0, 0, 0);

      const problems = Object.entries(problemStats)
        .filter(
          ([
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _,
            stats,
          ]) => {
            if (!stats) return false;

            let reviewDate;
            if (stats.isAutoScheduled && stats.scheduledFor) {
              reviewDate = new Date(stats.scheduledFor);
            } else if (stats.nextReviewDate) {
              reviewDate = new Date(stats.nextReviewDate);
            } else {
              return false;
            }

            // Compare dates by converting to start of day timestamps
            const reviewDateString = reviewDate.toDateString();
            const currentDateString = date.toDateString();
            return reviewDateString === currentDateString;
          }
        )
        .map(([id, stats]) => {
          const problem = BLIND75_CATEGORIES.flatMap(
            (cat) => cat.problems
          ).find((p) => p.id === id);

          if (!problem) return null;

          return {
            ...problem,
            scheduledFor: stats.scheduledFor
              ? new Date(stats.scheduledFor)
              : undefined,
            nextReviewDate: stats.nextReviewDate
              ? new Date(stats.nextReviewDate)
              : undefined,
            lastCompleted: stats.lastCompleted
              ? new Date(stats.lastCompleted)
              : undefined,
            reviewHistory:
              stats.reviewHistory?.map((entry) => ({
                ...entry,
                date: new Date(entry.date),
              })) || [],
            lastConfidence: stats.lastConfidence,
          } as CalendarProblem;
        })
        .filter((problem): problem is CalendarProblem => problem !== null);

      return {
        date,
        problems,
      };
    }
  );

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Study Schedule
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold">
            {currentMonth.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            →
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {/* Week days header */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium bg-gray-50 dark:bg-gray-800"
          >
            {day}
          </div>
        ))}

        {/* Empty cells for first week */}
        {Array.from({ length: firstDayOfMonth }).map((unused, i) => (
          <div
            key={`empty-${i}`}
            className="p-2 bg-gray-50 dark:bg-gray-800 min-h-[120px]"
          />
        ))}

        {/* Calendar days */}
        {days.map(({ date, problems }) => {
          const isToday = isSameDay(date, new Date());

          // Compare dates using UTC to avoid timezone issues
          const isInterview =
            interviewDate &&
            date.getUTCDate() === interviewDate.getUTCDate() &&
            date.getUTCMonth() === interviewDate.getUTCMonth() &&
            date.getUTCFullYear() === interviewDate.getUTCFullYear();

          const isCurrentMonth = isSameMonth(date, currentMonth);
          const hasProblems = problems.length > 0;
          const isOverdue = date < new Date();

          return (
            <div
              key={date.toISOString()}
              className={`min-h-[120px] bg-white dark:bg-gray-800 p-2 relative ${
                !isCurrentMonth && "bg-gray-50 dark:bg-gray-900"
              }`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-sm ${
                    isToday
                      ? "bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {format(date, "d")}
                </span>
                {isInterview && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                    Interview
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mb-1">
                {hasProblems && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {problems.length}{" "}
                    {problems.length === 1 ? "problem" : "problems"}
                  </span>
                )}
              </div>
              {hasProblems && (
                <div className="space-y-1 max-h-[100px] overflow-y-auto">
                  {problems.map((problem) => (
                    <div
                      key={problem.id}
                      onClick={() => setSelectedProblem(problem)}
                      className={`text-xs p-1 rounded cursor-pointer ${
                        isOverdue
                          ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                          : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate">{problem.title}</span>
                        <DifficultyBadge difficulty={problem.difficulty} />
                      </div>
                      {problem.lastConfidence && (
                        <div className="text-xs mt-1 text-gray-500">
                          Last:{" "}
                          {CONFIDENCE_LABELS[problem.lastConfidence.toString()]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ReviewHistory
        history={
          selectedProblem?.reviewHistory?.map((entry) => ({
            ...entry,
            confidence: entry.confidence as 1 | 2 | 3 | 4,
          })) || []
        }
        isOpen={!!selectedProblem}
        onClose={() => setSelectedProblem(null)}
      />
    </div>
  );
}
