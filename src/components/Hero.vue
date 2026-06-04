<script setup>
import { ref, computed, onMounted } from 'vue';
import { WHATSAPP_NUMBER } from '../config.js';
import offBasicLogo from '../assets/Off-Basic-Web-Cromado.png';
import baulImg from '../assets/Baul-Off-Basic.png';
import AliadoLoader from './AliadoLoader.vue';

const props = defineProps({ 
  mode: String,
  isAliadoUnlocked: Boolean
});
const emit = defineEmits(['switch-mode', 'unlocked']);

const isAliado = computed(() => props.mode === 'aliado');

const vslLoading = ref(false);
const vslUnlocked = computed(() => props.isAliadoUnlocked);

const startVslLoading = () => {
  vslLoading.value = true;
};

const onVslLoaderFinished = () => {
  vslLoading.value = false;
  emit('unlocked');
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
            :src="offBasicLogo" 
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
            :src="baulImg" 
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
 
      <h2 class="hero-subtitle st-4 single-line-web">El inventario está protegido. Para ver los precios al mayor, necesitas la Llave de acceso.</h2>
 
      <div class="hero-video-wrapper st-5">
        <!-- VSL Inline Loader -->
        <AliadoLoader v-if="vslLoading" inline @finished="onVslLoaderFinished" />

        <!-- Unlocked Video -->
        <iframe
          v-else-if="vslUnlocked"
          class="hero-video"
          src="https://www.youtube.com/embed/xuEwkRWv7U0"
          title="Baúl de Off Basic"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <!-- Locked Video Placeholder Card (Glass-Neomorphism) -->
        <div 
          v-else 
          class="video-placeholder-card" 
          @click="startVslLoading"
          role="button"
          aria-label="Desbloquear información exclusiva"
        >
          <div class="placeholder-overlay"></div>
          <div class="placeholder-content">
            <div class="lock-shield-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
            </div>
            <div class="play-btn-pulse">
              <div class="play-icon">▶</div>
            </div>
            <h3 class="placeholder-title">DESBLOQUEAR INFORMACIÓN EXCLUSIVA</h3>
            <p class="placeholder-desc">Pulse para iniciar la autenticación de credenciales y acceder al contenido exclusivo.</p>
            <div class="secure-badge">
              <span class="secure-dot"></span>
              CONEXIÓN SEGURA VERIFICADA
            </div>
          </div>
        </div>
      </div>
 
      <div v-if="vslUnlocked" class="hero-actions st-6">
        <button class="btn-primary btn-shimmer" @click="scrollToProducts" aria-label="Acceder al catálogo de inversión del Baúl">ACCEDER AHORA</button>
        <a 
          href="/Off%20Basic%20Protocolo.pdf" 
          download="Off Basic Protocolo.pdf"
          class="btn-primary btn-shimmer btn-pdf"
          aria-label="Descargar presentación en formato PDF"
        >
          <svg class="pdf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Descargar PDF
        </a>
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

.single-line-web {
  white-space: normal;
}

@media (min-width: 1024px) {
  .single-line-web {
    white-space: nowrap;
    max-width: none;
  }
}

/* ===== VIDEO ===== */
.hero-video-wrapper {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 860px;
  height: 480px;
  margin-left: auto;
  margin-right: auto;
}

.hero-video {
  width: 100%;
  max-width: 860px;
  height: 480px;
  border: 2px solid rgba(56, 139, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

/* ===== PDF DOWNLOAD BUTTON ===== */
.hero-actions .btn-pdf {
  background: #EAFF00;
  box-shadow: 0 10px 22px rgba(234, 255, 0, 0.35);
  color: #000 !important;
  text-decoration: none;
}

.hero-actions .btn-pdf:hover {
  background: #D4EC00;
  box-shadow: 0 15px 30px rgba(234, 255, 0, 0.5);
}

.pdf-icon {
  width: 1.2rem;
  height: 1.2rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.hero-actions .btn-pdf:hover .pdf-icon {
  transform: translateY(2px);
}

/* Margin adjustment for Aliado actions below video */
.hero-aliado-inner .hero-actions {
  margin-top: 2.5rem;
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

/* ===== VIDEO PLACEHOLDER GLASS-NEOMORPHISM ===== */
.video-placeholder-card {
  position: relative;
  width: 100%;
  max-width: 860px;
  height: 480px;
  border: 1px solid rgba(0, 208, 255, 0.25);
  border-radius: 16px;
  background: radial-gradient(135deg, rgba(0, 208, 255, 0.08) 0%, rgba(0, 0, 0, 0.6) 100%);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 10px 20px rgba(0, 208, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.video-placeholder-card:hover {
  transform: scale(1.01);
  border-color: rgba(0, 208, 255, 0.5);
  box-shadow: 
    0 20px 45px rgba(0, 208, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.placeholder-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(0, 208, 255, 0.15) 0%, transparent 70%);
  opacity: 0.5;
  transition: opacity 0.4s ease;
}

.video-placeholder-card:hover .placeholder-overlay {
  opacity: 0.8;
}

.placeholder-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 500px;
}

.lock-shield-icon {
  color: var(--accent, #00D0FF);
  filter: drop-shadow(0 0 10px rgba(0, 208, 255, 0.4));
  margin-bottom: 1rem;
  opacity: 0.85;
}

.play-btn-pulse {
  position: relative;
  width: 75px;
  height: 75px;
  background: var(--accent, #00D0FF);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 25px rgba(0, 208, 255, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-placeholder-card:hover .play-btn-pulse {
  transform: scale(1.1);
  box-shadow: 0 0 35px rgba(0, 208, 255, 0.7);
}

.play-icon {
  color: #000000;
  font-size: 1.8rem;
  margin-left: 5px; /* Alignment offset for center visual balance */
}

.placeholder-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  margin: 0 0 0.75rem 0;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.placeholder-desc {
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.secure-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--accent, #00D0FF);
  background: rgba(0, 208, 255, 0.1);
  border: 1px solid rgba(0, 208, 255, 0.25);
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

.secure-dot {
  width: 6px;
  height: 6px;
  background-color: var(--accent, #00D0FF);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent, #00D0FF);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero { padding: 110px 0 40px; }
  .hero-logo-img { width: 200px; height: 200px; }
  .baul-img { width: 220px; height: 220px; }
  .baul-visual { margin-top: 3.5rem; margin-bottom: 0.5rem; }
  .hero-tagline-wrap { margin: 1.5rem 0 1rem; }
  .hero-video { height: 280px; }
  .video-placeholder-card { height: 280px; }
  .hero-video-wrapper { height: 280px; }
  .orb-1 { width: 250px; height: 250px; top: -80px; right: -80px; }
  .orb-2 { width: 250px; height: 250px; bottom: -80px; left: -80px; }

  /* Adjustments to make the placeholder content fit perfectly within 280px height */
  .placeholder-content {
    padding: 1rem;
  }
  .lock-shield-icon {
    margin-bottom: 0.3rem;
  }
  .lock-shield-icon svg {
    width: 28px;
    height: 28px;
  }
  .play-btn-pulse {
    width: 48px;
    height: 48px;
    margin-bottom: 0.6rem;
    box-shadow: 0 0 15px rgba(0, 208, 255, 0.35);
  }
  .play-icon {
    font-size: 1.1rem;
    margin-left: 3px;
  }
  .placeholder-title {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    letter-spacing: 1px;
  }
  .placeholder-desc {
    font-size: 0.68rem;
    margin-bottom: 0.6rem;
    line-height: 1.4;
  }
  .secure-badge {
    padding: 0.3rem 0.7rem;
    font-size: 0.55rem;
    letter-spacing: 1px;
  }
}


@media (max-width: 480px) {
  .hero-logo-img { width: 180px; height: 180px; }
  .baul-img { width: 200px; height: 200px; }
  .baul-visual { margin-top: 2.5rem; }
  .hero-tagline-wrap { margin: 1.2rem 0 0.8rem; }
}
</style>
