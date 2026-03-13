<script setup>
import { computed } from 'vue';

const props = defineProps({
  mode: String
});

const isVip = computed(() => props.mode === 'afiliado');
</script>

<template>
  <section class="hero animate-fade-in" :class="{ 'vip-hero': isVip }">
    <!-- MODO MERCADO HERO -->
    <div v-if="!isVip" class="container hero-content">
      <h1 class="hero-title">
        La Nueva Era del <span class="text-accent">E-Commerce</span>
      </h1>
      <p class="hero-subtitle">
        Diseñado para la excelencia. Descubre nuestros productos premium y lleva tu negocio al siguiente nivel con una experiencia de usuario inigualable.
      </p>
      <div class="hero-actions">
        <a href="#productos" class="btn-primary">Explorar Productos</a>
        <a href="#objetivos" class="btn-secondary">Conoce Más</a>
      </div>
    </div>
    
    <!-- MODO VIP AFILIADO HERO -->
    <div v-else class="container hero-content vip-content">
      <div class="vip-badge">ACCESO EXCLUSIVO</div>
      <h1 class="hero-title vip-title premium-gradient-text">
        Únete a la Élite <span class="text-accent">Afiliada</span>
      </h1>
      <p class="hero-subtitle vip-subtitle">
        Comisiones extraordinarias, networking de alto nivel y recursos privados diseñados únicamente para los top performers.
      </p>
      <div class="hero-actions">
        <a href="#productos" class="btn-primary vip-btn">Ver Catálogo VIP</a>
        <a href="#quien-soy" class="btn-secondary vip-btn-secondary">Aplicar Hoy</a>
      </div>
    </div>
    
    <!-- Decorative Elements -->
    <div class="glow-orb primary-orb" :class="{ 'vip-orb-1': isVip }"></div>
    <div class="glow-orb secondary-orb" :class="{ 'vip-orb-2': isVip }"></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0 60px;
  overflow: hidden;
  text-align: center;
  transition: all var(--transition-speed) ease;
}

.vip-hero {
  background: radial-gradient(circle at center, rgba(0, 208, 255, 0.05) 0%, var(--bg-color) 70%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  transition: color 0.3s;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.35rem);
  color: var(--text-color-muted);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-secondary {
  display: inline-block;
  background-color: transparent;
  color: var(--text-color);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--card-border);
  transition: all var(--transition-speed);
  font-size: 1rem;
}

.btn-secondary:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  background-color: rgba(0, 208, 255, 0.05);
}

/* VIP Mode Styles */
.vip-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(0, 208, 255, 0.1);
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  animation: vipGlow 3s infinite;
}

.vip-title {
  animation: vipTextGlow 4s infinite;
}

.vip-btn {
  box-shadow: 0 0 15px rgba(0, 208, 255, 0.4);
}

.vip-btn:hover {
  box-shadow: 0 0 25px rgba(0, 208, 255, 0.8);
}

.vip-btn-secondary {
  border-color: rgba(255, 255, 255, 0.3);
}

.vip-btn-secondary:hover {
  border-color: #fff;
  color: #fff;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 1;
  opacity: 0.5;
  pointer-events: none;
  transition: all 1s ease;
}

.primary-orb {
  width: 400px;
  height: 400px;
  background: var(--accent-color);
  top: -100px;
  right: -100px;
  opacity: 0.15;
}

.secondary-orb {
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  bottom: -50px;
  left: -100px;
}

.vip-orb-1 {
  background: var(--accent-color);
  opacity: 0.3;
  width: 500px;
  height: 500px;
  animation: primaryBreathing 8s infinite alternate;
}

.vip-orb-2 {
  background: rgba(0, 208, 255, 0.2);
  width: 400px;
  height: 400px;
  animation: secondaryBreathing 10s infinite alternate;
}

@keyframes primaryBreathing {
  0% { transform: scale(1) translate(0, 0); opacity: 0.15; }
  100% { transform: scale(1.2) translate(-50px, 50px); opacity: 0.3; }
}

@keyframes secondaryBreathing {
  0% { transform: scale(1) translate(0, 0); opacity: 0.1; }
  100% { transform: scale(1.3) translate(50px, -50px); opacity: 0.25; }
}
</style>
