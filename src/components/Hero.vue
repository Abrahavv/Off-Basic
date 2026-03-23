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
      
      <!-- Partículas de aparición/desaparición -->
      <div class="particle p-1"></div>
      <div class="particle p-2"></div>
      <div class="particle p-3"></div>
      <div class="particle p-4"></div>
      <div class="particle p-5"></div>
      <div class="particle p-6"></div>
      <div class="particle p-7"></div>
      <div class="particle p-8"></div>
      <div class="particle p-9"></div>
      <div class="particle p-10"></div>
      <div class="particle p-11"></div>
      <div class="particle p-12"></div>
      
      <!-- Ondas expansivas más pronunciadas -->
      <div class="pulse-ring delay-1"></div>
      <div class="pulse-ring delay-2"></div>
      <div class="pulse-ring delay-3"></div>
    </div>

    <Transition name="mode-switch" mode="out-in">

      <!-- ========== PERSONAL MODE ========== -->
      <div v-if="!isAliado" class="container hero-inner" key="personal">
        
        <!-- Floating Logo -->
        <div class="hero-logo-wrap">
          <img 
            src="/Off-Basic-Web-Cromado.png" 
            alt="Off Basic Logo" 
            class="hero-logo floating-glow"
          />
        </div>

        <h1 class="hero-display">Off Basic</h1>
        <h2 class="hero-tagline">Fuera de lo básico</h2>
        <div class="hero-description">
          <p>Tecnología premium para quienes exigen más.</p>
          <p>Rendimiento, estilo y eficiencia en cada detalle.</p>
        </div>

        <div class="hero-actions">
          <button class="btn-primary" @click="scrollToProducts">Comprar</button>
          <button class="btn-secondary" @click="emit('switch-mode', 'aliado')">Aliado</button>
        </div>
      </div>

      <!-- ========== ALIADO MODE ========== -->
      <div v-else class="container hero-inner hero-aliado-inner" key="aliado">
        
        <!-- El Baúl Visual -->
        <div class="baul-visual">
          <div class="baul-container">
            <img 
              src="/Baul-Off-Basic.png" 
              alt="El Baúl" 
              class="baul-img floating-glow"
            />
          </div>
          <!-- 3 Llaves -->
          <div class="llaves-row">
            <div class="llave active">
              <img src="/Llave Diamante.png" alt="Llave Activa" class="llave-icon" />
              <span>Activa</span>
            </div>
            <div class="llave inactive">
              <img src="/Llave Diamante.png" alt="Llave Pronto" class="llave-icon" />
              <span>Pronto</span>
            </div>
            <div class="llave inactive">
              <img src="/Llave Diamante.png" alt="Llave Pronto" class="llave-icon" />
              <span>Pronto</span>
            </div>
          </div>
        </div>

        <h1 class="hero-title">El Baúl</h1>
        <h2 class="hero-subtitle">
          El inventario está protegido.<br/>
          Para ver los precios al mayor, necesitas la Llave.
        </h2>

        <div class="hero-actions">
          <a :href="getLlaveUrl()" target="_blank" rel="noopener noreferrer" class="btn-primary">Llave</a>
        </div>
      </div>

    </Transition>

    <!-- Decorative orbs -->
    <div class="orb orb-1" :class="{ 'orb-aliado': isAliado }"></div>
    <div class="orb orb-2" :class="{ 'orb-aliado': isAliado }"></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 140px 0 60px;
  overflow: hidden;
  text-align: center;
  background-color: var(--bg);
  transition: background-color var(--transition) ease;
}

/* Blue Tech Grid Details - Solo Aliado */
.hero-aliado::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 208, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 208, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
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
}

/* Base pearl gradient */
.pearl-gradient {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse at 50% 30%, #ffffff 0%, #f4f6fa 60%, #eef2f9 100%);
  opacity: 0.9;
}

/* Randomly Appearing Particles */
.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px rgba(0, 208, 255, 0.6);
  opacity: 0;
  animation: appearDisappear var(--duration, 6s) infinite ease-in-out var(--delay, 0s);
}

.p-1 { width: 5px; height: 5px; left: 15%; top: 20%; --duration: 5s; --delay: 0s; }
.p-2 { width: 8px; height: 8px; left: 75%; top: 15%; --duration: 7s; --delay: 2s; }
.p-3 { width: 4px; height: 4px; left: 85%; top: 60%; --duration: 4s; --delay: 1s; }
.p-4 { width: 6px; height: 6px; left: 10%; top: 75%; --duration: 8s; --delay: 3s; }
.p-5 { width: 9px; height: 9px; left: 50%; top: 80%; --duration: 6s; --delay: 1.5s; }
.p-6 { width: 5px; height: 5px; left: 35%; top: 30%; --duration: 5.5s; --delay: 4s; }
.p-7 { width: 7px; height: 7px; left: 90%; top: 35%; --duration: 6.5s; --delay: 0.5s; }
.p-8 { width: 4px; height: 4px; left: 25%; top: 50%; --duration: 4.5s; --delay: 2.5s; }
.p-9 { width: 6px; height: 6px; left: 65%; top: 65%; --duration: 7.5s; --delay: 1.2s; }
.p-10 { width: 5px; height: 5px; left: 45%; top: 10%; --duration: 5s; --delay: 3.5s; }
.p-11 { width: 8px; height: 8px; left: 55%; top: 90%; --duration: 8.5s; --delay: 0.8s; }
.p-12 { width: 3px; height: 3px; left: 5%; top: 40%; --duration: 3.5s; --delay: 2.2s; }

@keyframes appearDisappear {
  0%, 100% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 0.96; transform: scale(1.2); }
}

/* Concentric Pulse Ring (Multiples) */
.pulse-ring {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 1px solid rgba(0, 208, 255, 0.25);
  animation: expandRing 10s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);
}

.pulse-ring.delay-1 { animation-delay: 0s; }
.pulse-ring.delay-2 { animation-delay: 5s; }
.pulse-ring.delay-3 { display: none; }

@keyframes expandRing {
  0% { width: 200px; height: 200px; opacity: 0.95; border-width: 2px; }
  100% { width: 1300px; height: 1300px; opacity: 0; border-width: 0px; }
}

/* ===== FLOATING LOGO ===== */
.hero-logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.hero-logo {
  width: 180px;
  height: auto;
}

.floating-glow {
  animation: float 4s ease-in-out infinite, glow 3s ease-in-out infinite;
}

/* ===== TITLES ===== */
.hero-display {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 8vw, 3.8rem);
  font-weight: 800;
  letter-spacing: 4px;
  line-height: 1;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  background: linear-gradient(to bottom, var(--text) 40%, var(--text-muted) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
}

.hero-title {
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 1rem;
  line-height: 1.05;
}

.hero-tagline {
  font-size: clamp(1.2rem, 3.5vw, 2rem);
  font-weight: 800;
  margin-bottom: 1.25rem;
  color: var(--accent);
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.hero-description {
  margin-bottom: 1.25rem;
}

.hero-description p {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: var(--text-muted);
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 0.2rem;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--text-muted);
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}

/* ===== ACTIONS ===== */
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ===== BAÚL VISUAL ===== */
.baul-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.baul-container {
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.baul-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.llaves-row {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.llave {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.llave.active {
  color: var(--accent);
}

.llave-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(0,208,255,0.4));
  transition: transform 0.3s ease;
}

.llave.active span {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.llave.inactive {
  color: var(--text-muted);
  opacity: 0.4;
}

.llave.inactive .llave-icon {
  filter: grayscale(100%) brightness(0.5);
}

.llave.inactive span {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
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
    padding: 110px 0 40px;
  }
  .hero-logo {
    width: 130px;
  }
  .baul-container {
    width: 160px;
    height: 160px;
  }
  .llaves-row {
    gap: 1.2rem;
  }
}
</style>
