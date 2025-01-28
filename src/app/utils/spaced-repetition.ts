export function getNextReviewDate(
  difficulty: "Easy" | "Medium" | "Hard",
  reviewCount: number,
  confidence: 1 | 2 | 3 | 4
): Date {
  const intervals = {
    Easy: [2, 4, 8, 15, 30],
    Medium: [3, 7, 14, 30, 60],
    Hard: [4, 10, 20, 40, 80],
  };

  const baseIntervals = intervals[difficulty];
  let nextInterval: number;

  if (confidence === 1) {
    nextInterval = baseIntervals[0];
  } else if (confidence === 2) {
    nextInterval = baseIntervals[Math.min(reviewCount, baseIntervals.length - 1)];
  } else if (confidence === 3) {
    nextInterval = baseIntervals[Math.min(reviewCount + 1, baseIntervals.length - 1)];
  } else {
    nextInterval = baseIntervals[Math.min(reviewCount + 2, baseIntervals.length - 1)];
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + nextInterval);
  return nextDate;
} 