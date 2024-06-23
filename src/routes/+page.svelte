<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { RiArrowsArrowRightLine } from 'svelte-icons-pack/ri';
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

<main class="bg-white min-h-[100dvh]">
  <div transition:fade={{ delay: 250, duration: 300 }}>
    AI powered

    <a href="/start" class="flex flex-row relative bg-violet-500 py-2 rounded-full w-fit text-white pl-5 pr-12 group">
      <span>Mulai sekarang</span>
      <Icon
        className="absolute right-4 top-3 group-hover:right-2 transition-all"
        size="20"
        src={RiArrowsArrowRightLine}
      />
    </a>
  </div>
</main>