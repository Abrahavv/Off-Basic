<script setup>
import { computed } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');
const revealRef = useScrollReveal();

const bonuses = [
  {
    title: 'Guías de los Productos',
    description: 'Material visual y especificaciones detalladas para que sepas exactamente qué vendes y generes la máxima confianza.',
    icon: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`
  },
  {
    title: 'Soporte 24/7',
    description: 'Atención prioritaria y dedicada para resolver tus dudas y cualquier incidencia en tu proceso comercial de inmediato.',
    icon: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`
  },
  {
    title: 'Acompañamiento',
    description: 'Asesoría constante para optimizar tus canales, diseñar tus estrategias de venta y lograr resultados desde el primer día.',
    icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`
  }
];
</script>

<template>
  <section class="bonus-section section-aliado" v-if="isAliado">
    <div class="container scroll-reveal slide-up" ref="revealRef">
      <div class="section-header text-center">
        <h2 class="section-title">Bonus Exclusivos Incluidos Ahora</h2>
        <p class="section-subtitle">Estos bonus no estarán siempre disponibles — y son tuyos sin coste extra.</p>
      </div>
      
      <div class="bonus-grid">
        <div v-for="(bonus, index) in bonuses" :key="index" class="bonus-card">
          <div class="bonus-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="bonus.icon"></svg>
          </div>
          <h3 class="bonus-title">{{ bonus.title }}</h3>
          <p class="bonus-desc">{{ bonus.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bonus-section {
  padding: var(--section-padding);
  background-color: var(--bg-alt);
  position: relative;
  overflow: hidden;
}

.section-header {
  margin-bottom: 4rem;
}

.section-title {
  color: var(--text);
  font-size: clamp(2rem, 5vw, 3rem);
}

.section-subtitle {
  color: #00D0FF;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  max-width: 600px;
  margin: 0 auto;
}

.bonus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.bonus-card {
  background: var(--card-bg);
  border: 1px solid rgba(0, 208, 255, 0.15);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.bonus-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bonus-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 208, 255, 0.1);
  border-color: rgba(0, 208, 255, 0.3);
}

.bonus-card:hover::before {
  opacity: 1;
}

.bonus-icon {
  width: 72px;
  height: 72px;
  background: rgba(0, 208, 255, 0.1);
  color: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.bonus-card:hover .bonus-icon {
  background: var(--accent);
  color: var(--bg);
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 0 20px rgba(0, 208, 255, 0.4);
}

.bonus-icon svg {
  width: 34px;
  height: 34px;
}

.bonus-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.bonus-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .bonus-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-inline: auto;
  }
}

@media (max-width: 480px) {
  .bonus-section {
    padding: 3.5rem 1rem;
  }
  .bonus-card {
    padding: 2.5rem 1.5rem;
  }
  .section-subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }
  .bonus-title {
    font-size: 1.25rem;
  }
}
</style>
