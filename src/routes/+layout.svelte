<script>
  import '@/style/app.css';
  import '@fontsource/lato';
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';
</script>

<main class="bg-white text-zinc-800">
  <Header />
  <section class="min-h-[100dvh] w-9/12 mx-auto mt-10 mb-11">
    <slot />
  </section>
  <Footer />
</main>