<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  mode: String
});

const emit = defineEmits(['switch-mode']);

const isAliado = computed(() => props.mode === 'aliado');

// WhatsApp
const whatsappNumber = '1234567890';

const getLlaveUrl = () => {
  const msg = '¡Hola! Vi El Baúl y necesito la **Llave Maestra** para ingresar.';
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

const scrollToProducts = () => {
  const el = document.getElementById('productos');
  if (el) {
    const navbarHeight = 100; // Aligned with total scroll target for better proximity
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
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
      
      <!-- Flechas diagonales (45 grados) -->
      <div class="arrow-container arrow-tr"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-br"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-bl"><div class="tech-chevron"></div></div>
      <div class="arrow-container arrow-tl"><div class="tech-chevron"></div></div>
    </div>

      <!-- ========== PERSONAL MODE ========== -->
      <div v-show="!isAliado" class="container hero-inner mode-fade-in">
        
        <!-- Floating Logo -->
        <div class="hero-logo-wrap">
          <img 
            src="/Off-Basic-Web-Cromado.png" 
            alt="Off Basic Logo" 
            class="hero-logo floating-glow"
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
      <div v-show="isAliado" class="container hero-inner hero-aliado-inner mode-fade-in">
        
        <!-- El Baúl Visual -->
        <div class="baul-visual baul-floating">
          <div class="cyber-glow"></div>
          <div class="baul-container">
            <img 
              src="/Baul-Off-Basic.png" 
              alt="El Baúl" 
              class="baul-img"
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

/* Animated Blue Tech Grid Details - Solo Aliado */
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

/* ===== NEW PEARL WHITE & BLUE GEOMETRY BG (Personal) ===== */
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

/* Base pearl gradient */
.pearl-gradient {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse at 50% 30%, #ffffff 0%, #f4f6fa 60%, #eef2f9 100%);
  opacity: 0.9;
}


/* ===== FLOATING LOGO ===== */
.hero-logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.hero-logo {
  width: 180px;
  height: auto;
}

.floating-glow {
  animation: float 5s ease-in-out infinite, glow 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.3)); }
  50% { filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.5)); }
}

/* ===== TITLES ===== */
.hero-display {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 10vw, 3.8rem);
  font-weight: 800;
  letter-spacing: 4px;
  line-height: 1.1;
  margin-bottom: 1rem;
  text-transform: uppercase;
  background: linear-gradient(to bottom, var(--text) 40%, var(--text-muted) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.1));
}

.hero-title,
.hero-display-aliado {
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 0.25rem;
  line-height: 1.05;
  text-transform: none;
}

/* Personal mode text colors */
.hero-inner:not(.hero-aliado-inner) .hero-title {
  color: #000;
}

.hero-inner:not(.hero-aliado-inner) .hero-slogan {
  color: #00D0FF;
  font-size: clamp(2rem, 5vw, 2.5rem);
  margin: 0.5rem auto;
  font-weight: 800;
}

.hero-inner:not(.hero-aliado-inner) .hero-subtitle,
.hero-inner:not(.hero-aliado-inner) .hero-subtitle-aliado {
  color: #555;
  font-weight: 400;
  line-height: 1.25;
}

.hero-inner:not(.hero-aliado-inner) .hero-subtitle + p,
.hero-inner:not(.hero-aliado-inner) .hero-subtitle-aliado + p {
  color: #555;
  line-height: 1.25;
}

.hero-tagline {
  font-size: clamp(1.1rem, 4vw, 1.8rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--accent);
  letter-spacing: 0.5px;
  white-space: normal;
  text-transform: none;
}

.hero-tagline-wrap {
  margin-bottom: 1rem;
}

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

.hero-actions .btn-primary {
  min-width: 210px;
  color: #000;
  background: #00D0FF;
  box-shadow: 0 10px 22px rgba(0, 208, 255, 0.45);
  padding: 0.95rem 2rem;
}

.hero-description {
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 0.2rem;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #d8e9ff;
  font-weight: 400;
  max-width: 1000px;
  margin: 0.2rem auto 1rem;
  line-height: 1.35;
}

.hero-video-wrapper {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.hero-video {
  width: 100%;
  max-width: 860px;
  height: 480px;
  border: 2px solid rgba(56, 139, 255, 0.6);
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 59, 122, 0.4);
}

@media (max-width: 768px) {
  .hero-video {
    height: 260px;
  }
}

/* ===== ACTIONS ===== */
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-actions .btn-primary,
.hero-actions .btn-secondary {
  min-width: 170px;
  width: fit-content;
  text-align: center;
}

.hero-actions .btn-secondary {
  border: 2px solid #00D0FF;
  color: #00D0FF;
  background: #fff;
}
.hero-actions .btn-secondary:hover {
  background: rgba(0, 208, 255, 0.12);
}

/* ===== BAÚL VISUAL ===== */
.baul-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
  z-index: 2;
}

.baul-floating {
  animation: floatPremium 6s ease-in-out infinite;
}

@keyframes floatPremium {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
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

.baul-img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  position: relative;
  z-index: 5;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
}

/* Glowing center */
.cyber-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: rgba(0, 208, 255, 0.4);
  filter: blur(60px);
  z-index: 1;
  animation: glowBreathe 4s ease-in-out infinite alternate;
}

@keyframes glowBreathe {
  0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

/* Vast Elegance Rings Background (Both Modes) */
.hero-bg-hologram {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.cyber-ring-huge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(0, 208, 255, 0.15);
  opacity: 0;
  pointer-events: none;
}

.ring-huge-1 {
  border-top-color: rgba(0, 208, 255, 0.6);
  border-right-color: rgba(0, 208, 255, 0.3);
  border-width: 2px;
  animation: expandHugeRing 9s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
}

.ring-huge-2 {
  border-bottom-color: rgba(0, 208, 255, 0.5);
  border-left-color: rgba(0, 208, 255, 0.2);
  border-width: 3px;
  animation: expandHugeRing 9s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94) 3s;
}

.ring-huge-3 {
  border-color: rgba(0, 208, 255, 0.4);
  border-width: 2px;
  border-style: dashed;
  animation: expandHugeRing 9s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94) 6s;
}

@keyframes expandHugeRing {
  0% {
    width: 180px;
    height: 180px;
    opacity: 0.9;
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    width: 160vmax;
    height: 160vmax;
    opacity: 0;
    transform: translate(-50%, -50%) rotate(180deg);
  }
}

/* Diagonal Arrows */
.arrow-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0; 
  height: 0;
  z-index: 2;
}

.arrow-tr { transform: rotate(45deg); }
.arrow-br { transform: rotate(135deg); }
.arrow-bl { transform: rotate(225deg); }
.arrow-tl { transform: rotate(315deg); }

.tech-chevron {
  position: absolute;
  width: 25px; 
  height: 25px;
  border-top: 3px solid rgba(0, 208, 255, 0.9);
  border-left: 3px solid rgba(0, 208, 255, 0.9);
  box-shadow: -2px -2px 10px rgba(0, 208, 255, 0.5);
  animation: shootChevron 6s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes shootChevron {
  0% { transform: translate(-50%, -120px) rotate(45deg) scale(0.5); opacity: 0; }
  15% { opacity: 1; filter: drop-shadow(0 0 8px rgba(0, 208, 255, 1)); }
  100% { transform: translate(-50%, -120vmax) rotate(45deg) scale(1.5); opacity: 0; }
}

/* ===== ORBS ===== */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 1;
  pointer-events: none;
  transition: all 1s ease;
}

.orb-1 {
  width: 450px;
  height: 450px;
  background: rgba(0, 208, 255, 0.45);
  top: -150px;
  right: -150px;
  opacity: 0.3;
}

.orb-2 {
  width: 450px;
  height: 450px;
  background: rgba(0, 208, 255, 0.45);
  bottom: -150px;
  left: -150px;
  opacity: 0.3;
}

.orb-aliado {
  opacity: 0.25;
  animation: orbBreathe 8s infinite alternate;
}

@keyframes orbBreathe {
  0% { transform: scale(1); opacity: 0.1; }
  100% { transform: scale(1.2); opacity: 0.2; }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero {
    padding: 140px 0 40px;
  }
  .hero-logo {
    width: 120px;
  }
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
  .hero-actions .btn-primary,
  .hero-actions .btn-secondary {
    width: 100%;
  }
  .baul-container {
    width: 140px;
    height: 140px;
  }
  .hero-description p {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
  .hero-subtitle {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    max-width: 100%;
    font-size: 0.95rem;
    padding: 0 0.5rem;
  }
  .hero-video {
    height: 260px;
  }
  .orb {
    width: 200px;
    height: 200px;
    filter: blur(60px);
    opacity: 0.15;
  }
  .orb-1 { top: -50px; right: -50px; }
  .orb-2 { bottom: -50px; left: -50px; }
}

@media (max-width: 480px) {
  .hero {
    padding: 120px 0 30px;
  }
  .hero-logo {
    width: 100px;
  }
  .hero-display {
    font-size: clamp(1.5rem, 9vw, 2.5rem);
    letter-spacing: 2px;
  }
  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  .hero-tagline {
    font-size: clamp(0.9rem, 3.5vw, 1.4rem);
  }
  .hero-subtitle {
    font-size: 0.85rem;
    line-height: 1.4;
    padding: 0 0.5rem;
  }
  .mini-badge {
    font-size: 0.65rem;
    padding: 0.3rem 0.75rem;
  }
  .hero-actions .btn-primary {
    min-width: unset;
    width: 100%;
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  .baul-container {
    width: 120px;
    height: 120px;
  }
  .cyber-glow {
    width: 100px;
    height: 100px;
    filter: blur(40px);
  }
  .hero-video {
    height: 200px;
    border-radius: 10px;
  }
  .orb {
    width: 150px;
    height: 150px;
    filter: blur(50px);
    opacity: 0.1;
  }
}
</style>
