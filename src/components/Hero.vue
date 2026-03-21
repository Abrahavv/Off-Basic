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
  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <section class="hero" :class="{ 'hero-aliado': isAliado }">
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

        <h1 class="hero-title">Fuera de lo básico.</h1>
        <h2 class="hero-subtitle">
          Tecnología premium para quienes exigen más.<br/>
          Rendimiento, estilo y eficiencia en cada detalle.
        </h2>

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

        <h1 class="hero-title">El Baúl.</h1>
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

.hero-aliado {
  background: radial-gradient(ellipse at center, rgba(0, 208, 255, 0.04) 0%, var(--bg) 70%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 800px;
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
.hero-title {
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 1rem;
  line-height: 1.05;
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
  width: 350px;
  height: 350px;
  background: var(--accent);
  top: -100px;
  right: -80px;
  opacity: 0.1;
}

.orb-2 {
  width: 250px;
  height: 250px;
  background: var(--accent);
  bottom: -60px;
  left: -80px;
  opacity: 0.06;
}

.orb-aliado {
  opacity: 0.15;
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
