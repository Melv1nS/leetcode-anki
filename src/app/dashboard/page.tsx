"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { BLIND75_CATEGORIES } from "@/app/data/blind75";
import type { Problem } from "@/app/types/problems";

function DifficultyBadge({
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

export default function Dashboard() {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCategories =
    selectedCategory === "all"
      ? BLIND75_CATEGORIES
      : BLIND75_CATEGORIES.filter((cat) => cat.name === selectedCategory);

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
          <SignOutButton>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Sign Out
            </button>
          </SignOutButton>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
          >
            All
          </button>
          {BLIND75_CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category.name
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Problem List */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
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
                        checked={problem.isCompleted}
                        onChange={() => {}}
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
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
    </div>
  );
}
