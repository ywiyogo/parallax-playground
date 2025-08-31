<script lang="ts">
  import { onMount } from 'svelte';

  let {
    coupleName,
    guestName,
    isGlobalScroll
  }: {
    coupleName: string;
    guestName: string;
    isGlobalScroll: boolean;
  } = $props();

  // Global window scroll for parallax mode
  let scrollY = $state(0);

  // Scroll state
  let scrollContainer: HTMLElement;
  let scrollTop = $state({ value: 0 });

  // Parallax calculation based on scroll mode
  let parallaxScroll = $derived(isGlobalScroll ? scrollY : scrollTop.value);

  // Simple approach - each section gets its own observer
  let inviteVisible = $state(false);
  let storyVisible = $state(false);
  let rsvpVisible = $state(false);
  let inviteElement: HTMLElement;
  let storyElement: HTMLElement;
  let rsvpElement: HTMLElement;

  // Setup intersection observer for each element
  function createElementObserver(element: HTMLElement, setVisible: (visible: boolean) => void) {
    if (!element || !scrollContainer) return null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
          console.log(
            `${element.id || element.classList.toString()}: ${entry.isIntersecting ? 'visible' : 'hidden'}`
          );
        });
      },
      {
        root: scrollContainer,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);
    return observer;
  }

  // Scroll tracking function using utility
  function handleScroll() {
    if (scrollContainer) {
      scrollTop.value = scrollContainer.scrollTop;
      console.log('Template scroll:', scrollTop.value);
    }
  }

  // Create observers when elements are ready
  $effect(() => {
    if (inviteElement && scrollContainer) {
      createElementObserver(inviteElement, (visible) => (inviteVisible = visible));
    }
  });

  $effect(() => {
    if (storyElement && scrollContainer) {
      createElementObserver(storyElement, (visible) => (storyVisible = visible));
    }
  });

  $effect(() => {
    if (rsvpElement && scrollContainer) {
      createElementObserver(rsvpElement, (visible) => (rsvpVisible = visible));
    }
  });

  onMount(() => {
    console.log(
      '🎬 Parallax component mounted - scroll mode:',
      isGlobalScroll ? 'Global' : 'Container'
    );

    // Set up window scroll tracking for global mode
    if (isGlobalScroll) {
      const handleWindowScroll = () => {
        scrollY = window.scrollY;
      };

      window.addEventListener('scroll', handleWindowScroll);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleWindowScroll);
      };
    }
  });
</script>

<svelte:window bind:scrollY />

<div
  class="relative h-full w-full overflow-y-auto bg-slate-200 text-center text-gray-800"
  bind:this={scrollContainer}
  onscroll={handleScroll}
>
  <section class="h-screen bg-[url('./cover1.png')] bg-cover bg-local bg-center">
    <div class="p-8 text-white">
      <h2 class="text-3xl">The Wedding of {coupleName}</h2>
      <p class="text-xl">10.10.2025</p>
      <p class="text-xl">Dear {guestName}</p>
    </div>
  </section>

  <section class="h-[50vh] p-10">
    <div
      class="scroll-animation mt-30 max-w-3xl rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm"
      class:visible={inviteVisible}
      bind:this={inviteElement}
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
    class="flex h-[75vh] items-center justify-center bg-[url('https://placehold.co/500x200/374151/ffffff?text=Our+Story+Begins')] bg-contain bg-local bg-top bg-no-repeat p-8"
  >
    <div
      class="scroll-animation max-w-3xl rounded-3xl bg-white/50 p-8 shadow-xl backdrop-blur-sm"
      class:visible={storyVisible}
      bind:this={storyElement}
      style:transform={`translate3d(0, ${parallaxScroll * -0.05}px, 0)`}
    >
      <h2 class="mb-6 text-center text-4xl font-bold md:text-5xl">Our Story</h2>
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
    class="rsvp parallax-bg flex h-[75vh] items-center justify-center bg-[url('https://placehold.co/500x200/374151/ffffff?text=RSVP')] bg-contain bg-local bg-top bg-no-repeat p-8 text-center md:px-16"
  >
    <div
      class="scroll-animation max-w-3xl rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm"
      class:visible={rsvpVisible}
      bind:this={rsvpElement}
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
  .scroll-animation {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
    transition:
      opacity 0.6s ease-out,
      transform 0.6s ease-out;
    pointer-events: auto;
  }

  .scroll-animation.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    border: 3px solid #ea580c;
    box-shadow: 0 0 30px rgba(249, 115, 22, 0.5);
  }
</style>
