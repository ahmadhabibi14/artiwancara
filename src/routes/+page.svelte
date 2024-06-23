<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { RiArrowsArrowRightLine } from 'svelte-icons-pack/ri';
  import { fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Artiwancara | Latihan wawancara dengan AI</title>
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