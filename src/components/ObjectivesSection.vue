<script setup>
import { computed } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const objectives = [
  {
    id: '01',
    title: 'Exclusividad',
    description: 'Seleccionamos solo lo mejor. Productos bajo estándares rigurosos de calidad y diseño único.',
    icon: `<path d="M6 3L3 8L12 21L21 8L18 3H6Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 8H21" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 21L7 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 21L17 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 3V21" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    id: '02',
    title: 'Rendimiento',
    description: 'Tecnología para quienes no aceptan menos. Dispositivos que potencian cada segundo de tu tiempo.',
    icon: `<path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    id: '03',
    title: 'Garantía Real',
    description: 'Post-venta sin esperas. Soporte directo para asegurar una experiencia sin complicaciones.',
    icon: `<path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12L11 14L15 10" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    id: '04',
    title: 'Crecimiento Aliado',
    description: 'Escalamos juntos. Networking y formación continua para el éxito de tus canales comerciales.',
    icon: `<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M22 12h-2"/><path d="M4 12H2"/><path d="M19.07 4.93l-1.41 1.41"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 19.07l-1.41-1.41"/><path d="M6.34 6.34L4.93 4.93"/>`
  }
];

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');
const revealRef = useScrollReveal();
</script>

<template>
  <section class="objectives-section" :class="{ 'section-aliado': isAliado }">
    <div class="container scroll-reveal slide-right" ref="revealRef">
      <h2 class="section-title" style="margin-bottom: 3.5rem;">
        {{ isAliado ? 'Nuestros objetivos' : 'Nuestra Esencia' }}
      </h2>
           <div class="slide-objectives-list">
        <div v-for="(obj, index) in objectives" :key="obj.id" class="slide-objective-row" :class="{ 'reverse': index % 2 === 1 }" :style="{ '--delay': index * 0.15 + 's' }">
          
          <!-- Diamond Index -->
          <div class="diamond-index-wrapper">
            <div class="diamond-shape">
              <span class="diamond-number">{{ obj.id }}</span>
            </div>
            <div class="diamond-line" v-if="index < objectives.length - 1"></div>
          </div>

          <!-- Content Bar (Slide Style) -->
          <div class="objective-slide-bar">
            <div class="bar-glow"></div>
            <div class="bar-content">
              <div class="text-content">
                <h3 class="bar-title">{{ obj.title }}</h3>
                <p class="bar-description">{{ obj.description }}</p>
              </div>
              <div class="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-html="obj.icon"></svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.objectives-section {
  padding: 4rem 2rem;
  background-color: var(--bg);
  position: relative;
  overflow: hidden;
}

.slide-objectives-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.slide-objective-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: slideInBar 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay);
}

.slide-objective-row.reverse {
  flex-direction: row-reverse;
  animation: slideInBarReverse 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay);
}

@keyframes slideInBar {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInBarReverse {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

/* === Diamond Index Style === */
.diamond-index-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.diamond-shape {
  width: 70px;
  height: 70px;
  background: var(--accent);
  border: 2px solid var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(0, 208, 255, 0.5);
  transition: all 0.3s ease;
}

.diamond-number {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--bg);
}

.diamond-line {
  position: absolute;
  top: 60px;
  width: 2px;
  height: 30px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  opacity: 0.3;
}

.slide-objective-row:hover .diamond-shape {
  transform: scale(1.1);
  background: var(--accent);
}

.slide-objective-row.reverse .diamond-line {
  display: none;
}

/* === Slide Bar Style === */
.objective-slide-bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  border: none;
  border-radius: 40px;
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
}

.objective-slide-bar:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(0, 208, 255, 0.2);
  transform: translateX(10px);
}

.bar-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 208, 255, 0.05), transparent);
  transform: translateX(-100%);
  transition: transform 0.8s ease;
}

.objective-slide-bar:hover .bar-glow {
  transform: translateX(100%);
}

.bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 2;
  position: relative;
}

.text-content {
  flex: 1;
}

.bar-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.25rem;
  letter-spacing: -0.5px;
}

.bar-description {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.3;
  font-weight: 300;
}

/* === Icon Circle === */
.icon-circle {
  width: 50px;
  height: 50px;
  background: rgba(0, 208, 255, 0.1);
  border: 1px solid rgba(0, 208, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

/* === Symmetric Reversal Rules === */
.slide-objective-row.reverse .objective-slide-bar {
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
}

.slide-objective-row.reverse .bar-content {
  flex-direction: row-reverse;
}

.slide-objective-row.reverse .text-content {
  text-align: right;
}

.objective-slide-bar:hover .icon-circle {
  background: var(--accent);
  color: var(--bg);
  transform: rotate(12deg) scale(1.05);
  box-shadow: 0 0 20px rgba(0, 208, 255, 0.4);
}

.icon-circle svg {
  width: 24px;
  height: 24px;
}

/* === Responsive === */
@media (max-width: 900px) {
  .slide-objective-row {
    gap: 1rem;
  }
  .diamond-shape {
    width: 60px;
    height: 60px;
  }
  .diamond-number {
    font-size: 1.4rem;
  }
  .objective-slide-bar {
    padding-left: 1.5rem;
  }
  .bar-title {
    font-size: 1rem;
  }
  .bar-description {
    font-size: 0.8rem;
  }
  .icon-circle {
    width: 40px;
    height: 40px;
  }
  .icon-circle svg {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 600px) {
  .slide-objective-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .slide-objective-row.reverse {
    flex-direction: column;
    align-items: flex-end;
  }
  .diamond-line {
    display: none;
  }
  .objective-slide-bar,
  .slide-objective-row.reverse .objective-slide-bar {
    width: 100%;
    padding: 1.5rem;
    border-radius: 20px;
  }
  .bar-content,
  .slide-objective-row.reverse .bar-content {
    flex-direction: row;
  }
  .slide-objective-row.reverse .text-content {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .objectives-section {
    padding: 2.5rem 1rem;
  }
  .diamond-shape {
    width: 48px;
    height: 48px;
  }
  .diamond-number {
    font-size: 1.1rem;
  }
  .slide-objective-row {
    gap: 0.75rem;
  }
  .objective-slide-bar {
    padding: 1rem;
    border-radius: 16px;
  }
  .bar-title {
    font-size: 0.95rem;
  }
  .bar-description {
    font-size: 0.75rem;
    line-height: 1.35;
  }
  .icon-circle {
    width: 36px;
    height: 36px;
  }
  .icon-circle svg {
    width: 18px;
    height: 18px;
  }
}
</style>
