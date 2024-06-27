<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { RiArrowsArrowRightLine, RiSystemStarFill } from 'svelte-icons-pack/ri';
  import { fade } from 'svelte/transition';
  import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_OG_IMG_URL } from '@/lib/constants.js';

  const SITE_TITLE: string = 'Artiwancara | Latihan wawancara dengan AI';
</script>

<svelte:head>
  <title>{SITE_TITLE}</title>
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="author" content="Ahmad Habibi" />
  <meta name="description" content={SITE_DESCRIPTION} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={SITE_TITLE} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:locale" content="id_ID" />
  <meta property="og:locale:alternate" content="en_UK" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:image" content={SITE_OG_IMG_URL} />
  <meta property="og:image:secure_url" content={SITE_OG_IMG_URL} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={SITE_NAME} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SITE_TITLE} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <meta name="twitter:image" content={SITE_OG_IMG_URL} />
</svelte:head>

<main transition:fade={{ delay: 250, duration: 200 }}>
  <div class="flex flex-col gap-10 cursor-default">
    <div class="w-full border border-zinc-200 dark:border-zinc-800 h-[400px] md:h-96 rounded-xl overflow-hidden relative">  
      <section class="px-4 flex flex-col gap-6 justify-center items-center absolute mx-auto w-full h-full my-auto">
        <h1 class="w-full md:max-w-[800px] text-center text-3xl md:text-5xl font-black text-violet-500">Tingkatkan kepercayaan diri Anda, sukses dalam wawancara kerja</h1>
        <p class="text-sm md:text-lg text-zinc-700 dark:text-zinc-300 text-center max-w-[800px]">Latih pertanyaan wawancara kerja yang disesuaikan dengan deskripsi pekerjaan Anda. Dapatkan masukan dan saran AI instan untuk menyempurnakan jawaban Anda.</p>
        <a href="/start" class="flex flex-row relative bg-gradient-to-br from-emerald-500 to-emerald-700 py-2 rounded-full w-fit text-white pl-5 pr-12 group">
          <p>Coba sekarang</p>
          <Icon
            className="absolute right-4 top-3 group-hover:right-2 transition-all"
            size="20"
            src={RiArrowsArrowRightLine}
          />
        </a>
      </section>
      <div class="pattern-1"></div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 justify-between cursor-default">
      <div class="flex flex-col gap-4">
        <div class="flex justify-center items-center font-bold gap-3 md:gap-2">
          <p class="text-emerald-600 text-3xl">#1</p>
          <p class="text-base md:text-xl dark:text-zinc-200">Platform Interview AI terbaik di Indonesia</p>
        </div>
        <div class="flex flex-row gap-4 items-center justify-center md:justify-start">
          <div class="flex flex-row">
            <img
              src="/img/person-1.png"
              alt=""
              class="w-11 h-11 rounded-full border-[2px] border-white dark:border-zinc-800"
            />
            <img
              src="/img/person-2.png"
              alt=""
              class="w-11 h-11 rounded-full -ml-2 border-[2px] border-white dark:border-zinc-800"
            />
            <img
              src="/img/person-3.png"
              alt=""
              class="w-11 h-11 rounded-full -ml-2 border-[2px] border-white dark:border-zinc-800"
            />
          </div>
          <div class="text-sm text-zinc-600 dark:text-zinc-400 flex flex-col gap-1.5">
            <div class="flex flex-row text-sm">
              {#each Array(5) as _}
                <Icon
                  className="fill-amber-500"
                  size="15"
                  src={RiSystemStarFill}
                />
              {/each}
            </div>
            <p>Dipercaya 17,000+ pencari kerja</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 md:flex flex-row justify-center items-stretch gap-2 md:gap-4 mt-8 md:mt-0">
        <div class="flex flex-col items-center justify-center gap-2 py-4 px-8 bg-amber-400/20 text-amber-600 dark:text-amber-400 rounded-lg text-sm h-auto">
          <img
            src="/icons/gratis.svg"
            class="w-10 h-10"
            alt="gratis"
          />
          <p>Gratis</p>
        </div>
        <div class="flex flex-col items-center justify-center gap-2 p-4 bg-pink-400/20 text-pink-600 dark:text-pink-400 rounded-lg text-sm h-auto">
          <img
            src="/icons/ramah-pengguna.svg"
            class="w-10 h-10"
            alt="ramah-pengguna"
          />
          <p>Ramah Pengguna</p>
        </div>
        <div class="flex flex-col items-center justify-center gap-2 p-4 bg-blue-400/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm h-auto">
          <img
            src="/icons/terpercaya.svg"
            class="w-10 h-10"
            alt="terpercaya"
          />
          <p>Terpercaya</p>
        </div>
        <div class="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm h-auto">
          <img
            src="/icons/privasi-aman.svg"
            class="w-10 h-10"
            alt="privasi-aman"
          />
          <p>Privasi Aman</p>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  
</style>