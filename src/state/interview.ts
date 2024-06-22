import { writable, type Writable } from 'svelte/store';

export enum InterviewState {
  Initial, Answer, Finished  
}
export const InterviewMode: Writable<InterviewState> = writable(InterviewState.Initial);

export const InterviewQuestions: Writable<string[]> = writable([]);