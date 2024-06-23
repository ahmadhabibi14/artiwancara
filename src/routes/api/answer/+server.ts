import type { ResponseHTTP } from '@/types/response.js';
import { json } from '@sveltejs/kit';
import { HttpStatusCode } from 'axios';
import { GENPROMPT_InterviewAnswer } from '@/lib/prompt.js';
import { SpeechClient } from '@google-cloud/speech';
import { GoogleGenerativeAI, type GenerativeModel, type GenerateContentResult } from '@google/generative-ai';
import { GOOGLE_GEMINI_API_KEY } from '$env/static/private';
import { type RequestAnswer } from '@/types/request.js';
import { type ResponseAnswer } from '@/types/response.js';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './google-credentials.json';

export const POST: import('@sveltejs/kit').RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const audioFile = formData.get('audio') as File;
  const jobName = formData.get('job_name') as string;
  const question = formData.get('question') as string;

  if (!audioFile) {
    const errorResp: ResponseHTTP = {
      success: false,
      errors: 'Tidak ada rekaman suara',
    }
    return new Response(
      JSON.stringify(errorResp),
      {
        status: HttpStatusCode.BadRequest,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  if (!question || question === '') {
    const errorResp: ResponseHTTP = {
      success: false,
      errors: 'Tidak ada pertanyaan',
    }
    return new Response(
      JSON.stringify(errorResp),
      {
        status: HttpStatusCode.BadRequest,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  console.log('Audio file:', new Uint8Array(await audioFile.arrayBuffer()));

  const speechClient = new SpeechClient();

  const reqSpeechToText: any = {
    audio: {
      content: new Uint8Array(await audioFile.arrayBuffer())
    },
    config: {
      encoding: 'WEBM_OPUS',
      sampleRateHertz: 48000,
      languageCode: 'id-ID',
    }
  }

  let transcription: string;
  try {
    const [operation] = await speechClient.longRunningRecognize(reqSpeechToText);
    const [response] = await operation.promise();
    // @ts-ignore
    transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
  } catch (error) {
    console.error(error);
    const errorResp: ResponseHTTP = {
      success: false,
      errors: 'Gagal membaca rekaman suara. Coba lagi nanti',
    }
    return new Response(
      JSON.stringify(errorResp),
      {
        status: HttpStatusCode.BadRequest,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

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
  
  const answerAndGrade: string[] = JSON.parse(text.replace(/^```javascript\n|\n``` \n$/g, ''));

  const respJson: ResponseAnswer = {
    success: true,
    errors: '',
    ai_answer: answerAndGrade[0],
    grade: Number(answerAndGrade[1]),
    user_answer: transcription
  }

  return json(respJson);
};