<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { TrOutlineNorthStar } from 'svelte-icons-pack/tr';
  import { Jobs, type Job } from '@/lib/jobs.js';

  let jobName: string             = Jobs[0].name || '';
  let jobLabel: string            = Jobs[0].label || '';
  let jobDescription: string      = '';
  let jobResponsibilities: string = '';
  let jobRequirements: string     = '';

  const changeJob = (job: Job) => {
    jobLabel = job.label;
    jobName = job.name;
  }
</script>

<svelte:head>
  <title>Artiwancara</title>
</svelte:head>

<main class="bg-white min-h-[100dvh]">
  <section class="flex flex-col gap-7 justify-center mx-auto w-fit">
    <header class="flex flex-col gap-6 max-w-[500px]">
      <h1 class="text-center text-3xl font-bold">Pilih pekerjaan</h1>
      <div class="flex flex-auto flex-wrap gap-2">
        {#each (Jobs || []) as job}
          <button
            on:click={() => changeJob(job)}
            class="text-sm py-1 px-3  rounded-full border
            {jobName === job.name
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
      <div class="flex flex-row gap-2 items-center border-b border-b-zinc-200 pb-5">
        <label for="" class="ml-2 text-sm">Jenis Pekerjaan:</label>
        <p class="text-xl font-bold">{jobLabel}</p>
      </div>
      <div class="flex flex-col gap-2">
        <label for="job_description" class="ml-2 text-sm">Deskripsi</label>
        <textarea
          name="job_description"
          id="job_description"
          bind:value={jobDescription}
          rows="2"
          class="border border-zinc-300 p-3 rounded-lg focus:border-violet-500
            focus:outline focus:outline-violet-500 max-h-[160px] min-h-[75px]"
        ></textarea>
      </div>
      <div class="flex flex-col gap-2">
        <label for="job_responsibilities" class="ml-2 text-sm">Tanggung Jawab</label>
        <textarea
          name="job_responsibilities"
          id="job_responsibilities"
          bind:value={jobResponsibilities}
          rows="5"
          class="border border-zinc-300 p-3 rounded-lg focus:border-violet-500
            focus:outline focus:outline-violet-500 resize-y max-h-[200px] min-h-[145px]"
        ></textarea>
      </div>
      <div class="flex flex-col gap-2">
        <label for="job_requirements" class="ml-2 text-sm">Persyaratan</label>
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
      text-white py-2 px-5 rounded-full mx-auto flex flex-row gap-2 items-center group"
    >
      <span>Mulai Wawancara</span>
      <Icon
        className="group-hover:rotate-45 transition-all mt-1"
        size="20"
        src={TrOutlineNorthStar}
      />
    </button>
  </section>
</main>