<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import {
    RiArrowsArrowRightLine, RiUserFacesUserLine, RiSystemLock2Line, RiSystemStarFill, RiFinancePriceTagLine
  } from 'svelte-icons-pack/ri';
  import { FiThumbsUp } from 'svelte-icons-pack/fi';
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

<main class="bg-white min-h-[100dvh]" transition:fade={{ delay: 250, duration: 300 }}>
  <div class="flex flex-col gap-10 cursor-default">
    <div class="w-full h-[400px] md:h-96 rounded-xl overflow-hidden relative">  
      <section class="px-4 flex flex-col gap-6 justify-center items-center absolute mx-auto w-full h-full my-auto">
        <h1 class="w-full md:max-w-[800px] text-center text-3xl md:text-5xl font-bold text-violet-400">Tingkatkan kepercayaan diri Anda, sukses dalam wawancara kerja</h1>
        <p class="text-sm md:text-lg text-zinc-300 text-center max-w-[800px]">Latih pertanyaan wawancara kerja yang disesuaikan dengan deskripsi pekerjaan Anda. Dapatkan masukan dan saran AI instan untuk menyempurnakan jawaban Anda.</p>
        <a href="/start" class="flex flex-row relative bg-violet-500 py-2 rounded-full w-fit text-white pl-5 pr-12 group">
          <span>Coba sekarang</span>
          <Icon
            className="absolute right-4 top-3 group-hover:right-2 transition-all"
            size="20"
            src={RiArrowsArrowRightLine}
          />
        </a>
      </section>
      <div class="container"></div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 justify-between cursor-default">
      <div class="flex flex-col gap-4">
        <div class="flex justify-center items-center font-bold gap-3 md:gap-2">
          <span class="text-emerald-600 text-3xl">#1</span>
          <span class="text-base md:text-xl">Platform Interview AI terbaik di Indonesia</span>
        </div>
        <div class="flex flex-row gap-4 items-center justify-center md:justify-start">
          <div class="flex flex-row">
            <img
              src="/img/person-1.png"
              alt=""
              class="w-11 h-11 rounded-full border-[2px] border-white"
            />
            <img
              src="/img/person-2.png"
              alt=""
              class="w-11 h-11 rounded-full -ml-2 border-[2px] border-white"
            />
            <img
              src="/img/person-3.png"
              alt=""
              class="w-11 h-11 rounded-full -ml-2 border-[2px] border-white"
            />
          </div>
          <div class="text-sm text-zinc-600 flex flex-col gap-1.5">
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
        <div class="flex flex-col items-center justify-center gap-2 py-4 px-8 bg-pink-400/20 text-pink-600 rounded-lg text-sm h-auto">
          <Icon
            className=""
            size="30"
            src={RiFinancePriceTagLine}
          />
          <span>Gratis</span>
        </div>
        <div class="flex flex-col items-center justify-center gap-2 p-4 bg-amber-400/20 text-amber-600 rounded-lg text-sm h-auto">
          <Icon
            className=""
            size="30"
            src={RiUserFacesUserLine}
          />
          <span>Ramah Pengguna</span>
        </div>
        <div class="flex flex-col items-center justify-center gap-2 p-4 bg-blue-400/20 text-blue-600 rounded-lg text-sm h-auto">
          <Icon
            className=""
            size="30"
            src={FiThumbsUp}
          />
          <span>Terpercaya</span>
        </div>
        <div class="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-400/20 text-emerald-600 rounded-lg text-sm h-auto">
          <Icon
            className=""
            size="30"
            src={RiSystemLock2Line}
          />
          <span>Privasi Aman</span>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .container {
    width: 100%;
    height: 100%;
    background: #18181b;
    --gap: 5em;
    --line: 1px;
    --color: rgba(255, 255, 255, 0.2);
    background-image: linear-gradient(-90deg,
      transparent calc(var(--gap) - var(--line)),
      var(--color) calc(var(--gap) - var(--line) + 1px),
      var(--color) var(--gap)
    ), linear-gradient(0deg,
      transparent calc(var(--gap) - var(--line)),
      var(--color) calc(var(--gap) - var(--line) + 1px),
      var(--color) var(--gap)
    );
    background-size: var(--gap) var(--gap);
  }
</style>