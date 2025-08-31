

# Parallax Playground

A Svelte 5 implementation of scroll-triggered parallax animations with Intersection Observer API.

![Parallax Playground](./docs/cover.png)

## ✨ Features

- Smooth scroll reveals with translate animations
- Individual animation timing per element
- Performance optimized with Intersection Observer
- Pure Svelte 5 using runes ($state, $effect)
- Responsive design

## 🚀 Quick Start

```bash
pnpm run dev
```

## 🆚 Comparison: Manual vs Svelte Action

### Manual Implementation ([Parallax.svelte](src/lib/templates/Parallax.svelte:1))

**Pros:**
- ✅ Clear per-element logic
- ✅ Full control over observers

**Cons:**
- ⚠️ Repetitive for multiple sections
- ⚠️ Scaling requires more code per element
- ⚠️ Manual state management overhead

### Svelte Action Approach ([ActionParallax.svelte](src/lib/templates/ActionParallax.svelte:1))

**Pros:**
- ✅ Scales easily to 10+ sections
- ✅ Reusable and maintainable
- ✅ Minimal code changes for new elements

**Cons:**
- ⚠️ Slightly less explicit than manual


For your invitation site, consider the action approach for easier expansion.

### Container Strategies

#### 🔄 Global Container Approach

Use a single scroll container for the entire page:

```svelte
<div bind:this={scrollContainer} class="main-container">
  <!-- All parallax sections -->
  <section><div use:scrollReveal={{ root: scrollContainer }}></div></section>
  <section><div use:scrollReveal={{ root: scrollContainer }}></div></section>
</div>
```

**Best for:** Full-page scrolling experiences with consistent behavior.

#### 🎯 Modular Container Approach

Each section has its own scroll container:

```svelte
{#each sections as section}
  <div bind:this={section.container} class="section-wrapper">
    <section><div use:scrollReveal={{ root: section.container }}></div></section>
  </div>
{/each}
```

**Best for:** Individual section scrolling (e.g., snap-scrolling layouts) or Svelte Components.

## � Installation

```bash
pnpm install
pnpm dev
```

## 📚 Templates

- [Parallax.svelte](src/lib/templates/Parallax.svelte:1) - Manual implementation
- [ActionParallax.svelte](src/lib/templates/ActionParallax.svelte:1) - Action-based implementation

## 🎯 Action Documentation

See [src/lib/actions/scrollReveal.ts](src/lib/actions/scrollReveal.ts:1) for full API details.

---

**Demo:** `http://localhost:5173/`