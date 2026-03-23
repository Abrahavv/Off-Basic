<script setup>
import { computed } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');

const personalTestimonials = [
  { quote: 'La calidad superó mis expectativas. Por fin tecnología que cumple lo que promete.', author: 'Carlos R.' },
  { quote: 'El dock cambió mi escritorio. Todo ordenado y sin cables. 100% recomendado.', author: 'Ana M.' },
  { quote: 'Los audífonos son otro nivel. Cancelación de ruido real para concentrarme al máximo.', author: 'Diego L.' }
];

const aliadoTestimonials = [
  { quote: 'Gané la Llave y mis ventas se dispararon. El margen de ganancia es el mejor del mercado.', author: 'Carlos R.' },
  { quote: 'Excelente soporte. Los pedidos al mayor llegan rápido y el material de venta ayuda mucho.', author: 'Ana M.' },
  { quote: 'El stock protegido asegura que solo los aliados competimos con ventajas reales. 100% recomendado.', author: 'Diego L.' }
];

const activeTestimonials = computed(() => isAliado.value ? aliadoTestimonials : personalTestimonials);

const revealRef = useScrollReveal();
</script>

<template>
  <section class="testimonials-section" :class="{ 'section-aliado': isAliado }">
    <div class="container scroll-reveal slide-left" ref="revealRef">
      <h2 class="section-title">{{ isAliado ? 'Ellos ya viven Fuera de lo básico' : 'Ellos ya viven Fuera de lo básico' }}</h2>
      
      <div class="testimonials-grid">
        <div v-for="(t, i) in activeTestimonials" :key="i" class="testimonial-card" :class="{ 'card-aliado': isAliado }">
          <div class="testimonial-stars">
            <svg v-for="star in 5" :key="star" class="star-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <p class="quote-text">{{ t.quote }}</p>
          <div class="author">
            <div class="author-avatar">{{ t.author.charAt(0) }}</div>
            <span class="author-name">{{ t.author }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  padding: var(--section-padding);
  background-color: var(--bg);
  transition: background-color var(--transition) ease;
}

.section-aliado {
  background-color: var(--bg-alt);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px var(--shadow);
  border-color: rgba(0, 208, 255, 0.2);
}

.card-aliado {
  border-color: rgba(0, 208, 255, 0.1);
}

.card-aliado:hover {
  border-color: var(--accent);
  box-shadow: 0 0 30px rgba(0, 208, 255, 0.15);
}

.testimonial-stars {
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1.25rem;
  color: var(--accent);
}

.star-icon {
  width: 18px;
  height: 18px;
}

.quote-text {
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 1.5rem;
  font-weight: 300;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent);
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
}

.author-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
}

@media (max-width: 900px) {
  .testimonials-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
