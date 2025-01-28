"use client";

import { ReviewEntry } from "@/app/types/problems";
import { CONFIDENCE_LABELS } from "@/app/components/ConfidenceModal";

interface ReviewHistoryProps {
  history: ReviewEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewHistory({ history, isOpen, onClose }: ReviewHistoryProps) {
  if (!isOpen) return null;

  const sortedHistory = [...history].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Review History
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
          {sortedHistory.map((review, index) => (
            <div key={index} className="py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {review.date.toLocaleDateString()} at {review.date.toLocaleTimeString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {CONFIDENCE_LABELS[review.confidence.toString()]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 