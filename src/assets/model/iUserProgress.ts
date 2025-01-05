export interface iUserProgress {
  courseID: number;
  userName: string;
  userId: number;
  completed: boolean;
  courseName: string;
  totalTime: number; // Decimal in C# is represented as number in TypeScript
  watchedTime: number;
  totalCourseTime: string ;
  totalWatchedTime: string ;
  totalProgress: string ;
  }
