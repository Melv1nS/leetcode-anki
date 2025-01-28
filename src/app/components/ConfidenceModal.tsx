"use client";

import { Dialog } from "@headlessui/react";

interface ConfidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (confidence: 1 | 2 | 3 | 4) => void;
}

export const CONFIDENCE_LABELS: Record<string, string> = {
  "1": "Need to review it again",
  "2": "It was hard",
  "3": "It was okay",
  "4": "It was easy",
};

export function ConfidenceModal({
  isOpen,
  onClose,
  onSelect,
}: ConfidenceModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white dark:bg-gray-800 p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            How hard was the problem?
          </Dialog.Title>
          <div className="space-y-2">
            {Object.entries(CONFIDENCE_LABELS)
              .reverse()
              .map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => onSelect(Number(value) as 1 | 2 | 3 | 4)}
                  className={`w-full p-3 text-left rounded-md transition-colors ${
                    Number(value) === 4
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                      : Number(value) === 3
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      : Number(value) === 2
                      ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                  }`}
                >
                  {label}
                </button>
              ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
