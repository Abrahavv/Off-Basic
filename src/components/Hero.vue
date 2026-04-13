<script setup>
import { computed, ref, onMounted } from 'vue';
import { useDeviceCapability } from '../composables/useDeviceCapability.js';
import { WHATSAPP_NUMBER } from '../config.js';

const props = defineProps({ mode: String });
const emit = defineEmits(['switch-mode']);

const isAliado = computed(() => props.mode === 'aliado');
const whatsappNumber = WHATSAPP_NUMBER;

// Device capability detection
const { canRender3D, isLowEnd, isMidRange } = useDeviceCapability();

// Track if model-viewer script was loaded by index.html
const mvEnabled = ref(false);
onMounted(() => {
  mvEnabled.value = typeof window !== 'undefined' && window.__MV_ENABLED === true;
});

// Show 3D only if: device is capable AND model-viewer was loaded
const show3D = computed(() => canRender3D.value && mvEnabled.value);

// Apply body class for global CSS targeting
onMounted(() => {
  if (isLowEnd.value) document.body.classList.add('low-end-device');
});

// ===== ADAPTIVE QUALITY SETTINGS =====
// High-end: full ACES tone-mapping, shadows, high pixel ratio
// Low-end:  no tone-mapping, no shadows, lower pixel ratio = much less GPU work
const modelQuality = computed(() => {
  if (isLowEnd.value) {
    return {
      toneMapping: 'commerce',   // Cheapest tone-mapping (almost no cost)
      shadowIntensity: '0',      // No shadow (saves a full render pass)
      shadowSoftness: '0',
      exposure: '1',
      pixelRatio: '0.75',        // Render at 75% resolution — huge GPU saving
      rotationPerSecond: '8deg', // Slower rotation = fewer frames needed
    };
  }
  if (isMidRange.value) {
    return {
      toneMapping: 'neutral',
      shadowIntensity: '0.5',
      shadowSoftness: '0.2',
      exposure: '1',
      pixelRatio: '1',
      rotationPerSecond: '12deg',
    };
  }
  // High-end
  return {
    toneMapping: 'aces',
    shadowIntensity: '0.8',
    shadowSoftness: '0.3',
    exposure: '1.1',
    pixelRatio: '1.5',
    rotationPerSecond: '15deg',
  };
});

// Improve material quality on model load
const onModelLoad = (event) => {
  const mv = event.target;
  if (mv?.model?.materials) {
    mv.model.materials.forEach(material => {
      material.pbrMetallicRoughness.setMetallicFactor(1.0);
      material.pbrMetallicRoughness.setRoughnessFactor(0.04);
    });
  }
};

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
  <section class="hero" :class="{ 'hero-aliado': isAliado, 'hero-low-end': isLowEnd }">

    <!-- Pearl Background (Personal Mode) -->
    <div v-if="!isAliado" class="hero-bg-elements">
      <div class="pearl-gradient"></div>
    </div>

    <!-- Animated Rings (disabled on low-end) -->
    <div v-if="!isLowEnd" class="hero-bg-hologram">
      <div class="cyber-ring-huge ring-huge-1"></div>
      <div class="cyber-ring-huge ring-huge-2"></div>
      <div class="cyber-ring-huge ring-huge-3"></div>
      <div class="arrow-container arrow-tr"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-br"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-bl"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-tl"><div class="tech-chevron"></div></div>
    </div>

    <!-- Static subtle ring for low-end (no animation cost) -->
    <div v-if="isLowEnd" class="hero-bg-hologram-static">
      <div class="static-ring-1"></div>
      <div class="static-ring-2"></div>
    </div>

    <!-- ========== PERSONAL MODE ========== -->
    <div v-if="!isAliado" class="container hero-inner mode-fade-in">

      <!-- 3D Logo -->
      <div class="hero-logo-wrap">
        <model-viewer
          src="/Logo3d.glb"
          loading="eager"
          reveal="auto"
          alt="Off Basic 3D Logo"
          auto-rotate
          auto-rotate-delay="500"
          :rotation-per-second="modelQuality.rotationPerSecond"
          camera-controls
          interaction-prompt="none"
          :shadow-intensity="modelQuality.shadowIntensity"
          :shadow-softness="modelQuality.shadowSoftness"
          :exposure="modelQuality.exposure"
          :tone-mapping="modelQuality.toneMapping"
          environment-image="neutral"
          class="hero-logo-3d"
          disable-zoom
          @load="onModelLoad"
          power-preference="high-performance"
          :minimum-pixel-ratio="modelQuality.pixelRatio"
        ></model-viewer>
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

      <!-- Baúl 3D Visual -->
      <div class="baul-visual baul-floating">
        <div class="cyber-glow" v-if="!isLowEnd"></div>
        <div class="baul-container">
          <model-viewer
            src="/Baul3d.glb"
            loading="lazy"
            reveal="auto"
            alt="El Baúl 3D"
            auto-rotate
            auto-rotate-delay="500"
            :rotation-per-second="modelQuality.rotationPerSecond"
            camera-controls
            interaction-prompt="none"
            :shadow-intensity="modelQuality.shadowIntensity"
            :shadow-softness="modelQuality.shadowSoftness"
            :exposure="modelQuality.exposure"
            :tone-mapping="modelQuality.toneMapping"
            environment-image="neutral"
            class="baul-3d"
            disable-zoom
            @load="onModelLoad"
            power-preference="high-performance"
            :minimum-pixel-ratio="modelQuality.pixelRatio"
          ></model-viewer>
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

    <!-- Decorative orbs (simplified on low-end) -->
    <div class="orb orb-1" :class="{ 'orb-aliado': isAliado, 'orb-simple': isLowEnd }"></div>
    <div class="orb orb-2" :class="{ 'orb-aliado': isAliado, 'orb-simple': isLowEnd }"></div>
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

/* ===== 3D MODELS — HIGH-END ===== */
.hero-logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  margin-top: 1.5rem;
}

.hero-logo-3d {
  width: 260px;
  height: 260px;
  background-color: transparent !important;
  --poster-color: transparent;
  outline: none;
  animation: float3d 5s ease-in-out infinite;
  will-change: transform;
}

/* Kill every shadow-DOM part that can have a background */
.hero-logo-3d::part(default-poster) {
  display: none !important;
}

.hero-logo-3d::part(container) {
  background-color: transparent !important;
}

/* Hide loading progress bar */
.hero-logo-3d::part(default-progress-bar) {
  display: none !important;
}

.hero-logo-3d::part(default-progress-mask) {
  display: none !important;
}

@keyframes float3d {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%       { transform: translate3d(0, -12px, 0); }
}

/* ===== PNG FALLBACK — LOW-END ===== */
.hero-logo-fallback {
  animation: float3d 5s ease-in-out infinite;
  will-change: transform;
}

.hero-logo-img {
  width: 260px;
  height: 260px;
  object-fit: contain;
  /* Premium filter to simulate chrome effect on static PNG */
  filter: drop-shadow(0 8px 32px rgba(0, 208, 255, 0.35))
          contrast(1.05)
          brightness(1.05);
  border-radius: 50%;
}

.baul-img {
  width: 250px;
  height: 250px;
  object-fit: contain;
  filter: drop-shadow(0 8px 32px rgba(0, 208, 255, 0.35))
          contrast(1.05)
          brightness(1.05);
}

/* ===== BAUL 3D ===== */
.baul-3d {
  width: 250px;
  height: 250px;
  background-color: transparent !important;
  --poster-color: transparent;
  outline: none;
}

.baul-3d::part(default-poster) {
  display: none !important;
}

.baul-3d::part(container) {
  background-color: transparent !important;
}

/* Hide loading progress bar */
.baul-3d::part(default-progress-bar) {
  display: none !important;
}

.baul-3d::part(default-progress-mask) {
  display: none !important;
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
.hero-inner:not(.hero-aliado-inner) .hero-slogan {
  color: #00D0FF;
  font-size: clamp(2rem, 5vw, 2.5rem);
  margin: 0.5rem auto;
  font-weight: 800;
}

.hero-inner:not(.hero-aliado-inner) .hero-subtitle { color: #555; font-weight: 400; }

.mini-badge {
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  border: 1px solid #00D0FF;
  border-radius: 50px;
  background: rgba(0, 208, 255, 0.18);
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
  .hero { padding: 100px 0 30px; }
  .hero-logo-3d,
  .hero-logo-img { width: 200px; height: 200px; }
  .baul-3d,
  .baul-img { width: 190px; height: 190px; }
  .hero-video { height: 220px; }
  .orb-1 { width: 250px; height: 250px; top: -80px; right: -80px; }
  .orb-2 { width: 250px; height: 250px; bottom: -80px; left: -80px; }
}

@media (max-width: 480px) {
  .hero-logo-3d,
  .hero-logo-img { width: 180px; height: 180px; }
  .baul-3d,
  .baul-img { width: 170px; height: 170px; }
}
</style>
