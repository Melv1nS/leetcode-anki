export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  url: string;
}

export interface UserProblem extends Problem {
  lastAttempted?: Date;
  nextReview?: Date;
  confidenceLevel?: number;
  isCompleted: boolean;
}
