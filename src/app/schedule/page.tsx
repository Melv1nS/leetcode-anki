"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { getUserProgress } from "@/app/actions/problems";
import { getInterviewSettings } from "@/app/actions/settings";
import Link from "next/link";
import { Calendar } from "@/app/components/Calendar";
import type { ProblemStats } from "@/app/types/problems";

export default function SchedulePage() {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [problemStats, setProblemStats] = useState<
    Record<string, ProblemStats>
  >({});
  const [interviewDate, setInterviewDate] = useState<Date | undefined>();

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;

      try {
        const [progress, settings] = await Promise.all([
          getUserProgress(user.id),
          getInterviewSettings(user.id),
        ]);
        setProblemStats(progress.problemStats);

        if (settings?.interviewDate) {
          // Keep the date but set time to midnight
          const date = new Date(settings.interviewDate);
          // Use UTC methods to avoid timezone issues
          const utcDate = new Date(
            Date.UTC(
              date.getUTCFullYear(),
              date.getUTCMonth(),
              date.getUTCDate(),
              0,
              0,
              0,
              0
            )
          );
          setInterviewDate(utcDate);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoaded) {
      fetchData();
    }
  }, [isLoaded, user?.id]);

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please sign in to view your schedule.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Review Schedule
          </h1>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Back to Dashboard
          </Link>
        </div>

        <Calendar
          problemStats={Object.entries(problemStats).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: {
                ...value,
                reviewHistory: value.reviewHistory?.map((entry) => ({
                  ...entry,
                  date:
                    typeof entry.date === "string"
                      ? entry.date
                      : (entry.date as Date).toISOString(),
                })),
              },
            }),
            {} as Record<string, ProblemStats>
          )}
          interviewDate={interviewDate}
        />
      </div>
    </div>
  );
}
