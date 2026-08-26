export type Part = "markdown" | "ai" | "extension";
export type Lesson = {
  id: string;
  part: Part;
  order: number;
  title: string;
  eyebrow: string;
  description: string;
  takeaway?: string;
  example: string;
  prompt: string;
  initialValue: string;
  hints: string[];
  validationType: string;
  required?: string[];
  answer?: string;
};
export type Progress = {
  markdownLessonsCompleted: string[];
  aiLessonsCompleted: string[];
  lastLesson: string;
};
