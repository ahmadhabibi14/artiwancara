<script>
  import '@/style/app.css';
  import '@fontsource/lato';
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';
</script>

<main class="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100">
  <Header />
  <section class="min-h-[100dvh] md:w-9/12 w-full px-5 md:px-0 md:mx-auto mt-6 md:mt-10 mb-11">
    <slot />
  </section>
  <Footer />
</main>