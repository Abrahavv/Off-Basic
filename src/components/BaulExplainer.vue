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
    <div class="container scroll-reveal slide-left" ref="revealRef">
      <div class="explainer-grid">

        <!-- Left: Text -->
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

        <!-- Right: YouTube Video -->
        <div class="explainer-video">
          <div class="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="¿Qué es el Baúl de Off Basic?"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.baul-explainer {
  padding: var(--section-padding);
  background-color: var(--bg);
  color: var(--text);
  overflow: hidden;
}

.explainer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
}

/* ===== TEXT SIDE ===== */
.explainer-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
}

.step-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 14px;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.step-item:hover {
  border-color: var(--accent);
  transform: translateX(6px);
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
  }

  .step-number {
    width: 34px;
    height: 34px;
    font-size: 1rem;
  }
}
</style>
