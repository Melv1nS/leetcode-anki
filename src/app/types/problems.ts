export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  isCompleted: boolean;
  url: string;
}

export interface Category {
  name: string;
  problems: Problem[];
}
