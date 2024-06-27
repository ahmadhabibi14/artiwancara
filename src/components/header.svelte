<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  let isShowMenu: boolean = false;
  let isDarkTheme: boolean = false;

  $: {
    if (browser) {
      if (isDarkTheme) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  onMount(() => {
    if (browser) {
      if (localStorage.getItem('theme') === 'dark') {
        isDarkTheme = true;
      } else {
        isDarkTheme = false;
        localStorage.setItem('theme', 'light');
      }
    }
  })
</script>

<button
  on:click={() => isShowMenu = !isShowMenu}
  class="{isShowMenu ? 'block' : 'hidden'} z-40 inset-0 bg-zinc-700/50 h-screen fixed">
</button>

<header class="bg-white dark:bg-zinc-900 w-full h-fit flex items-center">
  <div class="md:w-9/12 md:mx-auto py-3 md:px-0 px-5 flex flex-row justify-between items-center gap-6 w-full">
    <a href="/">
      <img
        src="/icons/logo.svg"
        alt="artiwancara"
        class="w-[160px] h-auto"
      />
    </a>
    <div class="hidden md:flex flex-row gap-4 items-center text-sm font-medium">
      <label
        for="themeToggle"
        class="themeToggle st-sunMoonThemeToggleBtn"
      >
        <input bind:checked={isDarkTheme} type="checkbox" id="themeToggle" class="themeToggleInput" />
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="none"
        >
          <mask id="moon-mask">
            <rect x="0" y="0" width="20" height="20" fill="white"></rect>
            <circle cx="11" cy="3" r="8" fill="black"></circle>
          </mask>
          <circle
            class="sunMoon"
            cx="10"
            cy="10"
            r="8"
            mask="url(#moon-mask)"
          ></circle>
          <g>
            <circle class="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
            <circle class="sunRay sunRay2" cx="14" cy="16.928" r="1.5"></circle>
            <circle class="sunRay sunRay3" cx="6" cy="16.928" r="1.5"></circle>
            <circle class="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
            <circle class="sunRay sunRay5" cx="6" cy="3.1718" r="1.5"></circle>
            <circle class="sunRay sunRay6" cx="14" cy="3.1718" r="1.5"></circle>
          </g>
        </svg>
      </label>
      <a class="hover:text-violet-500" href="/about">Tentang</a>
      <a class="hover:text-violet-500" href="/privacy-policy">Kebijakan Privasi</a>
      <a class="hover:text-violet-500" href="/contact">Kontak</a>
      <a class="hover:text-violet-500" href="/faq">FAQs</a>
      <a class="bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400 py-1.5 px-4 rounded-full" href="/start">Mulai sekarang</a>
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
    class="{isShowMenu ? 'left-0' : '-left-[250px]'} duration-150 py-6 px-6 h-screen w-[250px] bg-white dark:bg-zinc-900 rounded-r-xl
    fixed z-50 top-0 bottom-0 flex flex-col gap-6">
    <a class="hover:text-violet-500 px-2" href="/" on:click={()=> isShowMenu = false}>Beranda</a>
    <a class="hover:text-violet-500 px-2" href="/about" on:click={()=> isShowMenu = false}>Tentang</a>
    <a class="hover:text-violet-500 px-2" href="/privacy-policy" on:click={()=> isShowMenu = false}>Kebijakan Privasi</a>
    <a class="hover:text-violet-500 px-2" href="/contact" on:click={()=> isShowMenu = false}>Kontak</a>
    <a class="hover:text-violet-500 px-2" href="/faq" on:click={()=> isShowMenu = false}>FAQs</a>
    <a
      on:click={()=> isShowMenu = false}
      class="bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400 py-1.5 px-4 rounded-full text-center"
      href="/start"
    >Mulai sekarang</a>
    <label
      for="themeToggle_mobile"
      class="themeToggle st-sunMoonThemeToggleBtn"
    >
      <input bind:checked={isDarkTheme} type="checkbox" id="themeToggle_mobile" class="themeToggleInput" />
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="none"
      >
        <mask id="moon-mask_mobile">
          <rect x="0" y="0" width="20" height="20" fill="white"></rect>
          <circle cx="11" cy="3" r="8" fill="black"></circle>
        </mask>
        <circle
          class="sunMoon"
          cx="10"
          cy="10"
          r="8"
          mask="url(#moon-mask_mobile)"
        ></circle>
        <g>
          <circle class="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
          <circle class="sunRay sunRay2" cx="14" cy="16.928" r="1.5"></circle>
          <circle class="sunRay sunRay3" cx="6" cy="16.928" r="1.5"></circle>
          <circle class="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
          <circle class="sunRay sunRay5" cx="6" cy="3.1718" r="1.5"></circle>
          <circle class="sunRay sunRay6" cx="14" cy="3.1718" r="1.5"></circle>
        </g>
      </svg>
    </label>
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

  .themeToggle {
    @apply text-zinc-300 w-7 md:ml-0 ml-2;
  }

  .st-sunMoonThemeToggleBtn {
    position: relative;
    cursor: pointer;
  }

  .st-sunMoonThemeToggleBtn .themeToggleInput {
    opacity: 0;
    width: 100%;
    aspect-ratio: 1;
  }

  .st-sunMoonThemeToggleBtn svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.4s ease;
    transform: rotate(40deg);
  }

  .st-sunMoonThemeToggleBtn svg .sunMoon {
    transform-origin: center center;
    transition: inherit;
    transform: scale(1);
  }

  .st-sunMoonThemeToggleBtn svg .sunRay {
    transform-origin: center center;
    transform: scale(0);
  }

  .st-sunMoonThemeToggleBtn svg mask > circle {
    transition: transform 0.64s cubic-bezier(0.41, 0.64, 0.32, 1.575);
    transform: translate(0px, 0px);
  }

  .st-sunMoonThemeToggleBtn svg .sunRay2 {
    animation-delay: 0.05s !important;
  }
  .st-sunMoonThemeToggleBtn svg .sunRay3 {
    animation-delay: 0.1s !important;
  }
  .st-sunMoonThemeToggleBtn svg .sunRay4 {
    animation-delay: 0.17s !important;
  }
  .st-sunMoonThemeToggleBtn svg .sunRay5 {
    animation-delay: 0.25s !important;
  }
  .st-sunMoonThemeToggleBtn svg .sunRay5 {
    animation-delay: 0.29s !important;
  }

  .st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg {
    transform: rotate(90deg);
  }
  .st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg mask > circle {
    transform: translate(16px, -3px);
  }
  .st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg .sunMoon {
    transform: scale(0.55);
  }
  .st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg .sunRay {
    animation: showRay1832 0.4s ease 0s 1 forwards;
  }

  @keyframes showRay1832 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>