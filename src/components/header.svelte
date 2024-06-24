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
    </div>
    <div class="flex md:hidden">
      <button on:click={() => isShowMenu = !isShowMenu} class="toggle">
        <div class="bars" id="bar1"></div>
        <div class="bars" id="bar2"></div>
        <div class="bars" id="bar3"></div>
      </button>
    </div>
  </div>
  <aside
    class="{isShowMenu ? 'left-0' : '-left-[250px]'} duration-150 py-6 px-7 h-screen w-[250px] bg-white rounded-r-xl
    fixed z-50 top-0 bottom-0 flex flex-col gap-6">
    <a class="hover:text-violet-500" href="/" on:click={()=> isShowMenu = !isShowMenu}>Beranda</a>
    <a class="hover:text-violet-500" href="/about" on:click={()=> isShowMenu = !isShowMenu}>Tentang</a>
    <a class="hover:text-violet-500" href="/privacy-policy" on:click={()=> isShowMenu = !isShowMenu}>Kebijakan Privasi</a>
    <a class="hover:text-violet-500" href="/contact" on:click={()=> isShowMenu = !isShowMenu}>Kontak</a>
    <a class="hover:text-violet-500" href="/faq" on:click={()=> isShowMenu = !isShowMenu}>FAQs</a>
  </aside>
</header>

<style lang="postcss">
  #checkbox {
    display: none;
  }

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

  #bar1,#bar3 {
    width: 70%;
  }

  #checkbox:checked + .toggle .bars {
    position: absolute;
    transition-duration: .5s;
  }

  #checkbox:checked + .toggle #bar2 {
    transform: scaleX(0);
    transition-duration: .5s;
  }

  #checkbox:checked + .toggle #bar1 {
    width: 100%;
    transform: rotate(45deg);
    transition-duration: .5s;
  }

  #checkbox:checked + .toggle #bar3 {
    width: 100%;
    transform: rotate(-45deg);
    transition-duration: .5s;
  }

  #checkbox:checked + .toggle {
    transition-duration: .5s;
    transform: rotate(180deg);
  }
</style>