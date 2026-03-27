import { ref, watch, onUnmounted } from 'vue';

export function useScrollReveal(options = { threshold: 0.01, rootMargin: '0px 0px 0px 0px' }) {
  const revealRef = ref(null);
  let observer = null;
  
  watch(revealRef, (el) => {
    if (el) {
      if (!observer) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              if (observer) observer.unobserve(entry.target);
            }
          });
        }, options);
      }
      observer.observe(el);
    }
  }, { immediate: true, flush: 'post' });

  onUnmounted(() => {
    if (observer) {
      if (revealRef.value) {
        observer.unobserve(revealRef.value);
      }
      observer.disconnect();
    }
  });

  return revealRef;
}
