import { promises as fs } from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

export const POST: import('@sveltejs/kit').RequestHandler = async ({ request }) => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return new Response(
        'No audio file ',
        {
          status: 400
        }
      );
    }

    const filePath = path.join(uploadDir, audioFile.name);
    await fs.writeFile(filePath, Buffer.from(await audioFile.arrayBuffer()));

    return new Response('Audio uploaded successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to upload audio', { status: 500 });
  }
};