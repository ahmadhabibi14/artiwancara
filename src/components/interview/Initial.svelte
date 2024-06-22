<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { TrOutlineNorthStar } from 'svelte-icons-pack/tr';
  import { Jobs, type Job } from '@/lib/jobs.js';
  import type { RequestInterview } from '@/types/request.js';
  import type { ResponseHTTP, ResponseInterview } from '@/types/response.js';
  import axios from 'axios';
  import toast, { Toaster } from 'svelte-french-toast';
  import { InterviewMode, InterviewState, InterviewQuestions } from '@/state/interview.js';

  let jobName: string             = Jobs[0].name || '';
  let jobLabel: string            = Jobs[0].label || '';
  let jobDescription: string      = '';
  let jobResponsibilities: string = '';
  let jobRequirements: string     = '';

  const changeJob = (job: Job) => {
    jobLabel = job.label;
    jobName = job.name;
  }

  let isSubmitted: boolean = false;
  const Start = async () => {
    isSubmitted = true;
    const payload: RequestInterview = {
      job_name: jobName,
      job_description: jobDescription,
      job_responsibilities: jobResponsibilities,
      job_requirements: jobRequirements
    }
    await axios.post('/api/interview', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      const data = res.data as ResponseInterview;
      if (!data.success) {
        toast.error(data.errors);
      } else {
        InterviewMode.set(InterviewState.Answer);
        InterviewQuestions.set(data.questions);
      }
    }).catch((err) => {
      console.log('Err', err);
      toast.error(err.response.data.errors);
    }).finally(() => {
      isSubmitted = false;
    });
  }

  const platforms: {name: string; iconSrc: string; url: string}[] = [
    {
      name: 'Linkedin',
      iconSrc: '/icons/linkedin.png',
      url: 'https://linkedin.com'
    },
    {
      name: 'Indeed',
      iconSrc: '/icons/indeed.svg',
      url: 'https://indeed.com'
    },
    {
      name: 'Glints',
      iconSrc: '/icons/glints.png',
      url: 'https://glints.com'
    },
    {
      name: 'Jobstreet',
      iconSrc: '/icons/jobstreet.png',
      url: 'https://www.jobstreet.co.id'
    },
    {
      name: 'Kalibrr',
      iconSrc: '/icons/kalibrr.png',
      url: 'https://www.kalibrr.id'
    }
  ]
</script>

<svelte:head>
  <title>Artiwancara</title>
</svelte:head>

<Toaster />

<main class="bg-white min-h-[100dvh]">
  <div class="flex flex-row mx-auto w-full justify-evenly">
    <section class="flex flex-col gap-7 justify-center w-6/12">
      <header class="flex flex-col gap-6 max-w-[500px]">
        <h1 class="text-3xl font-bold">Pilih pekerjaan</h1>
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
        <div class="flex flex-col gap-1">
          <label for="job_description" class="ml-2 text-sm flex flex-row gap-2 items-end">Deskripsi <span class="text-red-500 text-2xl !-mb-2">*</span></label>
          <textarea
            name="job_description"
            id="job_description"
            bind:value={jobDescription}
            rows="2"
            class="border border-zinc-300 p-3 rounded-lg focus:border-violet-500
              focus:outline focus:outline-violet-500 max-h-[160px] min-h-[75px]"
          ></textarea>
        </div>
        <div class="flex flex-col gap-1">
          <label for="job_description" class="ml-2 text-sm flex flex-row gap-2 items-end">Tanggung Jawab <span class="text-red-500 text-2xl !-mb-2">*</span></label>
          <textarea
            name="job_responsibilities"
            id="job_responsibilities"
            bind:value={jobResponsibilities}
            rows="5"
            class="border border-zinc-300 p-3 rounded-lg focus:border-violet-500
              focus:outline focus:outline-violet-500 resize-y max-h-[200px] min-h-[145px]"
          ></textarea>
        </div>
        <div class="flex flex-col gap-1">
          <label for="job_description" class="ml-2 text-sm flex flex-row gap-2 items-end">Persyaratan <span class="text-red-500 text-2xl !-mb-2">*</span></label>
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
        on:click={Start}
        disabled={isSubmitted}
        class="mt-3 w-fit bg-violet-500 hover:bg-violet-600 disabled:bg-violet-400
        text-white py-2 px-5 rounded-full mx-auto flex flex-row gap-2 items-center group"
      >
        <span>Mulai Wawancara</span>
        <Icon
          className="group-hover:rotate-45 transition-all mt-1 {isSubmitted ? 'animate-spin' : ''}"
          size="20"
          src={TrOutlineNorthStar}
        />
      </button>
    </section>
    <section class="w-4/12 flex flex-col gap-6">
      <header class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold">Cari lowongan...</h1>
        <p>Tips! untuk memudahkanmu, carilah lowongan pekerjaan di platform - platform pencarian kerja seperti berikut. Kemudian salin deskripsi, tanggung jawab, dan persyaratan pekerjaan ke form untuk memuat pertanyaan</p>
      </header>
      <div class="flex gap-2 flex-wrap">
        {#each (platforms || []) as platform}
          <a
            href={platform.url}
            class="py-3 px-5 bg-white border border-zinc-200 rounded-lg">
            <img
              src={platform.iconSrc}
              alt={platform.name}
              class="h-8 w-auto"
            />
          </a>
        {/each}
      </div>
    </section>
  </div>
</main>