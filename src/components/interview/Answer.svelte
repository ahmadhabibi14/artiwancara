<script lang="ts">
  import { fade } from 'svelte/transition';
  import { InterviewQuestions, InterviewMode, InterviewState, JobName, Grade } from '@/state/interview.js';
  import axios from 'axios';
  import toast, { Toaster } from 'svelte-french-toast';
  import { Icon } from 'svelte-icons-pack';
  import { RiMediaMicLine, RiArrowsArrowLeftLine, RiDesignSquareFill } from 'svelte-icons-pack/ri';
  import TypeWriter from 'svelte-typewriter';
  import { type ResponseAnswer } from '@/types/response.js';

  const qqq: string[] = [
    "Apa pengalaman Anda dalam bekerja dengan sistem kontrol versi seperti Git? Bagaimana Anda menggunakannya dalam tim pengembangan?",
  ];

  InterviewQuestions.set(qqq);

  if ($InterviewQuestions.length === 0) {
    InterviewMode.set(InterviewState.Initial);
  }

  let currentQuestion: string = $InterviewQuestions[0] || '';
  let currentQuestionNumber: number = 1;
  let totalAnsweredQuestion: number = 0;

  enum inputType { Voice, Text }
  let Input: inputType = inputType.Voice;

  let mediaRecorder: MediaRecorder;
  let audioChunks: Blob[] = [];
  let audioBlob: Blob;

  // Response from AI
  let JawabanUser: string = '';
  let JawabanAI: string = '';
  let FeedbackAI: string = '';

  let isRecording: boolean = false;
  let isFinishedRecording: boolean = false;
  let isAnsweredByAI: boolean = false;

  let timer: string = '0:00';
  let currentTime: number = 0;
  let totalDuration: number = 3 * 60; // 3 minutes in seconds
  let intervalId: NodeJS.Timeout;

  const toggleRecording = async () => {
    if (isRecording) {
      isRecording = false;
      isFinishedRecording = true;
      clearInterval(intervalId);

      mediaRecorder.stop();
      return;
    } else {
      isRecording = true;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
      mediaRecorder.onstop = () => {
        audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        audioChunks = [];
      };

      intervalId = setInterval(() => {
        if (currentTime < totalDuration) {
          currentTime++;
          timer = `${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`;
        } else {
          clearInterval(intervalId);
          isRecording = false;
          isFinishedRecording = true;
        }
      }, 1000);
    }
  }

  const resetRecording = () => {
    isRecording = false;
    isFinishedRecording = false;
    isAnsweredByAI = false;

    JawabanAI = '';
    FeedbackAI = '';
    JawabanUser = '';

    currentTime = 0;
    timer = '0:00';
  }

  const nextQuestion = () => {
    if (currentQuestionNumber < $InterviewQuestions.length) {
      currentQuestion = $InterviewQuestions[currentQuestionNumber];
      currentQuestionNumber += 1;
      resetRecording();
    } else {
      InterviewMode.set(InterviewState.Finished);
    }
  }

  let isSubmitted: boolean = false;
  const submitAnswer = async () => {
    isSubmitted = true;
    const formData: FormData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('question', currentQuestion);
    formData.append('job_name', $JobName);

    await axios.post('/api/answer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      const data: ResponseAnswer = res.data as ResponseAnswer;
      if (!data.success) {
        toast.error(data.errors);
      } else {
        isAnsweredByAI = true;
        JawabanAI = data.ai_answer;
        FeedbackAI = data.ai_feedback;
        JawabanUser = data.user_answer;
        $Grade += data.grade;
        totalAnsweredQuestion++
      }
      
    }).catch((err) => {
      console.log('Err', err);
      toast.error(err.response.data.errors);
    }).finally(() => {
      isSubmitted = false;
    });
  }
</script>

<Toaster />

<main transition:fade={{ delay: 250, duration: 300 }}>
  <div class="flex flex-col w-8/12 mx-auto justify-center gap-5">
    <div class="flex flex-row justify-between gap-6">
      <button class="text-sm flex flex-row gap-2 items-center py-1 px-3 border border-zinc-200 hover:border-zinc-400 rounded-full">
        <Icon
          className="fill-zinc-600"
          size="17"
          src={RiArrowsArrowLeftLine}
        />
        <span>Buat Pertanyaan</span>
      </button>
      <div class="cursor-default flex flex-row gap-2 text-sm py-1 px-3 border border-zinc-200 rounded-full">
        <span>Pertanyaan</span>
        <span><span class="text-violet-500 font-semibold">{currentQuestionNumber}</span> / <span class="text-violet-500 font-semibold">{$InterviewQuestions.length}</span></span>
      </div>
      <button
        on:click={() => InterviewMode.set(InterviewState.Finished)}
        disabled={totalAnsweredQuestion === 0}
        class="cursor-pointer flex flex-row gap-2 text-sm py-1 px-3 border border-red-400/10
        bg-red-400/10 hover:bg-red-400/20 text-red-500 rounded-full
          disabled:bg-zinc-100 disabled:border-zinc-200 disabled:text-zinc-700 disabled:cursor-not-allowed
        ">
        <span>Akhiri dan Tinjau</span>
      </button>
    </div>
    <div class="shadow-xl border border-zinc-300 rounded-lg overflow-hidden">
      <div class="flex flex-col gap-7 p-5 border-b border-zinc-300">
        <h3 class="text-xl text-center font-bold">{currentQuestion}</h3>
        {#if Input === inputType.Voice}
          <div class="relative flex flex-col gap-7 justify-center items-center">
            {#if !isAnsweredByAI}
              <span class="text-5xl font-semibold text-zinc-400/80">{timer} / 3:00</span>
              <button class="relative flex justify-center items-center" on:click={toggleRecording} disabled={isFinishedRecording}>
                <div class="p-4 bg-violet-500 hover:bg-violet-400 {isFinishedRecording ? 'bg-violet-400 cursor-not-allowed' : ''} rounded-full z-20">
                  <Icon
                    className="fill-white"
                    size="22"
                    src={isRecording ? RiDesignSquareFill : RiMediaMicLine}
                  />
                </div>
                {#if isRecording}
                  <div class="mic-on"></div>
                {/if}
              </button>
            {/if}
            {#if isSubmitted}
              <div class="w-full h-full bg-white absolute top-0 z-30" transition:fade={{ delay: 250, duration: 300 }}>
                <animation class="dots-container">
                  <dot class="dot"></dot>
                  <dot class="dot"></dot>
                  <dot class="dot"></dot>
                  <dot class="dot"></dot>
                  <dot class="dot"></dot>
                </animation>  
              </div>
            {/if}
            {#if isFinishedRecording}
              {#if !isAnsweredByAI}
                <div class="flex flex-row justify-center gap-3 items-center">
                  <button
                    on:click={submitAnswer}
                    class="py-2 px-4 rounded-full bg-violet-500 hover:bg-violet-400 text-white"
                  >Sumit untuk Feedback</button>
                  <button
                    on:click={resetRecording}
                    class="py-2 px-4 rounded-full bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-600"
                  >Ulangi</button>
                </div>
              {/if}
              {#if isAnsweredByAI}
                {#if JawabanUser !== ''}
                  <TypeWriter cursor={false}>
                    <p class="text-zinc-500 text-center">{JawabanUser}</p>
                  </TypeWriter>
                {/if}
                <button
                  on:click={nextQuestion}
                  class="py-2 px-4 rounded-full bg-violet-500 hover:bg-violet-400 text-white"
                >
                  {currentQuestionNumber < $InterviewQuestions.length ? 'Petanyaan Selanjutnya' : 'Selesai'}
                </button>
              {/if}
            {/if}
          </div>
        {/if}
      </div>
      <div class="bg-zinc-100 py-4 px-4 text-zinc-600 flex flex-col gap-2 border border-b-zinc-300">
        <p class="text-sm text-zinc-700 font-semibold">Feedback :</p>
        {#if FeedbackAI !== ''}
          <TypeWriter cursor={false}>
            <p>{FeedbackAI}</p>
          </TypeWriter>
        {/if}
      </div>
      <div class="bg-zinc-100 py-4 px-4 text-zinc-600 flex flex-col gap-2">
        <p class="text-sm text-zinc-700 font-semibold">Jawaban dari AI :</p>
        {#if JawabanAI !== ''}
          <TypeWriter cursor={false}>
            <p>{JawabanAI}</p>
          </TypeWriter>
        {/if}
      </div>
    </div>
  </div>
</main>

<style lang="postcss">
  .mic-on {
    @apply absolute bg-violet-100 z-10 rounded-full;
    width: 65px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: resizeAnimation 1s infinite;
  }

  @keyframes resizeAnimation {
    0% {
      width: 65px;
      height: 65px;
    }
    50% {
      width: 80px;
      height: 80px;
    }
    100% {
      width: 65px;
      height: 65px;
    }
  }

  .dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .dot {
    height: 20px;
    width: 20px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #b3d4fc;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .dot:last-child {
    margin-right: 0;
  }

  .dot:nth-child(1) {
    animation-delay: -0.3s;
  }

  .dot:nth-child(2) {
    animation-delay: -0.1s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.1s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: #c4b5fd;
      box-shadow: 0 0 0 0 rgba(196, 181, 253, 0.7);
    }

    50% {
      transform: scale(1.2);
      background-color: #8B5CF6;
      box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
    }

    100% {
      transform: scale(0.8);
      background-color: #c4b5fd;
      box-shadow: 0 0 0 0 rgba(196, 181, 253, 0.7);
    }
  }
</style>