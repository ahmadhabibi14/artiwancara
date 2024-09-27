import type { ResponseHTTP } from '@/types/response.ts';

export function ResponseJSONFunc<T extends ResponseHTTP>(d: T, statusCode: number): Response {
  return new Response(
    JSON.stringify(d),
    {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}