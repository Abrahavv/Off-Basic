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
  <section class="keys-section section-aliado" v-if="isAliado">
    <div class="container scroll-reveal slide-right" ref="revealRef">
      <div class="keys-header">
        <h2 class="section-title">El Baúl y Las Tres Llaves</h2>
        <p class="section-subtitle">
          Tu acceso exclusivo al pack de recursos, herramientas y sistemas que necesitas para dejar de improvisar y vender al nivel de los mejores.
        </p>
      </div>

      <div class="keys-layout">
        <!-- Left: Keys Stack -->
        <div class="keys-stack">
          <!-- Card 1: Llave Aliados (Available) -->
          <div class="key-card active-card">
            <div class="card-icon chrome-icon">
              <img src="/Llave Aliado.png" alt="Llave Aliados" class="main-key-image" />
            </div>
            <div class="card-info">
              <h4 class="key-main-title">LLAVE ALIADOS</h4>
              <ul class="key-benefits">
                <li><span>✓</span> Acceso al catálogo premium</li>
                <li><span>✓</span> Material de marketing exclusivo</li>
                <li><span>✓</span> Soporte prioritario de equipo</li>
              </ul>
            </div>
          </div>

          <!-- Card 2: Oro (Locked) -->
          <div class="key-card locked">
            <div class="card-icon gold-icon">
              <img src="/Llave Oro.png" alt="Llave Oro" class="main-key-image" />
            </div>
            <div class="card-info">
              <h4 class="key-main-title" style="margin-bottom: 0;">PRÓXIMAMENTE</h4>
            </div>
          </div>

          <!-- Card 3: Diamante (Locked) -->
          <div class="key-card locked">
            <div class="card-icon diamond-icon">
              <img src="/Llave Diamante.png" alt="Llave Diamante" class="main-key-image" />
            </div>
            <div class="card-info">
              <h4 class="key-main-title" style="margin-bottom: 0;">PRÓXIMAMENTE</h4>
            </div>
          </div>
        </div>

        <!-- Right: Opportunity Panel -->
        <div class="opportunity-panel">
          <div class="opportunity-glow"></div>
          <div class="opportunity-content">
            <h3 class="opportunity-title">Tu oportunidad de entrar al Baúl</h3>
            <p class="opportunity-desc">
              Cada llave desbloquea un nivel diferente de acceso, beneficios y márgenes de ganancia. 
              Elige tu camino y empieza a construir tu negocio hoy.
            </p>
            <div class="opportunity-badge">
              <span class="badge-icon">🔑</span>
              <span class="badge-text">Llave Aliados disponible ahora</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
.keys-section {
  padding: var(--section-padding);
  background-color: var(--bg-alt);
  color: var(--text);
  overflow: hidden;
}

.keys-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  margin-bottom: 1.5rem;
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
}

.keys-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
}

.keys-stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.key-card {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 2.5rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  transition: transform 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

@media (max-width: 700px) {
  .key-card {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
}

.key-card.active-card {
  border-color: var(--accent);
  box-shadow: 0 10px 50px rgba(0, 208, 255, 0.15);
  background: linear-gradient(145deg, var(--card-bg), rgba(0, 208, 255, 0.03));
}

.key-card.locked {
  opacity: 0.75;
  background: rgba(255, 255, 255, 0.02);
}

.card-icon {
  width: 160px;
  height: 160px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  flex-shrink: 0;
  position: relative;
}

.chrome-icon::before {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  background: var(--accent);
  filter: blur(60px);
  opacity: 0.2;
  border-radius: 50%;
}

.main-key-image {
  width: 140px;
  height: 140px;
  object-fit: contain;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gold-icon .main-key-image {
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
}

.diamond-icon .main-key-image {
  filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.3));
}

.active-card:hover .main-key-image {
  transform: scale(1.1) rotate(5deg);
}

.card-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.key-main-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text);
  letter-spacing: -0.5px;
}

@media (max-width: 700px) {
  .key-main-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
}



.key-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.key-benefits li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  font-size: 1.05rem;
}

@media (max-width: 700px) {
  .key-benefits li {
    justify-content: center;
  }
}

.key-benefits li span {
  color: var(--accent);
  font-weight: bold;
}

/* ===== OPPORTUNITY PANEL ===== */
.opportunity-panel {
  position: relative;
  padding: 3rem 2.5rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2);
}

.opportunity-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 180px;
  height: 180px;
  background: rgba(0, 208, 255, 0.15);
  filter: blur(80px);
  border-radius: 50%;
  pointer-events: none;
}

.opportunity-content {
  position: relative;
  z-index: 2;
}

.opportunity-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 1.25rem;
  color: var(--text);
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.opportunity-desc {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin-bottom: 2rem;
  font-weight: 300;
}

.opportunity-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(135deg, rgba(0, 208, 255, 0.15), rgba(0, 208, 255, 0.05));
  border: 1px solid rgba(0, 208, 255, 0.3);
  border-radius: 50px;
  animation: badgePulse 3s ease-in-out infinite;
}

.badge-icon {
  font-size: 1.3rem;
}

.badge-text {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--accent);
}

@keyframes badgePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 208, 255, 0.2); }
  50% { box-shadow: 0 0 20px 4px rgba(0, 208, 255, 0.15); }
}

@media (max-width: 900px) {
  .keys-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .opportunity-panel {
    padding: 2rem 1.5rem;
  }
}

</style>
