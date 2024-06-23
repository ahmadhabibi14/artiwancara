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

Buatlah jawaban dalam bahasa Indonesia, dan maksimal 10 pertanyaan.
Tuliskan pertanyaan pertanyaanya dalam bentuk array javascript,
supaya saya bisa memanfaatkannya di pemrograman, langsung saja jawab seperti berikut:
[
  "pertanyaan 1",
  "pertanyaan 2
]

Tanpa berbasa basi, langsung jawab seperti cara diatas.
`
  return prompt;
}

export function GENPROMPT_InterviewAnswer(req: RequestAnswer): string {
  let jobName: string = '';

  for (const job of Jobs) {
    if (job.name === req.job_name) {
      jobName = job.label;
    }
  }

  const prompt: string = `
Buatkan saya jawaban pertanyaan wawancara tentang pekerjaan ${jobName || ''}, dari pertanyaan "${req.question}".
Dan buatkan feedback dari jawaban yang diberikan oleh user sebagai berikut: "${req.answer}".
Serta tuliskan berapa nilai atau bobot dari jawaban user tersebut, dari 1 sampai 10.

Buatlah jawaban dalam bahasa Indonesia. Tuliskan jawabannya dalam bentuk array javascript, dengan panjang 2 element
supaya saya bisa memanfaatkannya di pemrograman dengan ketentuan sebagai berikut:
Element pertama: jawaban anda dari pertanayaan tersebut.
Element kedua: nilai yang anda berikan berdasarkan jawaban dari user tersebut.

Langsung saja jawab seperti berikut:
[
  "Jawaban anda",
  "Nilai yang diberikan"
]

Tanpa berbasa basi, langsung jawab seperti cara diatas.
`

  return prompt;
}