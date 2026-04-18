<script setup>
import { computed, onMounted } from 'vue';
import { WHATSAPP_NUMBER } from '../config.js';

const props = defineProps({ mode: String });
const emit = defineEmits(['switch-mode']);

const isAliado = computed(() => props.mode === 'aliado');

const scrollToProducts = () => {
  const target = document.getElementById('baul-content') || document.getElementById('productos');
  if (target) {
    const nav = document.querySelector('.navbar-wrapper');
    const offset = nav ? nav.offsetHeight + 20 : 100;
    const pos = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: pos, behavior: 'smooth' });
  }
};
</script>

<template>
  <section class="hero" :class="{ 'hero-aliado': isAliado }">
    
    <!-- Futuristic Elements (Blue Arrows & Rings restored from f6f9a29) -->
    <div class="hero-bg-hologram">
      <div class="cyber-ring-huge ring-huge-1"></div>
      <div class="cyber-ring-huge ring-huge-2"></div>
      <div class="cyber-ring-huge ring-huge-3"></div>
      
      <!-- Blue Arrows (Tech Chevrons) -->
      <div class="arrow-container arrow-tr"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-br"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-bl"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-tl"><div class="tech-chevron"></div></div>
    </div>

    <!-- Pearl Background (Personal Mode) -->
    <div v-if="!isAliado" class="hero-bg-elements">
      <div class="pearl-gradient"></div>
    </div>

    <!-- ========== PERSONAL MODE ========== -->
    <div v-if="!isAliado" class="container hero-inner animate-in">
      <div class="hero-logo-wrap st-1">
        <div class="logo-floater-clean">
          <img 
            src="/Off-Basic-Web-Cromado.png" 
            alt="Off Basic Logo" 
            class="hero-logo-img"
            loading="eager"
          />
        </div>
      </div>

      <h1 class="hero-title st-2">
        <span class="shine-wrapper">OFF BASIC</span>
      </h1>
      <h2 class="hero-slogan st-3">Fuera de lo básico</h2>
      <h2 class="hero-subtitle st-4">Productos premium, rendimiento, estilo y eficiencia en uno.</h2>

      <div class="hero-actions st-5">
        <button class="btn-primary btn-shimmer" @click="scrollToProducts" aria-label="Ver productos y comprar ahora">Comprar Ahora</button>
        <button class="btn-secondary" @click="emit('switch-mode', 'aliado')" aria-label="Cambiar a modo Aliado para ventas al mayor">Modo Aliado</button>
      </div>
    </div>

    <!-- ========== ALIADO MODE ========== -->
    <div v-if="isAliado" class="container hero-inner hero-aliado-inner animate-in">
      <div class="baul-visual st-1">
        <div class="cyber-glow"></div>
        <div class="baul-container baul-floating">
          <img 
            src="/Baul-Off-Basic.png" 
            alt="El Baúl de Off Basic" 
            class="baul-img"
            loading="eager"
          />
        </div>
      </div>

      <h1 class="hero-title st-2">
        <span class="shine-wrapper">Baúl De Off Basic</span>
      </h1>

      <div class="hero-tagline-wrap st-3">
        <span class="mini-badge">LLAVE DE ENTRADA · DISPONIBLE AHORA</span>
      </div>

      <h2 class="hero-subtitle st-4">
        El inventario está protegido. Para ver los precios al mayor, necesitas la Llave de acceso.
      </h2>

      <div class="hero-actions st-5">
        <button class="btn-primary btn-shimmer" @click="scrollToProducts" aria-label="Acceder al catálogo de inversión del Baúl">ACCEDER AHORA</button>
      </div>

      <div class="hero-video-wrapper st-6">
        <iframe
          class="hero-video"
          src="https://www.youtube.com/embed/caAWn6xFWkI"
          title="Baúl de Off Basic"
          frameborder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- Decorative orbs -->
    <div class="orb orb-1" :class="{ 'orb-aliado': isAliado }"></div>
    <div class="orb orb-2" :class="{ 'orb-aliado': isAliado }"></div>
  </section>
</template>

<style scoped>
/* ===== HERO BASE ===== */
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 70px 0 10px;
  overflow: hidden;
  text-align: center;
  background-color: var(--bg);
  transition: background-color var(--transition) ease;
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

/* ===== ANIMATED RINGS & ARROWS (From commit f6f9a29) ===== */
.hero-bg-hologram {
  position: absolute;
  inset: 0;
  z-index: 5; /* Higher than Pearl BG and Orbs */
  pointer-events: none;
  overflow: hidden;
}

.cyber-ring-huge {
  position: absolute;
  top: 50%; left: 50%;
  width: 100vmax;
  height: 100vmax;
  border-radius: 50%;
  border: 1px solid rgba(0, 208, 255, 0.15);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.1);
  will-change: transform, opacity;
}

.ring-huge-1 { border-top-color: rgba(0, 208, 255, 0.6);   animation: expandHugeRing 9s infinite 0s; }
.ring-huge-2 { border-bottom-color: rgba(0, 208, 255, 0.5); animation: expandHugeRing 9s infinite 3s; }
.ring-huge-3 { border-style: dashed;                         animation: expandHugeRing 9s infinite 6s; }

@keyframes expandHugeRing {
  0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0.9; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}

@media (max-width: 768px) {
  @keyframes expandHugeRing {
    0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
  }
}

.tech-chevron {
  position: absolute;
  width: 25px; height: 25px;
  border-top: 4px solid rgba(0, 208, 255, 1);
  border-left: 4px solid rgba(0, 208, 255, 1);
  animation: shootChevron 6s infinite;
  will-change: transform, opacity;
  filter: drop-shadow(0 0 12px rgba(0, 208, 255, 0.6));
}

@keyframes shootChevron {
  0%   { transform: translate(-50%, -80px) rotate(45deg) scale(0.5); opacity: 0; }
  20%  { opacity: 0.8; }
  80%  { opacity: 0.8; }
  100% { transform: translate(-50%, -100vmax) rotate(45deg) scale(1.2); opacity: 0; }
}

@media (max-width: 768px) {
  @keyframes shootChevron {
    0%   { transform: translate(-50%, -40px) rotate(45deg) scale(0.5); opacity: 0; }
    50%  { opacity: 1; }
    100% { transform: translate(-50%, -80vh) rotate(45deg) scale(1.1); opacity: 0; }
  }
  .tech-chevron {
    width: 30px; height: 30px;
    border-width: 5px;
  }
}

.arrow-container {
  position: absolute;
  top: 50%; left: 50%;
  width: 0; height: 0;
  z-index: 3;
}
.arrow-tr { transform: rotate(45deg); }
.arrow-br { transform: rotate(135deg); }
.arrow-bl { transform: rotate(225deg); }
.arrow-tl { transform: rotate(315deg); }

/* ===== PEARL BG (Personal) ===== */
.hero-bg-elements {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.pearl-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 30%, #ffffff 0%, #f4f6fa 60%, #eef2f9 100%);
  opacity: 0.9;
}

/* ===== LOGO & BAUL IMAGES ===== */
.hero-logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  margin-top: 1.5rem;
}

.hero-logo-img {
  width: 260px;
  height: 260px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 208, 255, 0.15))
          contrast(1.05)
          brightness(1.05);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
  transform: translateZ(0);
}

.hero-logo-img.is-tilting {
  transition: none !important;
}

.logo-floater-clean {
  animation: floatStatic 5s ease-in-out infinite, logoPulse 4s ease-in-out infinite;
}

.baul-img {
  width: 250px;
  height: 250px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 208, 255, 0.15))
          contrast(1.05)
          brightness(1.05);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
  transform: translateZ(0);
}

.baul-img.is-tilting {
  transition: none !important;
}

@keyframes logoPulse {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(0, 208, 255, 0.12)) brightness(1.01); }
  50% { filter: drop-shadow(0 0 18px rgba(0, 208, 255, 0.25)) brightness(1.05); }
}

@keyframes floatStatic {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

/* ===== TITLES ===== */
.hero-title {
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -1.5px;
  margin-bottom: 0.1rem;
  line-height: 1.05;
}

.shine-wrapper {
  display: inline-block;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% auto;
  animation: textShine 4s linear infinite;
  /* Personal Shine: Black base with Blue beam */
  background-image: linear-gradient(
    120deg, 
    #000 0%, 
    #000 35%, 
    #00D0FF 48%, 
    #FFF 50%, 
    #00D0FF 52%, 
    #000 65%, 
    #000 100%
  );
}

.hero-aliado-inner .shine-wrapper {
  /* Aliado Shine: White base with Blue beam and gray center */
  background-image: linear-gradient(
    120deg,
    #fff 0%,
    #fff 35%,
    #00D0FF 48%,
    #444 50%,
    #00D0FF 52%,
    #fff 65%,
    #fff 100%
  );
  color: #fff;
}

.hero-inner:not(.hero-aliado-inner) .hero-subtitle { color: #121212; font-weight: 500; }
.hero-subtitle { color: #121212; font-weight: 500; }

@keyframes textShine {
  0% { background-position: 100% center; }
  100% { background-position: -200% center; }
}
.hero-slogan {
  color: #00D0FF;
  font-size: clamp(2rem, 5vw, 2.5rem);
  margin: 0.5rem auto;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(0, 208, 255, 0.3);
}

/* Staggered Cinematic Entrance - Speed optimized */
.animate-in .st-1 { animation: cinematicReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both 0.05s; }
.animate-in .st-2 { animation: cinematicReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both 0.1s; }
.animate-in .st-3 { animation: cinematicReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both 0.15s; }
.animate-in .st-4 { animation: cinematicReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both 0.2s; }
.animate-in .st-5 { animation: cinematicReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both 0.25s; }
.animate-in .st-6 { animation: cinematicReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both 0.3s; }

@keyframes cinematicReveal {
  from { 
    opacity: 0; 
    transform: translateY(15px) scale(0.98); 
    filter: blur(10px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
    filter: blur(0);
  }
}

.hero-tagline-wrap {
  margin: 2rem 0 1.2rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.mini-badge {
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.5rem 1.2rem;
  border: 1px solid #00D0FF;
  border-radius: 50px;
  background: rgba(0, 208, 255, 0.18);
  white-space: nowrap;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.hero-actions .btn-primary {
  position: relative;
  min-width: 210px;
  color: #000;
  background: #00D0FF;
  box-shadow: 0 10px 22px rgba(0, 208, 255, 0.45);
  overflow: hidden;
}

.btn-shimmer::after {
  content: "";
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transform: rotate(45deg);
  animation: shimmerLoop 3s infinite;
}

@keyframes shimmerLoop {
  0% { transform: translate(-100%, -100%) rotate(45deg); }
  100% { transform: translate(100%, 100%) rotate(45deg); }
}
.hero-actions .btn-secondary {
  border: 2px solid #00D0FF;
  color: #00D0FF;
  background: #fff;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #d8e9ff;
  font-weight: 400;
  max-width: 1000px;
  margin: 0.2rem auto 1rem;
  line-height: 1.35;
}

/* ===== VIDEO ===== */
.hero-video-wrapper {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.hero-video {
  width: 100%;
  max-width: 860px;
  height: 480px;
  border: 2px solid rgba(56, 139, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

/* ===== BAUL WRAPPER ===== */
.baul-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 3.5rem;
  z-index: 2;
}

.baul-floating {
  animation: floatPremium 6s ease-in-out infinite;
  will-change: transform;
}

@keyframes floatPremium {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-15px); }
}

.baul-container {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

/* ===== GLOW ===== */
.cyber-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: rgba(0, 208, 255, 0.1);
  filter: blur(35px);
  z-index: 1;
  animation: glowBreathe 4s ease-in-out infinite alternate;
}

@keyframes glowBreathe {
  0%   { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); }
  100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
}

/* ===== ORBS ===== */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  opacity: 0.25;
}

.orb-1 { width: 400px; height: 400px; background: rgba(0, 208, 255, 0.4); top: -120px; right: -120px; }
.orb-2 { width: 400px; height: 400px; background: rgba(0, 208, 255, 0.4); bottom: -120px; left: -120px; }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero { padding: 110px 0 40px; }
  .hero-logo-img { width: 200px; height: 200px; }
  .baul-img { width: 220px; height: 220px; }
  .baul-visual { margin-top: 3.5rem; margin-bottom: 0.5rem; }
  .hero-tagline-wrap { margin: 1.5rem 0 1rem; }
  .hero-video { height: 240px; }
  .orb-1 { width: 250px; height: 250px; top: -80px; right: -80px; }
  .orb-2 { width: 250px; height: 250px; bottom: -80px; left: -80px; }
}

@media (max-width: 480px) {
  .hero-logo-img { width: 180px; height: 180px; }
  .baul-img { width: 200px; height: 200px; }
  .baul-visual { margin-top: 2.5rem; }
  .hero-tagline-wrap { margin: 1.2rem 0 0.8rem; }
}
</style>
