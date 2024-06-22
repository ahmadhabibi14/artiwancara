import { json } from '@sveltejs/kit';
import { SpeechClient } from '@google-cloud/speech';

export const POST: import('@sveltejs/kit').RequestHandler = ({ request }) => {
  const client = new SpeechClient();

  const resp: Object = {
    'num': 10000
  }
  
	return json(resp);
};