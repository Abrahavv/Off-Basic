<script setup>
import { useScrollReveal } from '../composables/useScrollReveal';

const benefits = [
  {
    id: '01',
    title: 'Precios al Mayor',
    description: 'Accede a márgenes exclusivos diseñados para maximizar la rentabilidad de tu negocio.',
    icon: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>` // Price Tag
  },
  {
    id: '02',
    title: 'Soporte Prioritario',
    description: 'Atención técnica y comercial de primer nivel con línea directa para aliados.',
    icon: `<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />` // Tech Shield
  },
  {
    id: '03',
    title: 'Red Exclusiva',
    description: 'Forma parte de un ecosistema de networking y formación continua para el éxito.',
    icon: `<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>` // Network
  },
  {
    id: '04',
    title: 'Material de Venta',
    description: 'Contenido visual de alta gama: fotografía y video profesional para tus canales.',
    icon: `<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />` // Tech Image
  }
];

const revealRef = useScrollReveal();
</script>

<template>
  <section class="benefits-section">
    <div class="background-glow"></div>
    <div class="container" ref="revealRef">
      <div class="section-header">
        <h2 class="section-title">¿Por qué ser Aliado?</h2>
        <p class="section-subtitle">Ecosistema diseñado para el alto rendimiento comercial.</p>
      </div>
      
      <div class="benefits-horizontal-grid">
        <div v-for="(benefit, index) in benefits" :key="benefit.id" class="benefit-card-compact" :style="{ '--delay': index * 0.15 + 's' }">
          <div class="card-inner">
            <div class="compact-icon-box">
              <svg viewBox="0 0 24 24" v-html="benefit.icon"></svg>
            </div>
            <div class="card-info-box">
              <h3 class="card-benefit-title">{{ benefit.title }}</h3>
              <p class="card-benefit-desc">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits-section {
  padding: var(--section-padding);
  background-color: var(--bg);
  position: relative;
  overflow: hidden;
}

/* Background floating glow */
.background-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(0, 208, 255, 0.05) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  filter: blur(80px);
  z-index: 1;
  animation: floatGlow 15s ease-in-out infinite;
}

@keyframes floatGlow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-45%, -55%) scale(1.2); }
}

.container {
  position: relative;
  z-index: 2;
}

.section-header {
  margin-bottom: 3.5rem;
}

.benefits-horizontal-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  max-width: 1300px;
  margin-inline: auto;
}

.benefit-card-compact {
  background: rgba(10, 10, 10, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(0, 208, 255, 0.15); /* PERMANENT BLUE BORDER */
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  opacity: 0;
  transform: translateX(100px); /* START FROM RIGHT */
}

/* Scroll reveal trigger */
.revealed .benefit-card-compact {
  opacity: 1;
  transform: translateX(0);
  transition-delay: var(--delay);
}

.benefit-card-compact:hover {
  transform: translateY(-8px);
  border-color: var(--accent);
  background: rgba(15, 15, 15, 0.8);
  box-shadow: 0 10px 30px rgba(0, 208, 255, 0.1);
}

.card-inner {
  padding: 2.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* STATIC BLUE ICON BOX */
.compact-icon-box {
  width: 56px;
  height: 56px;
  background: rgba(0, 208, 255, 0.1);
  border: 1px solid rgba(0, 208, 255, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
}

.benefit-card-compact:hover .compact-icon-box {
  background: var(--accent);
  color: var(--bg);
  box-shadow: 0 0 15px rgba(0, 208, 255, 0.3);
}

.compact-icon-box svg {
  width: 26px;
  height: 26px;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
}

.card-info-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-benefit-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
}

.card-benefit-desc {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-muted);
}

/* === Responsive === */
@media (max-width: 1200px) {
  .benefits-horizontal-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .benefits-horizontal-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1.5rem;
  }
  .benefit-card-compact { 
    transform: translateX(50px);
  }
}

@media (max-width: 480px) {
  .benefits-section {
    padding: 3rem 0;
  }
  .card-inner {
    padding: 1.5rem;
    gap: 1rem;
  }
  .card-benefit-title {
    font-size: 1.1rem;
  }
  .card-benefit-desc {
    font-size: 0.85rem;
  }
  .compact-icon-box {
    width: 46px;
    height: 46px;
  }
  .benefits-horizontal-grid {
    padding: 0 0.5rem;
  }
}
</style>
