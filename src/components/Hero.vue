<script setup>
import { computed } from 'vue';

const props = defineProps({
  mode: String
});

const emit = defineEmits(['switch-mode']);

const isAliado = computed(() => props.mode === 'aliado');

import { WHATSAPP_NUMBER } from '../config.js';

// WhatsApp
const whatsappNumber = WHATSAPP_NUMBER;

const scrollToProducts = () => {
  const target = document.getElementById('baul-content') || document.getElementById('productos');
  if (target) {
    const nav = document.querySelector('.navbar-wrapper');
    const offset = nav ? nav.offsetHeight + 20 : 100;
    const pos = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: pos,
      behavior: 'smooth'
    });
  }
};

const onModelLoad = (event) => {
  const modelViewer = event.target;
  if (modelViewer.model && modelViewer.model.materials) {
    modelViewer.model.materials.forEach(material => {
      // Forzar efecto cromo original
      material.pbrMetallicRoughness.setBaseColorFactor([0.7, 0.7, 0.7, 1]);
      material.pbrMetallicRoughness.setMetallicFactor(1.0);
      material.pbrMetallicRoughness.setRoughnessFactor(0.05);

      // Maximizar nitidez de texturas (Anisotropía)
      if (material.pbrMetallicRoughness.baseColorTexture) {
        material.pbrMetallicRoughness.baseColorTexture.texture.sampler.setAnisotropy(16);
      }
    });
  }
};
</script>

<template>
  <section class="hero" :class="{ 'hero-aliado': isAliado }">
    <!-- Animated Pearl Background Elements (Personal Mode) -->
    <div v-if="!isAliado" class="hero-bg-elements">
      <div class="pearl-gradient"></div>
    </div>

    <!-- Futuristic Rings Background Elements (Both Modes) -->
    <div class="hero-bg-hologram">
      <div class="cyber-ring-huge ring-huge-1"></div>
      <div class="cyber-ring-huge ring-huge-2"></div>
      <div class="cyber-ring-huge ring-huge-3"></div>
      
      <!-- Flechas diagonales -->
      <div class="arrow-container arrow-tr"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-br"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-bl"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-tl"><div class="tech-chevron"></div></div>
    </div>

      <!-- ========== PERSONAL MODE ========== -->
      <div v-if="!isAliado" class="container hero-inner mode-fade-in">
        
        <!-- Floating 3D Logo -->
        <div class="hero-logo-wrap">
          <model-viewer 
            src="/Logo3d.glb" 
            loading="eager"
            alt="Off Basic 3D Logo" 
            auto-rotate 
            camera-controls 
            interaction-prompt="none"
            shadow-intensity="1" 
            shadow-softness="0"
            exposure="1"
            environment-image="neutral"
            class="hero-logo-3d"
            disable-zoom
            @load="onModelLoad"
            power-preference="high-performance"
            minimum-pixel-ratio="1"
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
        
        <!-- El Baúl 3D Visual -->
        <div class="baul-visual baul-floating">
          <div class="cyber-glow"></div>
          <div class="baul-container">
            <model-viewer 
              src="/Baul3d.glb" 
              loading="eager"
              alt="El Baúl 3D" 
              auto-rotate 
              camera-controls
              interaction-prompt="none"
              shadow-intensity="1" 
              shadow-softness="0"
              exposure="1"
              environment-image="neutral"
              class="baul-3d"
              disable-zoom
              @load="onModelLoad"
              power-preference="high-performance"
              minimum-pixel-ratio="1"
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

    <!-- Decorative orbs -->
    <div class="orb orb-1" :class="{ 'orb-aliado': isAliado }"></div>
    <div class="orb orb-2" :class="{ 'orb-aliado': isAliado }"></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 110px 0 40px;
  overflow: hidden;
  text-align: center;
  background-color: var(--bg);
  transition: background-color var(--transition) ease;
}

.hero-aliado::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
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

.hero-bg-elements {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.pearl-gradient {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse at 50% 30%, #ffffff 0%, #f4f6fa 60%, #eef2f9 100%);
  opacity: 0.9;
}

/* ===== 3D BRANDING ===== */
.hero-logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.hero-logo-3d {
  width: 280px;
  height: 280px;
  background-color: transparent;
  outline: none;
  image-rendering: -webkit-optimize-contrast;
  animation: float3d 5s ease-in-out infinite;
}

@keyframes float3d {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.baul-3d {
  width: 250px;
  height: 250px;
  background-color: transparent;
  outline: none;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
  image-rendering: -webkit-optimize-contrast;
}

/* ===== TITLES ===== */
.hero-title {
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 0.25rem;
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

.hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }
.hero-actions .btn-primary { min-width: 210px; color: #000; background: #00D0FF; box-shadow: 0 10px 22px rgba(0, 208, 255, 0.45); }
.hero-actions .btn-secondary { border: 2px solid #00D0FF; color: #00D0FF; background: #fff; }

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #d8e9ff;
  font-weight: 400;
  max-width: 1000px;
  margin: 0.2rem auto 1rem;
  line-height: 1.35;
}

.hero-video-wrapper { margin-top: 3rem; display: flex; justify-content: center; }
.hero-video {
  width: 100%;
  max-width: 860px;
  height: 480px;
  border: 2px solid rgba(56, 139, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.baul-visual { position: relative; display: flex; flex-direction: column; align-items: center; margin-bottom: 0.5rem; z-index: 2; }
.baul-floating { animation: floatPremium 6s ease-in-out infinite; }
@keyframes floatPremium { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

.baul-container { position: relative; width: 160px; height: 160px; display: flex; align-items: center; justify-content: center; z-index: 5; }

.cyber-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 150px; height: 150px;
  background: rgba(0, 208, 255, 0.4);
  filter: blur(60px);
  z-index: 1;
  animation: glowBreathe 4s ease-in-out infinite alternate;
}

@keyframes glowBreathe { 0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); } 100% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); } }

.hero-bg-hologram { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; pointer-events: none; overflow: hidden; }
.cyber-ring-huge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; border: 1px solid rgba(0, 208, 255, 0.15); opacity: 0; }
.ring-huge-1 { border-top-color: rgba(0, 208, 255, 0.6); animation: expandHugeRing 9s infinite 0s; }
.ring-huge-2 { border-bottom-color: rgba(0, 208, 255, 0.5); animation: expandHugeRing 9s infinite 3s; }
.ring-huge-3 { border-style: dashed; animation: expandHugeRing 9s infinite 6s; }

@keyframes expandHugeRing { 0% { width: 180px; height: 180px; opacity: 0.9; } 100% { width: 160vmax; height: 160vmax; opacity: 0; } }

.tech-chevron {
  position: absolute;
  width: 25px; height: 25px;
  border-top: 3px solid rgba(0, 208, 255, 0.9);
  border-left: 3px solid rgba(0, 208, 255, 0.9);
  animation: shootChevron 6s infinite;
}
@keyframes shootChevron { 0% { transform: translate(-50%, -120px) rotate(45deg) scale(0.5); opacity: 0; } 100% { transform: translate(-50%, -120vmax) rotate(45deg) scale(1.5); opacity: 0; } }

.arrow-container { position: absolute; top: 50%; left: 50%; width: 0; height: 0; z-index: 2; }
.arrow-tr { transform: rotate(45deg); } .arrow-br { transform: rotate(135deg); } .arrow-bl { transform: rotate(225deg); } .arrow-tl { transform: rotate(315deg); }

.orb { position: absolute; border-radius: 50%; filter: blur(100px); z-index: 1; pointer-events: none; }
.orb-1 { width: 450px; height: 450px; background: rgba(0, 208, 255, 0.45); top: -150px; right: -150px; opacity: 0.3; }
.orb-2 { width: 450px; height: 450px; background: rgba(0, 208, 255, 0.45); bottom: -150px; left: -150px; opacity: 0.3; }

@media (max-width: 768px) {
  .hero { padding: 140px 0 40px; }
  .hero-logo-3d, .baul-3d { width: 220px; height: 220px; }
  .hero-video { height: 260px; }
}
</style>
