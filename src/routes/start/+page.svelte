<script lang="ts">
  import { Jobs } from '@/lib/jobs.js';

  let jobTitle: string            = Jobs[0].name || '';
  let jobDescription: string      = '';
  let jobResponsibilities: string = '';
  let jobRequirements: string     = '';
</script>

<svelte:head>
  <title>Artiwancara</title>
</svelte:head>

<main class="bg-white min-h-[100dvh]">
  <section class="mt-14 flex flex-col gap-7 justify-center mx-auto w-fit">
    <header class="flex flex-col gap-6 max-w-[500px]">
      <h1 class="text-3xl font-bold">Pilih pekerjaan</h1>
      <div class="flex flex-auto flex-wrap gap-2">
        {#each (Jobs || []) as job}
          <button
            on:click={() => (jobTitle = job.name)}
            class="text-sm py-1 px-3  rounded-full border
            {jobTitle === job.name
              ? 'bg-violet-500/20 border-violet-400 text-violet-500'
              : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200'
            }"
          >
            {job.label}
          </button>
        {/each}
      </div>
    </header>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-3">
        <h5>Deskripsi</h5>
        <textarea
          name="job_description"
          id="job_description"
          bind:value={jobDescription}
          rows="2"
          class="border border-zinc-300 p-3 rounded-lg focus:border-violet-500
            focus:outline focus:outline-violet-500 max-h-[160px] min-h-[75px]"
        ></textarea>
      </div>
      <div class="flex flex-col gap-3">
        <h5>Tanggung Jawab</h5>
        <textarea
          name="job_responsibilities"
          id="job_responsibilities"
          bind:value={jobResponsibilities}
          rows="5"
          class="border border-zinc-300 p-3 rounded-lg focus:border-violet-500
            focus:outline focus:outline-violet-500 resize-y max-h-[200px] min-h-[145px]"
        ></textarea>
      </div>
      <div class="flex flex-col gap-3">
        <h5>Persyaratan</h5>
        <textarea
          name="job_requirements"
          id="job_requirements"
          bind:value={jobRequirements}
          rows="5"
          class="border border-zinc-300 p-3 rounded-lg focus:border-violet-500
            focus:outline focus:outline-violet-500 resize-y max-h-[200px] min-h-[145px]"
        ></textarea>
      </div>
    </div>
    <button
      class="mt-3 w-fit bg-violet-500 hover:bg-violet-600
      text-white py-2 px-5 rounded-full mx-auto"
    >
      Mulai Wawancara
    </button>
  </section>
</main>