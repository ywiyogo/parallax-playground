/**
 * Configuration options for the scrollReveal action
 * Controls when and how scroll-triggered animations are activated
 */
export interface ScrollRevealOptions {
  /** How much of the element must be visible to trigger (0-1). Default: 0.1 */
  threshold?: number;
  /** CSS margin around root element. Negative values expand detection area. '-100px' = detect 100px outside container. Default: '0px 0px -50px 0px' */
  rootMargin?: string;
  /** Scroll container element to watch for intersections. Default: null (uses viewport) */
  root?: Element | null;
}

/**
 * Svelte action that adds/removes CSS classes based on element visibility
 * Automatically handles Intersection Observer lifecycle and timing issues
 *
 * @param element The HTMLElement to apply scroll reveal to
 * @param options Configuration options for intersection behavior
 * @returns Svelte action with destroy and update methods
 */
export function scrollReveal(
  element: HTMLElement,
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    root = null
  } = options;

  let observer: IntersectionObserver | null = null;
  let currentRoot = root;

  function setVisible(visible: boolean) {
    if (visible) {
      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
    }
  }

  // Initialize visibility state
  setVisible(false);

  function createObserver() {
    // Disconnect previous observer if it exists
    if (observer) {
      observer.disconnect();
    }

    console.log(`📱 Creating observer for ${element.id || element.classList.toString()} with root:`, currentRoot);

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
          console.log(
            `👁️ ${element.id || element.classList.toString()}: ${
              entry.isIntersecting ? 'visible' : 'hidden'
            } (root: ${currentRoot})`
          );
        });
      },
      {
        threshold,
        root: currentRoot,
        rootMargin
      }
    );

    observer.observe(element);
  }

  // Create observer immediately if root is available, otherwise wait
  if (currentRoot) {
    createObserver();
  } else {
    console.log(`⏳ Waiting for root to be available: ${element.id || element.classList.toString()}`);
  }

  return {
    destroy() {
      if (observer) {
        observer.disconnect();
        console.log(`🏁 Destroyed observer for ${element.id || element.classList.toString()}`);
      }
    },
    update(newOptions: ScrollRevealOptions = {}) {
      const {
        threshold: newThreshold = threshold,
        rootMargin: newRootMargin = rootMargin,
        root: newRoot = root
      } = newOptions;

      // Check if root has changed
      const rootChanged = newRoot !== currentRoot;

      console.log(`🔄 Updating options for ${element.id || element.classList.toString()}: root changed:`, rootChanged);

      // Update current values
      currentRoot = newRoot;

      // Create new observer if root changed or observer doesn't exist yet
      if (rootChanged && currentRoot) {
        createObserver();
      } else if (!observer && currentRoot) {
        // Root became available after initialization
        createObserver();
      }
    }
  };
}