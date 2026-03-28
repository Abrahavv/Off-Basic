<script setup>
import { useScrollReveal } from '../composables/useScrollReveal';
import { WHATSAPP_NUMBER } from '../config.js';

const whatsappNumber = WHATSAPP_NUMBER;

const getPostulacionUrl = () => {
  const msg = '¡Hola! Quiero postularme para ser Aliado oficial.';
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

const scrollToProducts = () => {
  const el = document.getElementById('productos');
  if (el) {
    const navbarHeight = 100; // Aligned with total scroll target for better proximity
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const revealRef = useScrollReveal();
</script>

<template>
  <section class="closing-section">
    <div class="container closing-inner scroll-reveal slide-left" ref="revealRef">
      <h2 class="baul-title">Conviértete en Portador</h2>
      <p class="closing-copy">
        No buscamos vendedores. Buscamos socios. 
        Evaluamos cada postulación para proteger la exclusividad de nuestra red.
      </p>
      <button @click="scrollToProducts" class="btn-primary closing-btn">
        Aliado
      </button>
    </div>
  </section>
</template>

<style scoped>
.closing-section {
  padding: var(--section-padding);
  background-color: var(--bg);
  text-align: center;
}

.closing-inner {
  max-width: 650px;
  margin: 0 auto;
}

.closing-copy {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  font-weight: 300;
}

.closing-btn {
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
}
</style>
