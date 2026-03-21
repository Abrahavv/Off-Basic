<script setup>
import { computed } from 'vue';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');
</script>

<template>
  <section class="founder-section" :class="{ 'section-aliado': isAliado }">
    <div class="container">
      <h2 class="section-title">Detrás de Off Basic.</h2>
      
      <div class="founder-grid">
        <div class="founder-image-wrap">
          <div class="founder-image-container">
            <img src="/founder.svg" alt="Fundador de Off Basic" class="founder-img" />
          </div>
          <div class="accent-line"></div>
        </div>
        
        <div class="founder-content">
          <p class="founder-copy">
            Entiendo la necesidad de tecnología que no solo funcione, sino que eleve tu estándar. 
            Fundé Off Basic con una misión clara: traer la mejor tecnología premium, probada y garantizada, 
            sin complicaciones.
          </p>
          <p class="founder-copy highlight">
            Mi compromiso es contigo.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.founder-section {
  padding: var(--section-padding);
  background-color: var(--bg-alt);
  transition: background-color var(--transition) ease;
}

.section-aliado {
  background-color: var(--bg);
}

.founder-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 2rem;
}

.founder-image-wrap {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.founder-image-container {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: var(--radius);
  overflow: hidden;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: 0 20px 40px var(--shadow);
  position: relative;
  z-index: 2;
}

.founder-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.accent-line {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--accent);
  border-radius: var(--radius);
  z-index: 1;
  transition: transform 0.3s ease;
}

.founder-image-wrap:hover .accent-line {
  transform: translate(-8px, -8px);
}

.founder-copy {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  font-weight: 300;
}

.founder-copy.highlight {
  color: var(--text);
  font-weight: 700;
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .founder-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .founder-image-wrap {
    max-width: 300px;
  }
}
</style>
