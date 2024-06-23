<script lang="ts">
  import { InterviewState, InterviewMode } from "@/state/interview.js";
  import Initial from "@/components/interview/Initial.svelte";
  import Answer from "@/components/interview/Answer.svelte";
  import Finished from "@/components/interview/Finished.svelte";
  import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SITE_OG_IMG_URL } from "@/lib/constants.js";

  let views: Record<InterviewState, any> = {
    [InterviewState.Initial]: Initial,
    [InterviewState.Answer]: Answer,
    [InterviewState.Finished]: Finished
  }

  const SITE_TITLE: string = 'Artiwancara | Mulai wawancara dengan AI';
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
  <svelte:component this={views[$InterviewMode]} />
</main>