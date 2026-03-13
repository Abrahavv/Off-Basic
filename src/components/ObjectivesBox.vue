<script setup>
const objectives = [
  {
    title: 'Innovación Constante',
    description: 'Buscamos siempre las últimas tendencias y tecnologías para asegurar que nuestros productos te mantengan un paso por delante de la competencia.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Experiencia Fluida',
    description: 'Diseñamos cada interacción centrada en el usuario, optimizando las conversiones a través de una interfaz limpia, rápida y profesional.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  {
    title: 'Crecimiento Mutuo',
    description: 'Tu éxito es nuestro éxito. Ya sea en Modo Mercado o Afiliado, ofrecemos herramientas creadas específicamente para escalar tus ingresos.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  }
];
</script>

<template>
  <section id="objetivos" class="objectives-section">
    <div class="container">
      <h2 class="section-title">Nuestros Objetivos</h2>
      
      <div class="objectives-grid">
        <div 
          v-for="(obj, index) in objectives" 
          :key="index"
          class="objective-card"
        >
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="obj-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="obj.icon" />
            </svg>
          </div>
          <h3 class="obj-title">{{ obj.title }}</h3>
          <p class="obj-desc">{{ obj.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.objectives-section {
  padding: var(--section-padding);
}

.objectives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.objective-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  padding: 3rem 2rem;
  text-align: center;
  transition: all var(--transition-speed);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.objective-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.objective-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px var(--shadow-color);
  border-color: rgba(0, 208, 255, 0.3);
}

.objective-card:hover::before {
  transform: scaleX(1);
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  background-color: rgba(0, 208, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--accent-color);
  transition: transform 0.3s ease;
}

.objective-card:hover .icon-wrapper {
  transform: scale(1.1);
  background-color: var(--accent-color);
  color: #000;
}

.obj-icon {
  width: 32px;
  height: 32px;
}

.obj-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.obj-desc {
  font-size: 1rem;
  color: var(--text-color-muted);
  line-height: 1.6;
}
</style>
