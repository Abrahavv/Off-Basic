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
  <section class="baul-explainer section-aliado" v-if="isAliado">
    <div class="container scroll-reveal slide-right" ref="revealRef">
      <div class="explainer-content">

        <!-- Text Content -->
        <div class="explainer-text">
          <h2 class="explainer-title">¿Qué es el Baúl de Off Basic?</h2>
          <p class="explainer-desc">
            El Baúl es tu centro de operaciones. Un sistema exclusivo donde obtienes productos, 
            herramientas y estrategias listas para vender desde el día uno. Sin inventario, sin riesgo, 
            sin complicaciones.
          </p>

          <div class="explainer-steps">
            <div class="step-item">
              <span class="step-number">1</span>
              <span class="step-text">Entras al Baúl</span>
            </div>
            <div class="step-item">
              <span class="step-number">2</span>
              <span class="step-text">Obtienes todo para vender</span>
            </div>
            <div class="step-item">
              <span class="step-number">3</span>
              <span class="step-text">Lo aplicas. Inmediatamente</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.baul-explainer {
  padding: var(--section-padding);
  padding-top: 7rem; /* Extra top space for baúl section */
  background-color: var(--bg);
  color: var(--text);
  overflow: hidden;
}

.explainer-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* ===== TEXT CONTENT ===== */
.explainer-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  align-items: center;
}

.explainer-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.15;
  color: var(--text);
}

.explainer-desc {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-muted);
  font-weight: 300;
}

.explainer-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
  width: 100%;
  max-width: 500px;
}

.step-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding: 1rem 1.75rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 14px;
  transition: border-color 0.3s ease, transform 0.3s ease;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  opacity: 0;
  transform: translateX(50px);
}

.revealed .step-item {
  animation: slideInProgressive 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.step-item:nth-child(1) { animation-delay: 0.1s; }
.step-item:nth-child(2) { animation-delay: 0.35s; }
.step-item:nth-child(3) { animation-delay: 0.6s; }

@keyframes slideInProgressive {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}


.step-item:hover {
  border-color: var(--accent);
  transform: translateX(5px) scale(1.02);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), rgba(0, 208, 255, 0.6));
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 208, 255, 0.3);
}

.step-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
}

/* ===== VIDEO SIDE ===== */
.explainer-video {
  position: relative;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid var(--card-border);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 
              0 0 40px rgba(0, 208, 255, 0.08);
  background: #000;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .explainer-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .explainer-text {
    order: 1;
  }

  .explainer-video {
    order: 2;
  }

  .step-item {
    padding: 0.85rem 1rem;
    transform: translateX(40px); /* Start from right on mobile */
  }

  /* Shared animation name works for both now as they both start from right */
  .revealed .step-item {
    animation-name: slideInProgressive;
  }

  .step-number {
    width: 34px;
    height: 34px;
    font-size: 1rem;
  }
}
</style>
