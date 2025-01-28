"use client";

interface ProblemListSelectorProps {
  selectedList: "blind75" | "neetcode150";
  onListChange: (list: "blind75" | "neetcode150") => void;
}

export function ProblemListSelector({
  selectedList,
  onListChange,
}: ProblemListSelectorProps) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => onListChange("blind75")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedList === "blind75"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        Blind 75
      </button>
      <button
        onClick={() => onListChange("neetcode150")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedList === "neetcode150"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        Neetcode 150
      </button>
    </div>
  );
}
