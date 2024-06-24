<script lang="ts">
  let isShowMenu: boolean = false;
</script>

<button
  on:click={() => isShowMenu = !isShowMenu}
  class="{isShowMenu ? 'block' : 'hidden'} z-40 inset-0 bg-zinc-700/50 h-screen fixed">
</button>

<header class="bg-white w-full h-fit flex items-center">
  <div class="md:w-9/12 md:mx-auto py-3 md:px-0 px-5 flex flex-row justify-between items-center gap-6 w-full">
    <a href="/">
      <img
        src="/icons/logo.svg"
        alt="artiwancara"
        class="w-[160px] h-auto"
      />
    </a>
    <div class="hidden md:flex flex-row gap-4 items-center text-sm font-medium">
      <a class="hover:text-violet-500" href="/about">Tentang</a>
      <a class="hover:text-violet-500" href="/privacy-policy">Kebijakan Privasi</a>
      <a class="hover:text-violet-500" href="/contact">Kontak</a>
      <a class="hover:text-violet-500" href="/faq">FAQs</a>
      <a class="bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-600 py-1.5 px-4 rounded-full" href="/start">Mulai sekarang</a>
    </div>
    <div class="flex md:hidden">
      <button type="button" on:click={() => isShowMenu = !isShowMenu} class="toggle {isShowMenu ? 'clicked' : ''}">
        <div class="bars" id="bar1"></div>
        <div class="bars" id="bar2"></div>
        <div class="bars" id="bar3"></div>
      </button>
    </div>
  </div>
  <aside
    class="{isShowMenu ? 'left-0' : '-left-[250px]'} duration-150 py-6 px-6 h-screen w-[250px] bg-white rounded-r-xl
    fixed z-50 top-0 bottom-0 flex flex-col gap-6">
    <a class="hover:text-violet-500 px-2" href="/" on:click={()=> isShowMenu = false}>Beranda</a>
    <a class="hover:text-violet-500 px-2" href="/about" on:click={()=> isShowMenu = false}>Tentang</a>
    <a class="hover:text-violet-500 px-2" href="/privacy-policy" on:click={()=> isShowMenu = false}>Kebijakan Privasi</a>
    <a class="hover:text-violet-500 px-2" href="/contact" on:click={()=> isShowMenu = false}>Kontak</a>
    <a class="hover:text-violet-500 px-2" href="/faq" on:click={()=> isShowMenu = false}>FAQs</a>
    <a
      on:click={()=> isShowMenu = false}
      class="bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-600 py-1.5 px-4 rounded-full text-center"
      href="/start">Mulai sekarang</a>
  </aside>
</header>

<style lang="postcss">
  .toggle {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition-duration: .5s;
  }

  .bars {
    width: 100%;
    height: 4px;
    @apply bg-violet-500;
    border-radius: 4px;
  }

  #bar2 {
    transition-duration: .8s;
  }

  #bar1, #bar3 {
    width: 70%;
  }

  .toggle.clicked .bars {
    position: absolute;
    transition-duration: .5s;
  }

  .toggle.clicked #bar2 {
    transform: scaleX(0);
    transition-duration: .5s;
  }

  .toggle.clicked #bar1 {
    width: 100%;
    transform: rotate(45deg);
    transition-duration: .5s;
  }

  .toggle.clicked #bar3 {
    width: 100%;
    transform: rotate(-45deg);
    transition-duration: .5s;
  }

  .toggle.clicked {
    transition-duration: .5s;
    transform: rotate(180deg);
  }
</style>