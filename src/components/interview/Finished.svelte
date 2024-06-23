<script lang="ts">
  import { fade } from 'svelte/transition';
  import { InterviewMode, InterviewState, Grade } from '@/state/interview.js';
</script>

<main transition:fade={{ delay: 250, duration: 300 }}>
  <div class="flex flex-col justify-center items-center w-full gap-4">
    <h1 class="text-3xl font-bold">Wawancara selesai</h1>
    <p class="text-lg">Nilai anda: {$Grade}</p>
    <button
      on:click={() => InterviewMode.set(InterviewState.Initial)}
      class="py-2 px-5 bg-violet-500 hover:bg-violet-400 rounded-full w-fit text-white"
    >Coba lagi</button>
  </div>
</main>