<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { WHATSAPP_NUMBER } from '../config.js';

const props = defineProps({ mode: String });
const emit = defineEmits(['switch-mode']);

const isAliado = computed(() => props.mode === 'aliado');

// --- TILT LOGIC ---
const tiltRef = ref(null);
const tiltBaulRef = ref(null);

const handleTilt = (e, el) => {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
  const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotX = (centerY - y) / 10;
  const rotY = (x - centerX) / 10;
  el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.05, 1.05, 1.05)`;
};

const resetTilt = (el) => {
  if (!el) return;
  el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
};

const handleMouseMove = (e) => handleTilt(e, isAliado.value ? tiltBaulRef.value : tiltRef.value);
const handleMouseLeave = () => resetTilt(isAliado.value ? tiltBaulRef.value : tiltRef.value);

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

    <!-- Pearl Background (Personal Mode) -->
    <div v-if="!isAliado" class="hero-bg-elements">
      <div class="pearl-gradient"></div>
    </div>

    <!-- Animated Rings -->
    <div class="hero-bg-hologram">
      <div class="cyber-ring-huge ring-huge-1"></div>
      <div class="cyber-ring-huge ring-huge-2"></div>
      <div class="cyber-ring-huge ring-huge-3"></div>
      <div class="arrow-container arrow-tr"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-br"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-bl"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-tl"><div class="tech-chevron"></div></div>
    </div>

    <!-- ========== PERSONAL MODE ========== -->
    <div v-if="!isAliado" class="container hero-inner mode-fade-in">
      <div 
        class="hero-logo-wrap" 
        @mousemove="handleMouseMove" 
        @mouseleave="handleMouseLeave"
        @touchstart="handleMouseMove"
        @touchmove="handleMouseMove"
        @touchend="handleMouseLeave"
      >
        <img 
          ref="tiltRef"
          src="/Off-Basic-Web-Cromado.png" 
          alt="Off Basic Logo" 
          class="hero-logo-img"
          loading="eager"
        />
      </div>

      <h1 class="hero-title">OFF BASIC</h1>
      <h2 class="hero-slogan">Fuera de lo básico</h2>
      <h2 class="hero-subtitle">Productos premium: rendimiento, estilo y eficiencia en uno.</h2>

      <div class="hero-actions">
        <button class="btn-primary" @click="scrollToProducts">Comprar</button>
        <button class="btn-secondary" @click="emit('switch-mode', 'aliado')">Aliado</button>
      </div>
    </div>

    <!-- ========== ALIADO MODE ========== -->
    <div v-if="isAliado" class="container hero-inner hero-aliado-inner mode-fade-in">
      <div 
        class="baul-visual baul-floating"
        @mousemove="handleMouseMove" 
        @mouseleave="handleMouseLeave"
        @touchstart="handleMouseMove"
        @touchmove="handleMouseMove"
        @touchend="handleMouseLeave"
      >
        <div class="cyber-glow"></div>
        <div class="baul-container">
          <img 
            ref="tiltBaulRef"
            src="/Baul-Off-Basic.png" 
            alt="El Baúl de Off Basic" 
            class="baul-img"
            loading="eager"
          />
        </div>
      </div>

      <div class="hero-tagline-wrap">
        <span class="mini-badge">LLAVE DE ENTRADA · DISPONIBLE AHORA</span>
      </div>

      <h1 class="hero-title">Baúl De Off Basic</h1>
      <h2 class="hero-subtitle">
        El inventario está protegido. Para ver los precios al mayor, necesitas la Llave.
      </h2>

      <div class="hero-actions">
        <button class="btn-primary" @click="scrollToProducts">ACCEDER</button>
      </div>

      <div class="hero-video-wrapper">
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

.hero-aliado::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 208, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 208, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
  mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%);
  pointer-events: none;
}

.hero-aliado {
  background: radial-gradient(ellipse at center, rgba(0, 208, 255, 0.05) 0%, var(--bg) 70%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

/* ===== PEARL BG (Personal) ===== */
.hero-bg-elements {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
  /* Premium filter to simulate chrome effect */
  filter: drop-shadow(0 8px 32px rgba(0, 208, 255, 0.35))
          contrast(1.05)
          brightness(1.05);
  animation: floatStatic 5s ease-in-out infinite;
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.baul-img {
  width: 250px;
  height: 250px;
  object-fit: contain;
  filter: drop-shadow(0 8px 32px rgba(0, 208, 255, 0.35))
          contrast(1.05)
          brightness(1.05);
  transition: transform 0.1s ease-out;
  will-change: transform;
}

@keyframes floatStatic {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

/* ===== TITLES ===== */
.hero-title {
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 0.1rem;
  line-height: 1.05;
}

.hero-inner:not(.hero-aliado-inner) .hero-title { color: #000; }
.hero-inner:not(.hero-aliado-inner) .hero-subtitle { color: #333; font-weight: 500; }
.hero-inner:not(.hero-aliado-inner) .hero-slogan {
  color: #00D0FF;
  font-size: clamp(2rem, 5vw, 2.5rem);
  margin: 0.5rem auto;
  font-weight: 800;
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
  min-width: 210px;
  color: #000;
  background: #00D0FF;
  box-shadow: 0 10px 22px rgba(0, 208, 255, 0.45);
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

.baul-img-container {
  width: auto;
  height: auto;
}

/* ===== GLOW ===== */
.cyber-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: rgba(0, 208, 255, 0.4);
  filter: blur(50px);
  z-index: 1;
  animation: glowBreathe 4s ease-in-out infinite alternate;
}

@keyframes glowBreathe {
  0%   { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); }
  100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
}

/* ===== ANIMATED RINGS — HIGH-END ONLY ===== */
.hero-bg-hologram {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  transform: translateZ(0);
}

.cyber-ring-huge {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(0, 208, 255, 0.15);
  opacity: 0;
}

.ring-huge-1 { border-top-color: rgba(0, 208, 255, 0.6);   animation: expandHugeRing 9s infinite 0s; }
.ring-huge-2 { border-bottom-color: rgba(0, 208, 255, 0.5); animation: expandHugeRing 9s infinite 3s; }
.ring-huge-3 { border-style: dashed;                         animation: expandHugeRing 9s infinite 6s; }

@keyframes expandHugeRing {
  0%   { width: 180px; height: 180px; opacity: 0.9; }
  100% { width: 160vmax; height: 160vmax; opacity: 0; }
}

/* ===== STATIC RINGS — LOW-END (no animation) ===== */
.hero-bg-hologram-static {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.static-ring-1,
.static-ring-2 {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(0, 208, 255, 0.08);
}

.static-ring-1 { width: 400px; height: 400px; }
.static-ring-2 { width: 700px; height: 700px; border-color: rgba(0, 208, 255, 0.05); }

/* ===== CHEVRONS ===== */
.tech-chevron {
  position: absolute;
  width: 25px; height: 25px;
  border-top: 4px solid rgba(0, 208, 255, 1);
  border-left: 4px solid rgba(0, 208, 255, 1);
  animation: shootChevron 6s infinite;
  will-change: transform, opacity;
}

@keyframes shootChevron {
  0%   { transform: translate(-50%, -120px) rotate(45deg) scale(0.5); opacity: 0; }
  20%  { opacity: 0.8; }
  80%  { opacity: 0.8; }
  100% { transform: translate(-50%, -120vmax) rotate(45deg) scale(1.5); opacity: 0; }
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

/* ===== ORBS ===== */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  opacity: 0.25;
}

/* Lighter blur on low-end */
.orb.orb-simple {
  filter: blur(40px) !important;
  opacity: 0.15 !important;
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
