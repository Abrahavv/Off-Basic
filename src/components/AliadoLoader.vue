<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  inline: Boolean
});

const emit = defineEmits(['finished']);

const count = ref(5);
const progress = ref(100);
const currentPhrase = ref('AUTENTICANDO CREDENCIALES DE ALIADO...');

const phrases = [
  'ESTABLECIENDO ENLACE SEGURO...',
  'ACCEDIENDO...',
  'DESBLOQUEANDO BAÚL DE ALTO INVENTARIO DE ALIADOS...',
  'INICIALIZANDO PORTAL...',
  'CONEXIÓN EXITOSA. BIENVENIDO A OFF BASIC ALIADOS.'
];

let timer = null;

const startCountdown = () => {
  timer = setInterval(() => {
    if (count.value > 1) {
      count.value--;
      progress.value = (count.value / 5) * 100;
      currentPhrase.value = phrases[5 - count.value] || phrases[phrases.length - 1];
    } else {
      count.value = 0;
      progress.value = 0;
      currentPhrase.value = 'ACCEDIENDO AL PORTAL...';
      clearInterval(timer);
      setTimeout(() => {
        emit('finished');
      }, 1000); // smooth exit transition
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});
</script>

<template>
  <div class="loader-overlay" :class="{ 'is-inline': props.inline }">
    <!-- Premium luxury ambient lighting -->
    <div class="ambient-glow gold-glow"></div>
    <div class="ambient-glow bronze-glow"></div>

    <div class="loader-container">
      <!-- Premium Badge with Neumorphic + Glass look -->
      <div class="premium-badge">
        <span class="pulse-dot"></span>
        <span class="badge-text">ACCESO A ALIADOS</span>
      </div>

      <!-- Main Neumorphic/Glass Globe for Countdown -->
      <div class="countdown-globe-wrapper">
        <div class="countdown-globe" :key="count">
          <span class="count-number">{{ count }}</span>
          <div class="globe-inner-ring"></div>
        </div>
      </div>

      <!-- Premium High Ticket Label -->
      <p class="premium-subtitle">PORTAL EXCLUSIVO DE NEGOCIOS</p>

      <!-- Glassmorphic Status Section -->
      <div class="status-box">
        <!-- Progress Bar inside glass slot -->
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>

        <!-- Dynamic status phrases -->
        <div class="phrases-wrapper">
          <p class="status-phrase animate-text">{{ currentPhrase }}</p>
          <div class="encryption-key">
            <span>SECURE KEY: ALIANZAS-0x{{ count }}B7F</span>
            <span class="secure-badge">
              <span class="secure-icon">🛡️</span>
              ENCRIPTACIÓN SSL-256
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0b0c10;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  font-family: var(--font);
  overflow: hidden;
}

.loader-overlay.is-inline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: rgba(11, 12, 16, 0.95);
  z-index: 10;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Luxury ambient background glows */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.2;
  pointer-events: none;
  z-index: 1;
}

.gold-glow {
  width: 50vw;
  height: 50vw;
  top: -10vw;
  right: -10vw;
  background: radial-gradient(circle, var(--accent, #00D0FF), rgba(0, 208, 255, 0.3));
}

.bronze-glow {
  width: 60vw;
  height: 60vw;
  bottom: -15vw;
  left: -15vw;
  background: radial-gradient(circle, rgba(0, 208, 255, 0.4), #000000);
}

/* Neumorphic + Glassmorphic Premium Container */
.loader-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.5rem 2.5rem;
  max-width: 480px;
  width: 90%;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(0, 208, 255, 0.2);
  border-radius: 30px;
  /* Dual layer shadow for Neumorphism feel over dark space */
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    inset 0 10px 20px rgba(0, 208, 255, 0.05);
}

/* Premium Badge */
.premium-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 3px;
  color: var(--accent, #00D0FF);
  background: linear-gradient(135deg, rgba(0, 208, 255, 0.12) 0%, rgba(0, 0, 0, 0.4) 100%);
  border: 1px solid rgba(0, 208, 255, 0.35);
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 208, 255, 0.15);
  margin-bottom: 2rem;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background-color: var(--accent, #00D0FF);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent, #00D0FF);
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(0.9); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 15px var(--accent, #00D0FF); }
}

.badge-text {
  background: linear-gradient(90deg, #ffffff, var(--accent, #00D0FF));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Globe Glass-Neumorphism */
.countdown-globe-wrapper {
  margin-bottom: 2rem;
}

.countdown-globe {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 208, 255, 0.02) 100%);
  border: 1px solid rgba(0, 208, 255, 0.35);
  /* Double shadow for Neumorphic sphere projection */
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.6),
    inset 0 4px 15px rgba(255, 255, 255, 0.1),
    inset 0 -4px 15px rgba(0, 0, 0, 0.8),
    0 0 30px rgba(0, 208, 255, 0.15);
  animation: globePulse 2s ease-in-out infinite alternate;
}

.count-number {
  font-family: var(--font);
  font-size: 5rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 208, 255, 0.7);
  z-index: 2;
  animation: numberPop 1s ease-out infinite;
}

.globe-inner-ring {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  border: 1px dashed rgba(0, 208, 255, 0.35);
  animation: spinRing 20s linear infinite;
}

@keyframes spinRing {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes globePulse {
  0% { box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 208, 255, 0.1); }
  100% { box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 208, 255, 0.3); border-color: rgba(0, 208, 255, 0.6); }
}

@keyframes numberPop {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.95; }
}

/* Premium Typography */
.premium-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 4px;
  color: #ffffff;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 30%, var(--accent, #00D0FF) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.premium-subtitle {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 6px;
  color: rgba(0, 208, 255, 0.75);
  margin: 0.5rem 0 2rem 0;
  text-transform: uppercase;
}

/* Status Glass Container */
.status-box {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* Progress bar inside a glass groove */
.progress-container {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.2rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 208, 255, 0.5), var(--accent, #00D0FF), #ffffff);
  box-shadow: 0 0 12px rgba(0, 208, 255, 0.6);
  transition: width 1s linear;
}

/* Phrase descriptions styling */
.phrases-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-phrase {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #e5e5e5;
  text-transform: uppercase;
  min-height: 20px;
  margin: 0;
}

.animate-text {
  animation: textFlicker 0.3s ease-in-out;
}

@keyframes textFlicker {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

.encryption-key {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: monospace;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 0.75rem;
  margin-top: 0.25rem;
}

.secure-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--accent, #00D0FF);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.secure-icon {
  font-size: 0.7rem;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .loader-container {
    padding: 2.5rem 1.5rem;
  }
  .premium-badge {
    font-size: 0.65rem;
    padding: 0.5rem 1.2rem;
  }
  .countdown-globe {
    width: 120px;
    height: 120px;
  }
  .count-number {
    font-size: 4rem;
  }
  .premium-title {
    font-size: 1.2rem;
  }
}
/* Inline specific overrides */
.loader-overlay.is-inline .loader-container {
  padding: 1.5rem;
  max-width: 100%;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  justify-content: center;
}

.loader-overlay.is-inline .premium-badge {
  margin-bottom: 0.8rem;
  padding: 0.4rem 1rem;
}

.loader-overlay.is-inline .countdown-globe {
  width: 110px;
  height: 110px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.loader-overlay.is-inline .count-number {
  font-size: 3.5rem;
}

.loader-overlay.is-inline .premium-title {
  font-size: 1.1rem;
}

.loader-overlay.is-inline .premium-subtitle {
  margin: 0.3rem 0 1rem 0;
  font-size: 0.55rem;
}

.loader-overlay.is-inline .status-box {
  padding: 1rem;
  border-radius: 12px;
}
</style>

