"use client";

import type { Problem } from "@/app/types/problems";

export function DifficultyBadge({
  difficulty,
}: {
  difficulty: Problem["difficulty"];
}) {
  const colors = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
