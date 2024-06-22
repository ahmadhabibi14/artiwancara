import type { RequestInterview, RequestAnswer } from "@/types/request.js";
import { Jobs } from '@/lib/jobs.js';

export function GENPROMPT_InterviewQuestions(req: RequestInterview): string {
  let jobName: string = '';

  for (const job of Jobs) {
    if (job.name === req.job_name) {
      jobName = job.label;
    }
  }

  const prompt: string = `
Buatkan saya beberapa pertanyaan wawancara tentang pekerjaan ${jobName || ''}.
Dengan ketentuan sebagai berikut:

Deskripsi pekerjaan:
${req.job_description}

Tanggung Jawab:
${req.job_responsibilities}

Persyaratan:
${req.job_requirements}

Buatlah jawaban dalam bahasa Indonesia, dan pisahkan tiap jawaban dengan tanda (-).
Langsung saja jawab dengan pertanyaan - pertanyaan yang dibutuhkan, dan maksimal 10 pertanyaan.
`
  return prompt;
}

export function GenerateGetAnswerPrompt(req: RequestAnswer): string {
  return '';
}