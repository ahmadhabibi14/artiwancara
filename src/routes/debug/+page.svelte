<script lang="ts">
  import axios from 'axios';
  let mediaRecorder: MediaRecorder;
  let audioChunks: Blob[] = [];
  let audioBlob: Blob;
  let audioUrl: string | null = null;
  let isRecording: boolean = false;

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      audioUrl = URL.createObjectURL(audioBlob);
      audioChunks = [];
    };

    isRecording = true;
  }

  function stopRecording() {
    mediaRecorder.stop();
    isRecording = false;
  }

  async function sendAudio() {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    await axios.post('/api/debug', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
</script>

<svelte:head>
  <title>Debug | Artiwancara</title>
</svelte:head>

<main class="bg-white min-h-[100dvh]">
  <div>
    <button class="py-2 px-5 bg-violet-500 text-white" on:click={startRecording} disabled={isRecording}>Start Recording</button>
    <button class="py-2 px-5 bg-violet-500 text-white" on:click={stopRecording} disabled={!isRecording}>Stop Recording</button>
    <button class="py-2 px-5 bg-violet-500 text-white" on:click={sendAudio} disabled={!audioBlob}>Send Audio</button> 
  </div>
</main>