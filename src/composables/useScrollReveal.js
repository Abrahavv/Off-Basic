import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }) {
  const revealRef = ref(null);
  
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (revealRef.value) {
      observer.observe(revealRef.value);
    }

    onUnmounted(() => {
      if (revealRef.value) {
        observer.unobserve(revealRef.value);
      }
    });
  });

  return revealRef;
}
