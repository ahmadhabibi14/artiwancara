import { writable, type Writable } from 'svelte/store';

export enum InterviewState {
  Initial, Answer, Finished  
}
export const InterviewMode: Writable<InterviewState> = writable(InterviewState.Answer);

export const InterviewQuestions: Writable<string[]> = writable([]);

export const JobName: Writable<string> = writable('custom');

export const Grade: Writable<number> = writable(0);