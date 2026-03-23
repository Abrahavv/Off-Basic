<script setup>
import { computed } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');
const revealRef = useScrollReveal();
</script>

<template>
  <section class="comparison-section section-aliado" v-if="isAliado">
    <div class="container comparison-wrapper scroll-reveal slide-right" ref="revealRef">
      <!-- Left side: Comparison Cards -->
      <div class="comparison-cards">
        <div class="card-negative">
          <div class="card-header"><span class="icon">✖</span> Modelo Tradicional</div>
          <ul class="comparison-list negative-list">
            <li>Altos costos iniciales</li>
            <li>Riesgo de inventario</li>
            <li>Envíos lentos y costosos</li>
            <li>Soporte deficiente</li>
            <li>Márgenes bajos</li>
          </ul>
        </div>
        <div class="card-positive">
          <div class="card-header"><span class="icon">✓</span> Con Off Basic</div>
          <ul class="comparison-list positive-list">
            <li>Cero inversión inicial</li>
            <li>Sin riesgo de stock</li>
            <li>Logística optimizada</li>
            <li>Soporte y acompañamiento</li>
            <li>Altas comisiones</li>
          </ul>
        </div>
      </div>

      <!-- Right side: Features -->
      <div class="comparison-info">
        <h2 class="comparison-title">Qué cambia al convertirse en Aliado</h2>
        
        <div class="feature-item">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="feature-text">
            <h3>Vendes más rápido</h3>
            <p>Con nuestra plataforma, cada proceso fluye. Menos tiempo buscando productos, más tiempo vendiendo.</p>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="feature-text">
            <h3>Dejas de improvisar</h3>
            <p>Tienes un sistema estandarizado. Sabes exactamente qué hacer en cada fase del proceso de venta.</p>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="feature-text">
            <h3>Resultados Profesionales</h3>
            <p>La diferencia entre un vendedor amateur y uno superior es el respaldo y las herramientas a su disposición.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comparison-section {
  padding: var(--section-padding);
  background-color: var(--bg-alt);
  color: var(--text);
  overflow: hidden;
}

.comparison-wrapper {
  display: flex;
  flex-direction: column-reverse;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 900px) {
  .comparison-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.comparison-cards {
  display: flex;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
}

@media (max-width: 600px) {
  .comparison-cards {
    flex-direction: column;
  }
}

.card-negative, .card-positive {
  flex: 1;
  padding: 2.5rem 2rem;
}

.card-negative {
  position: relative;
}

.card-negative::after {
  content: "VS";
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  background: var(--card-bg);
  color: var(--text-muted);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid var(--card-border);
  z-index: 10;
}

@media (max-width: 600px) {
  .card-negative::after {
    top: auto;
    bottom: -15px;
    right: 50%;
    transform: translateX(50%);
  }
}

.card-positive {
  background: rgba(0, 208, 255, 0.05);
}

.card-header {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-negative .card-header .icon {
  color: #ff4d4d;
}

.card-positive .card-header .icon {
  color: var(--accent);
}

.comparison-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comparison-list li {
  font-size: 0.95rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  line-height: 1.4;
}

.negative-list li {
  color: var(--text-muted);
}
.negative-list li::before {
  content: "×";
  color: #ff4d4d;
  font-weight: bold;
}

.positive-list li {
  color: var(--text);
  font-weight: 500;
}
.positive-list li::before {
  content: "✓";
  color: var(--accent);
  font-weight: bold;
}

.comparison-info {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.comparison-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 1rem;
  color: var(--text);
}

.feature-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.feature-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  background: rgba(0, 208, 255, 0.1);
  color: var(--accent);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon svg {
  width: 24px;
  height: 24px;
}

.feature-text h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.feature-text p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>
