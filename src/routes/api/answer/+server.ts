import type { ResponseHTTP } from '@/types/response.js';
import { json, type RequestHandler } from '@sveltejs/kit';
import { HttpStatusCode } from 'axios';
import { GENPROMPT_InterviewAnswer } from '@/lib/prompt.js';
import { GoogleGenerativeAI, type GenerativeModel, type GenerateContentResult } from '@google/generative-ai';
import { GOOGLE_GEMINI_API_KEY, ASSEMBLYAI_SPEECH_API_KEY } from '$env/static/private';
import { type RequestAnswer } from '@/types/request.js';
import { type ResponseAnswer } from '@/types/response.js';
import { ResponseJSONFunc } from '@/lib/http.js';
import { AssemblyAI, type TranscribeParams } from 'assemblyai';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const audioFile = formData.get('audio') as File;
  const jobName = formData.get('job_name') as string;
  const question = formData.get('question') as string;

  if (!audioFile) {
    return ResponseJSONFunc<ResponseHTTP>({
      success: false,
      errors: 'Tidak ada rekaman suara',
    }, HttpStatusCode.BadRequest);
  }

  if (!question || question === '') {
    return ResponseJSONFunc<ResponseHTTP>({
      success: false,
      errors: 'Tidak ada pertanyaan',
    }, HttpStatusCode.BadRequest);
  }

  let transcription: string = '';
  const client = new AssemblyAI({
    apiKey: ASSEMBLYAI_SPEECH_API_KEY+''
  })
  const transcribeParam: TranscribeParams = {
    audio: audioFile,
  }

  const transcribtion = await client.transcripts.transcribe(transcribeParam);
  transcription = transcribtion.text as string;

  if (!transcription) {
    return ResponseJSONFunc<ResponseHTTP>({
      success: false,
      errors: 'Gagal menerima rekaman suara, pastikan rekaman suara anda terdengar dengan jelas',
    }, HttpStatusCode.BadRequest);
  }

  console.log('TRANSCRIPTION 2', transcription)

  const data: RequestAnswer = {
    job_name: jobName,
    question: question,
    answer: transcription
  }

  const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
  const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'});

  const prompt: string = GENPROMPT_InterviewAnswer(data);
  const result: GenerateContentResult = await model.generateContent(prompt);
  const response = await result.response;
  const text: string = response.text();
  
  let answerAndGrade: string[]
  try {
    answerAndGrade = JSON.parse(text.replace(/^```javascript\n|\n``` \n$/g, ''));
  } catch (error) {
    return ResponseJSONFunc<ResponseHTTP>({
      success: false,
      errors: 'Gagal menerima jawaban dan feedback dari AI, pastikan suara anda terdengar dengan jelas',
    }, HttpStatusCode.BadRequest);
  }

  if (answerAndGrade.length !== 3) {
    return ResponseJSONFunc<ResponseHTTP>({
      success: false,
      errors: 'Gagal menerima jawaban dan feedback dari AI, coba lagi nanti',
    }, HttpStatusCode.InternalServerError);
  }

  const respJson: ResponseAnswer = {
    success: true,
    errors: '',
    user_answer: String(transcription)+'',
    ai_answer: String(answerAndGrade[0])+'',
    ai_feedback: String(answerAndGrade[1])+'',
    grade: Number(answerAndGrade[2]),
  }

  return json(respJson);
};