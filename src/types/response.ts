export interface ResponseHTTP {
  success: boolean;
  errors: string;
}

export interface ResponseInterview extends ResponseHTTP {
  questions: string[];
}

export interface ResponseAnswer extends ResponseHTTP {
  user_answer: string;
  ai_answer: string;
  ai_feedback: string;
  grade: number;
}