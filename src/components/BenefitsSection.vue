<script setup>
import { useScrollReveal } from '../composables/useScrollReveal';

const benefits = [
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Precios al Mayor',
    description: 'Accede a precios exclusivos con márgenes de ganancia atractivos para tu negocio.'
  },
  {
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    title: 'Soporte Prioritario',
    description: 'Línea directa de atención para aliados. Resolución rápida y trato personalizado.'
  },
  {
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    title: 'Red Exclusiva',
    description: 'Forma parte de una red selecta de aliados con acceso a recursos, formación y networking.'
  },
  {
    icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z',
    title: 'Material de Venta',
    description: 'Recibe contenido profesional: fotos, videos y textos listos para tus redes sociales.'
  }
];

const revealRef = useScrollReveal();
</script>

<template>
  <section class="benefits-section">
    <div class="container scroll-reveal slide-right" ref="revealRef">
      <h2 class="section-title">¿Por qué ser Aliado?</h2>
      <p class="section-subtitle">Beneficios diseñados para quienes quieren más que vender.</p>
      
      <div class="benefits-grid">
        <div v-for="(b, i) in benefits" :key="i" class="benefit-card">
          <div class="benefit-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="b.icon" />
            </svg>
          </div>
          <h3 class="benefit-title">{{ b.title }}</h3>
          <p class="benefit-desc">{{ b.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits-section {
  padding: var(--section-padding);
  background-color: var(--bg-alt);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.benefit-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px var(--shadow);
  border-color: rgba(0, 208, 255, 0.2);
}

.benefit-card:hover::before {
  transform: scaleX(1);
}

.benefit-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgba(0, 208, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: 1.25rem;
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-icon {
  background-color: var(--accent);
  color: var(--black);
  transform: scale(1.1);
}

.benefit-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.benefit-desc {
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
