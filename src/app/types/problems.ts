export interface Problem {
  id: string;
  title: string;
  url: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isCompleted: boolean;
  category: string;
}

export interface Category {
  name: string;
  problems: Problem[];
}

export interface UserProblem extends Problem {
  nextReviewDate: Date;
  reviewCount: number;
  lastConfidence: 1 | 2 | 3 | 4;
  userId: string;
}
