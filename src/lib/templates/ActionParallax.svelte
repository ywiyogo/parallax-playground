<script lang="ts">
  import { onMount } from 'svelte';
  import { scrollReveal } from '$lib/actions/scrollReveal';

  let {
    coupleName,
    guestName,
    isGlobalScroll
  }: {
    coupleName: string;
    guestName: string;
    isGlobalScroll: boolean;
  } = $props();

  // Window scroll tracking for global mode
  let windowScrollY = $state(0);

  // Scroll state
  let scrollContainer = $state<HTMLElement | null>(null);
  let scrollTop = $state({ value: 0 });

  // Parallax calculation based on scroll mode
  let parallaxScroll = $derived(isGlobalScroll ? windowScrollY : scrollTop.value);

  // Scroll tracking function
  function handleScroll() {
    handleTemplateScroll(scrollContainer, scrollTop);
  }

  function handleTemplateScroll(
    scrollContainer: HTMLElement | null,
    scrollTop: { value: number }
  ): void {
    if (scrollContainer) {
      scrollTop.value = scrollContainer.scrollTop;
      console.log('Container scroll:', scrollTop.value);
    }
  }

  onMount(() => {
    console.log(
      '🎬 ActionParallax mounted - scroll mode:',
      isGlobalScroll ? 'Global' : 'Container'
    );

    // Set up window scroll tracking for global mode
    if (isGlobalScroll) {
      const handleWindowScroll = () => {
        windowScrollY = window.scrollY;
      };

      window.addEventListener('scroll', handleWindowScroll);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleWindowScroll);
      };
    }
  });
</script>

<div
  class="relative container flex h-full w-full flex-col overflow-y-auto bg-slate-200 text-center text-gray-800"
  bind:this={scrollContainer}
  onscroll={handleScroll}
>
  <section class="min-h-screen bg-[url('./cover1.png')] bg-cover bg-local bg-center">
    <div class="p-8 text-white">
      <h2 class="text-3xl">The Wedding of {coupleName}</h2>
      <p class="text-xl">10.10.2025</p>
      <p class="text-xl">Dear {guestName}</p>
    </div>
  </section>

  <section class="min-h-[50vh] p-10">
    <div
      class="scroll-reveal mt-30 max-w-3xl rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm"
      use:scrollReveal={{
        threshold: 0.05, // 5% of element must be visible to trigger animation
        rootMargin: '0px 0px -100px 0px', // Trigger animation 100px before element enters viewport
        root: scrollContainer // Monitor intersection within this scrollable container
      }}
      style:transform={`translate3d(0, ${parallaxScroll * -0.5}px, 0)`}
    >
      <p class="mb-4 text-xl font-light tracking-widest uppercase md:text-2xl">
        You are cordially invited to the wedding of
      </p>
      <h2 class="mb-6 text-center text-4xl font-bold md:text-5xl">Sarah & Liam</h2>
      <p id="our-story-text" class="mb-6 text-center text-lg text-gray-700 md:text-xl">
        June 15, 2025
      </p>
    </div>
  </section>

  <section
    class="flex min-h-[75vh] items-center justify-center bg-[url('https://placehold.co/500x200/374151/ffffff?text=Our+Story+Begins')] bg-contain bg-local bg-top bg-no-repeat p-8"
  >
    <div
      class="scroll-reveal max-w-3xl rounded-3xl bg-white/50 p-8 shadow-xl backdrop-blur-sm"
      use:scrollReveal={{
        threshold: 0.05, // 5% of element must be visible
        rootMargin: '0px 0px -100px 0px', // Trigger 100px BEFORE element reaches bottom of container!
        root: scrollContainer // Monitor intersection within this scrollable container
      }}
      style:transform={`translate3d(0, ${parallaxScroll * -0.05}px, 0)`}
    >
      <h2 class="my-6 text-center text-4xl font-bold md:text-5xl">Our Story</h2>
      <p id="our-story-text" class="mb-6 text-center text-lg text-gray-700 md:text-xl">
        From the moment we met, our lives intertwined in a way we never expected. It was a beautiful
        journey of shared laughter, quiet understanding, and unwavering support. Now, as we stand on
        the threshold of forever, we want to celebrate the next chapter with all of you.
      </p>
      <p class="text-center text-lg font-semibold text-gray-700 md:text-xl">
        Thank you for being a part of our adventure.
      </p>
    </div>
  </section>

  <section
    class="rsvp parallax-bg flex min-h-[75vh] items-center justify-center bg-[url('https://placehold.co/500x200/374151/ffffff?text=RSVP')] bg-contain bg-local bg-top bg-no-repeat p-8 py-24 text-center md:px-16"
  >
    <div
      class="scroll-reveal max-w-3xl rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm"
      use:scrollReveal={{
        threshold: 0.05, // 5% of element must be visible to trigger animation
        rootMargin: '0px 0px -100px 0px', // Trigger animation 100px before element enters viewport
        root: scrollContainer // Monitor intersection within this scrollable container
      }}
      style:transform={`translate3d(0, ${parallaxScroll * -0.05}px, 0)`}
    >
      <h2 class="mb-6 text-4xl font-bold md:text-5xl">RSVP</h2>
      <p class="mb-8 text-xl">Kindly respond by May 15, 2025</p>
      <p class="mb-8 text-lg font-light">
        Your presence is the only gift we require. We can't wait to celebrate our special day with
        you!
      </p>
      <a
        href="#"
        class="hover:bg-opacity-90 inline-block rounded-full bg-blue-300 px-8 py-4 font-semibold text-white shadow-lg transition-colors"
        >RSVP Now</a
      >
    </div>
  </section>
</div>

<style>
  /* Custom scroll animations */
  .scroll-reveal {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
    transition:
      opacity 0.6s ease-out,
      transform 0.6s ease-out;
    pointer-events: auto;
  }

  /* Force override even scoped styles */
  :global(.scroll-reveal.visible) {
    opacity: 1;
    transform: translateY(0) scale(1);
    border: 3px solid #ea580c;
    box-shadow: 0 0 30px rgba(249, 115, 22, 0.5);
  }
</style>
