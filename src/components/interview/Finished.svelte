<script lang="ts">
  import { fade } from 'svelte/transition';
  import { InterviewMode, InterviewState, Grade } from '@/state/interview.js';
</script>

<main transition:fade={{ delay: 250, duration: 200 }}>
  <div class="flex flex-col justify-center items-center w-full gap-4">
    <h1 class="text-3xl font-bold">Wawancara selesai</h1>
    <p class="text-lg">Nilai anda:</p>
    <h1 class="text-emerald-600 text-6xl text-center font-bold">
      {$Grade}
    </h1>
    <button
      on:click={() => InterviewMode.set(InterviewState.Initial)}
      class="py-2 px-5 bg-violet-500 hover:bg-violet-400 rounded-full w-fit text-white"
    >Coba wawancara lagi</button>
  </div>
</main>