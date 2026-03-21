<script setup>
import { computed } from 'vue';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');
</script>

<template>
  <section class="objectives-section" :class="{ 'section-aliado': isAliado }">
    <div class="container">
      <h2 class="section-title">Nuestra Filosofía.</h2>
      
      <div class="objectives-grid">
        <div class="objective-card" :class="{ 'card-aliado': isAliado }">
          <div class="obj-number">01</div>
          <h3 class="obj-title">Exclusividad</h3>
          <p class="obj-desc">
            Ofrecemos productos seleccionados bajo estrictos estándares de calidad. No vendemos de todo, vendemos lo mejor.
          </p>
        </div>
        
        <div class="objective-card" :class="{ 'card-aliado': isAliado }">
          <div class="obj-number">02</div>
          <h3 class="obj-title">Rendimiento</h3>
          <p class="obj-desc">
            Tecnología diseñada para aquellos que exigen más. Tu tiempo es valioso, tus dispositivos deben estar a tu nivel.
          </p>
        </div>

        <div class="objective-card" :class="{ 'card-aliado': isAliado }">
          <div class="obj-number">03</div>
          <h3 class="obj-title">Garantía Real</h3>
          <p class="obj-desc">
            Acompañamiento en cada paso. Desde la asesoría inicial hasta un servicio de post-venta sin complicaciones.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.objectives-section {
  padding: var(--section-padding);
  background-color: var(--bg-alt);
  transition: background-color var(--transition) ease;
}

.section-aliado {
  background-color: var(--bg);
}

.objectives-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.objective-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 2.5rem 2rem;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}

.objective-card:hover {
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

.obj-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.2;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-variant-numeric: tabular-nums;
}

.obj-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  color: var(--text);
}

.obj-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-muted);
  position: relative;
  z-index: 2;
  font-weight: 300;
}

@media (max-width: 900px) {
  .objectives-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
