<script lang="ts">
  import { InterviewState, InterviewMode } from "@/state/interview.js";
  import Initial from "@/components/interview/Initial.svelte";
  import Answer from "@/components/interview/Answer.svelte";
  import Finished from "@/components/interview/Finished.svelte";

  let views: Record<InterviewState, any> = {
    [InterviewState.Initial]: Initial,
    [InterviewState.Answer]: Answer,
    [InterviewState.Finished]: Finished
  }
</script>

<svelte:head>
  <title>Mulai wawancara dengan AI | Artiwancara</title>
</svelte:head>

<main class="bg-white min-h-[100dvh]">
  <svelte:component this={views[$InterviewMode]} />
</main>