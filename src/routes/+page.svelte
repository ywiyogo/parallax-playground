<script lang="ts">
  import Parallax from './../lib/templates/Parallax.svelte';
  import ActionParallax from './../lib/templates/ActionParallax.svelte';

  let isGlobalScroll = $state(true);
</script>

<div class="sticky top-0 z-10 bg-white/20 shadow-lg backdrop-blur-sm">
  <div class="flex items-center justify-between px-6 py-3">
    <h1 class="flex text-center text-3xl font-bold">Parallax Animation Comparison</h1>
    <button
      onclick={() => (isGlobalScroll = !isGlobalScroll)}
      class="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
    >
      {isGlobalScroll ? '🔄 Enable Container Scroll' : '🌐 Enable Global Scroll'}
    </button>
  </div>
</div>

<div class="mx-auto max-w-[95%] {isGlobalScroll ? 'overflow-auto' : ''}">
  <div class="flex {isGlobalScroll ? 'min-h-[200vh]' : 'h-screen'} flex-row items-stretch gap-8">
    <!-- Manual Implementation Section -->
    <section class="min-w-0 flex-1">
      <div class="flex h-full flex-col">
        <div class="flex-shrink-0 border-b-2 border-red-200 bg-red-50 p-4">
          <h2 class="text-center text-xl font-semibold text-red-700">🔴 Manual Observer</h2>
          <p class="mt-1 text-center text-sm text-gray-600">~60 lines script</p>
        </div>
        <div class="flex flex-1 {isGlobalScroll ? '' : 'overflow-y-auto'}">
          <Parallax
            coupleName="Sarah & Liam"
            guestName="Guest"
            date="10.10.2025"
            {isGlobalScroll}
          />
        </div>
      </div>
    </section>

    <!-- Action-Based Implementation Section -->
    <section class="min-w-0 flex-1">
      <div class="flex h-full flex-col">
        <div class="flex-shrink-0 border-b-2 border-green-200 bg-green-50 p-4">
          <h2 class="text-center text-xl font-semibold text-green-700">🟢 Svelte Action</h2>
          <p class="mt-1 text-center text-sm text-gray-600">~20 lines script</p>
        </div>
        <div class="flex flex-1 {isGlobalScroll ? '' : 'overflow-y-auto'}">
          <ActionParallax
            coupleName="Sarah & Liam"
            guestName="Guest"
            date="June 15, 2025"
            {isGlobalScroll}
          />
        </div>
      </div>
    </section>
  </div>
</div>
