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
      
      <!-- Una sola onda expansiva -->
      <div class="pulse-ring"></div>
    </div>

    <Transition name="mode-switch" mode="out-in" appear>

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
          <button class="btn-primary" @click="scrollToProducts">Acceso</button>
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

/* Círculos que salen del centro */
.particle {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(0, 208, 255, 0.6);
  opacity: 0;
  animation: moveOutwards var(--duration, 6s) infinite cubic-bezier(0.4, 0, 0.2, 1) var(--delay, 0s);
  transform-origin: center;
}

.p-1 { --dest-x: 15%; --dest-y: 20%; --duration: 5s; --delay: 0s; --angle: -135deg; }
.p-2 { --dest-x: 75%; --dest-y: 15%; --duration: 7s; --delay: 2s; --angle: 45deg; }
.p-3 { --dest-x: 85%; --dest-y: 60%; --duration: 4s; --delay: 1s; --angle: 110deg; }
.p-4 { --dest-x: 10%; --dest-y: 75%; --duration: 8s; --delay: 3s; --angle: -110deg; }
.p-5 { --dest-x: 50%; --dest-y: 80%; --duration: 6s; --delay: 1.5s; --angle: 180deg; }
.p-6 { --dest-x: 35%; --dest-y: 30%; --duration: 5.5s; --delay: 4s; --angle: -45deg; }
.p-7 { --dest-x: 90%; --dest-y: 35%; --duration: 6.5s; --delay: 0.5s; --angle: 70deg; }
.p-8 { --dest-x: 25%; --dest-y: 50%; --duration: 4.5s; --delay: 2.5s; --angle: -90deg; }
.p-9 { --dest-x: 65%; --dest-y: 65%; --duration: 7.5s; --delay: 1.2s; --angle: 135deg; }
.p-10 { --dest-x: 45%; --dest-y: 10%; --duration: 5s; --delay: 3.5s; --angle: 0deg; }
.p-11 { --dest-x: 55%; --dest-y: 90%; --duration: 8.5s; --delay: 0.8s; --angle: 180deg; }
.p-12 { --dest-x: 5%; --dest-y: 40%; --duration: 3.5s; --delay: 2.2s; --angle: -70deg; }

@keyframes moveOutwards {
  0% { 
    top: 40%; 
    left: 50%; 
    opacity: 0; 
    transform: translate(-50%, -50%) scale(0.3) rotate(var(--angle)); 
  }
  20% { 
    opacity: 0.95; 
  }
  80% { 
    opacity: 0.95; 
  }
  100% { 
    top: var(--dest-y); 
    left: var(--dest-x); 
    opacity: 0; 
    transform: translate(-50%, -50%) scale(1.4) rotate(var(--angle)); 
  }
}

/* Concentric Pulse Ring (Single) */
.pulse-ring {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  max-width: 90vw;
  max-height: 90vw;
  border-radius: 50%;
  border: 1px solid rgba(0, 208, 255, 0.25);
  animation: expandRing 5.5s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (max-width: 768px) {
  .pulse-ring {
    width: 300px;
    height: 300px;
  }
}

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

.hero-title {
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 1rem;
  line-height: 1.05;
}

.hero-tagline {
  font-size: clamp(1.1rem, 4vw, 1.8rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--accent);
  letter-spacing: 0.5px;
  white-space: normal;
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
  filter: drop-shadow(0 0 6px rgba(0,208,255,0.3));
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
    padding: 160px 0 40px;
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
    width: 160px;
    height: 160px;
  }
  .llaves-row {
    gap: 1.2rem;
  }
  .hero-description p {
    font-size: 0.9rem;
    padding: 0 1rem;
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
</style>
