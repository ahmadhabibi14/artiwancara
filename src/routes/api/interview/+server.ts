import { error, json } from '@sveltejs/kit';
import { type RequestInterview } from '@/types/request.js';
import type { ResponseHTTP, ResponseInterview } from '@/types/response.js';
import { HttpStatusCode } from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GENPROMPT_InterviewQuestions } from '@/lib/prompt.js';
import { GOOGLE_GEMINI_API_KEY } from '$env/static/private'

function isRequestInterview(data: any): data is RequestInterview {
  return (
    data.job_name !== undefined &&
    data.job_description !== undefined &&
    data.job_responsibilities !== undefined &&
    data.job_requirements !== undefined
  )
}

export const POST: import('@sveltejs/kit').RequestHandler = async ({ url, request }) => {
  const data = await request.json() as RequestInterview;
  if (!isRequestInterview(data)) {
    const errorResp: ResponseHTTP = {
      success: false,
      errors: 'invalid data',
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

  const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'});

  const prompt = GENPROMPT_InterviewQuestions(data);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  const resp: ResponseInterview = {
    success: true,
    errors: '',
    questions: (text.split('-')).filter((_, i) => i !== 0),
  }

	return json(resp);
};