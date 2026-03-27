<script setup>
import { computed } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');

const paymentLogos = [
  { name: 'Zelle', src: '/Zelle.png' },
  { name: 'PayPal', src: '/PayPal.png' },
  { name: 'Binance Pay', src: '/Binance-Pay.png' },
  { name: 'Zinli', src: '/Zinli.png' },
  { name: 'Pago Móvil', src: '/Pago-Movil.png' }
];

const revealRef = useScrollReveal();
</script>

<template>
  <section class="payment-section" :class="{ 'section-aliado': isAliado }">
    <div class="container scroll-reveal slide-right" ref="revealRef">
      <h2 class="section-title">Métodos de Pago</h2>
      <p class="payment-subtitle">Pago seguro con:</p>
      
      <div class="payment-grid">
        <div 
          v-for="method in paymentLogos" 
          :key="method.name" 
          class="payment-method" 
          :class="{ 'method-aliado': isAliado }"
        >
          <img :src="method.src" :alt="method.name" class="method-logo" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.payment-section {
  padding: var(--section-padding);
  background-color: var(--bg);
  transition: background-color var(--transition) ease;
  text-align: center;
}

.section-aliado {
  background-color: var(--bg-alt);
}

/* User requested small text matching the aesthetic */
.payment-subtitle {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
  margin-top: -0.5rem;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.payment-method {
  padding: 1.5rem;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, border-color 0.3s;
  min-height: 80px;
}

.payment-method:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 208, 255, 0.3);
}

.method-aliado {
  border-color: rgba(0, 208, 255, 0.1);
}

.method-aliado:hover {
  border-color: var(--accent);
}

.method-logo {
  max-width: 100px;
  max-height: 40px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.method-logo[alt="Pago Móvil"] {
  transform: scale(1.4);
}

@media (max-width: 768px) {
  .payment-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .payment-grid {
    grid-template-columns: 1fr;
  }
}
</style>
