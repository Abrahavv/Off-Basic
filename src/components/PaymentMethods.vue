<script setup>
import { computed } from 'vue';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');
</script>

<template>
  <section class="payment-section" :class="{ 'section-aliado': isAliado }">
    <div class="container">
      <h2 class="section-title">Métodos de Pago.</h2>
      
      <div class="payment-grid">
        <div class="payment-method" :class="{ 'method-aliado': isAliado }">
          <span class="method-name">Zelle</span>
        </div>
        <div class="payment-method" :class="{ 'method-aliado': isAliado }">
          <span class="method-name">Binance Pay</span>
        </div>
        <div class="payment-method" :class="{ 'method-aliado': isAliado }">
          <span class="method-name">Pago Móvil</span>
        </div>
        <div class="payment-method" :class="{ 'method-aliado': isAliado }">
          <span class="method-name">Efectivo ($/€)</span>
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

.payment-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
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

.method-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text);
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
