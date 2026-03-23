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
  <section class="objectives-section" :class="{ 'section-aliado': isAliado }">
    <div class="container scroll-reveal slide-right" ref="revealRef">
      <h2 class="section-title" style="margin-bottom: 3.5rem;">
        {{ isAliado ? 'Nuestros objetivos' : 'Nuestra Esencia' }}
      </h2>
      
      <div class="objectives-grid" :class="{ 'aliado-grid': isAliado }">
        <!-- 01 Exclusividad -->
        <div class="objective-card" :class="{ 'card-aliado': isAliado }">
          <div class="obj-content">
            <div class="obj-icon">
              <!-- Diamond Icon -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 3L3 8L12 21L21 8L18 3H6Z" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 8H21" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 21L7 8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 21L17 8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3V21" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="obj-title">Exclusividad</h3>
            <p class="obj-desc">
              Seleccionamos solo lo mejor. Productos bajo estándares rigurosos de calidad y diseño único.
            </p>
          </div>
          <div class="obj-number">01</div>
        </div>
        
        <!-- 02 Rendimiento -->
        <div class="objective-card" :class="{ 'card-aliado': isAliado }">
          <div class="obj-content">
            <div class="obj-icon">
              <!-- Bolt Icon -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="obj-title">Rendimiento</h3>
            <p class="obj-desc">
              Tecnología para quienes no aceptan menos. Dispositivos que potencian cada segundo de tu tiempo.
            </p>
          </div>
          <div class="obj-number">02</div>
        </div>

        <!-- 03 Garantía Real -->
        <div class="objective-card" :class="{ 'card-aliado': isAliado }">
          <div class="obj-content">
            <div class="obj-icon">
              <!-- Shield Icon -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="obj-title">Garantía Real</h3>
            <p class="obj-desc">
              Post-venta sin esperas. Soporte directo para asegurar una experiencia sin complicaciones.
            </p>
          </div>
          <div class="obj-number">03</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.objectives-section {
  padding: var(--section-padding);
  background-color: var(--bg);
  transition: background-color var(--transition) ease;
  position: relative;
  overflow: hidden;
}

.section-aliado {
  background-color: var(--bg-alt);
}



.objectives-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  align-items: flex-start;
}

.aliado-grid {
  display: flex !important;
  flex-direction: column !important;
  gap: 3.5rem !important;
}

.aliado-grid .objective-card {
  width: 75%;
}

.aliado-grid .objective-card:nth-child(even) {
  align-self: flex-end;
}

.aliado-grid .objective-card:nth-child(even) .obj-number {
  left: -5px;
  right: auto;
}


.objective-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 3.5rem 2.5rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  z-index: 1;
}


.objective-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-aliado:hover {
  box-shadow: 0 20px 40px rgba(0, 208, 255, 0.1);
}

.obj-content {
  position: relative;
  z-index: 2;
}

.obj-icon {
  width: 48px;
  height: 48px;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.obj-icon svg {
  width: 100%;
  height: 100%;
}

.obj-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
  letter-spacing: -0.5px;
}

.obj-desc {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--text-muted);
  font-weight: 300;
}

.obj-number {
  position: absolute;
  top: -10px;
  right: -5px;
  font-size: 8rem;
  font-weight: 800;
  color: var(--accent);
  opacity: 0.08;
  line-height: 1;
  font-family: var(--font-display);
  z-index: 0;
  user-select: none;
  pointer-events: none;
}


@media (max-width: 900px) {
  .objectives-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .aliado-grid .objective-card {
    width: 100%;
  }
  .aliado-grid .objective-card:nth-child(even) {
    align-self: flex-start;
  }
  .aliado-grid .objective-card:nth-child(even) .obj-number {
    left: auto;
    right: -5px;
  }
  .objectives-section {
    padding: var(--section-padding);
  }
}
</style>
