<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['finished']);

const count = ref(5);
const progress = ref(100);
const currentPhrase = ref('AUTENTICANDO CREDENCIALES DE SOCIO...');

const phrases = [
  'ESTABLECIENDO ENLACE SEGURO CON CARACAS...',
  'DESBLOQUEANDO BAÚL DE ALTO INVENTARIO...',
  'PREPARANDO VIDEO DE VENTA EXCLUSIVO (VSL)...',
  'CARGANDO ACCESO PRIVADO A OFF BASIC...',
  'CONEXIÓN EXITOSA. BIENVENIDO A OFF BASIC ALIANZAS.'
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
      currentPhrase.value = 'ACCEDIENDO...';
      clearInterval(timer);
      setTimeout(() => {
        emit('finished');
      }, 800); // smooth exit transition
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});
</script>

<template>
  <div class="loader-overlay">
    <!-- Futuristic cyber rings backdrop -->
    <div class="tech-bg">
      <div class="ring ring-outer"></div>
      <div class="ring ring-middle"></div>
      <div class="ring ring-inner"></div>
      <div class="laser-line"></div>
    </div>

    <div class="loader-content">
      <!-- Golden/Cyan badge -->
      <div class="premium-badge">
        <span class="lock-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          </svg>
        </span>
        ACCESO EXCLUSIVO PARA SOCIOS
      </div>

      <!-- Main Pulsing Countdown -->
      <div class="countdown-display" :key="count">
        <span class="count-number">{{ count }}</span>
        <div class="glow-ring"></div>
      </div>

      <!-- Linear visual status bar -->
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- Tech descriptions -->
      <div class="phrases-wrapper">
        <p class="status-phrase animate-text">{{ currentPhrase }}</p>
        <div class="encryption-key">
          <span>KEY SHA-256 ID: 0x9f88a...</span>
          <span class="blink">● SECURE PORT</span>
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
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* Background Cyberpunk Hologram styling */
.tech-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0.15;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed #00D0FF;
  will-change: transform;
}

.ring-outer {
  width: 80vmax;
  height: 80vmax;
  animation: rotateClockwise 25s linear infinite;
}

.ring-middle {
  width: 55vmax;
  height: 55vmax;
  border-style: double;
  border-width: 3px;
  border-color: rgba(0, 208, 255, 0.4);
  animation: rotateCounterClockwise 18s linear infinite;
}

.ring-inner {
  width: 30vmax;
  height: 30vmax;
  border-style: dotted;
  animation: rotateClockwise 12s linear infinite;
}

.laser-line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00D0FF, transparent);
  animation: scanVertical 4s ease-in-out infinite;
}

@keyframes rotateClockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotateCounterClockwise {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes scanVertical {
  0% { transform: translateY(-50vh); }
  50% { transform: translateY(50vh); }
  100% { transform: translateY(-50vh); }
}

/* Main Content elements */
.loader-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 450px;
  width: 90%;
  text-align: center;
}

.premium-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #00D0FF;
  background: rgba(0, 208, 255, 0.08);
  border: 1px solid rgba(0, 208, 255, 0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 208, 255, 0.1);
  margin-bottom: 2rem;
  animation: pulseBadge 2s infinite alternate;
}

.lock-icon {
  display: flex;
  align-items: center;
  animation: lockBounce 1s infinite alternate;
}

@keyframes lockBounce {
  from { transform: translateY(0); }
  to { transform: translateY(-2px); }
}

@keyframes pulseBadge {
  0% { box-shadow: 0 0 10px rgba(0, 208, 255, 0.1); border-color: rgba(0, 208, 255, 0.3); }
  100% { box-shadow: 0 0 25px rgba(0, 208, 255, 0.35); border-color: rgba(0, 208, 255, 0.8); }
}

/* Big Countdown Display styling */
.countdown-display {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.count-number {
  font-family: 'Bruno Ace SC', 'Syne', sans-serif;
  font-size: 5.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 35px rgba(0, 208, 255, 0.8),
               0 0 60px rgba(0, 208, 255, 0.4);
  line-height: 1;
  z-index: 2;
  animation: numberPulse 1s ease-out infinite;
}

.glow-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #00D0FF;
  box-shadow: 0 0 25px rgba(0, 208, 255, 0.4),
              inset 0 0 25px rgba(0, 208, 255, 0.4);
  animation: ringPulse 1s ease-out infinite;
  z-index: 1;
}

@keyframes numberPulse {
  0% { transform: scale(0.85); opacity: 0.5; }
  15% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.9; }
}

@keyframes ringPulse {
  0% { transform: scale(0.9); opacity: 0.3; }
  50% { transform: scale(1.08); opacity: 0.9; }
  100% { transform: scale(1.15); opacity: 0; }
}

/* Linear progress line */
.progress-container {
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00D0FF, #FFFFFF);
  box-shadow: 0 0 10px #00D0FF;
  transition: width 1s linear;
}

/* Phrase descriptions styling */
.phrases-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-phrase {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: #E2E8F0;
  text-transform: uppercase;
  min-height: 24px;
}

.animate-text {
  animation: textFlicker 0.3s ease-in-out;
}

@keyframes textFlicker {
  0% { opacity: 0.3; transform: scale(0.98); }
  50% { opacity: 0.8; }
  100% { opacity: 1; transform: scale(1); }
}

.encryption-key {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Courier New', monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.75rem;
  margin-top: 0.25rem;
}

.blink {
  color: #00FF66;
  text-shadow: 0 0 5px #00FF66;
  animation: blinkAnim 1.5s step-end infinite;
}

@keyframes blinkAnim {
  50% { opacity: 0; }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .premium-badge {
    font-size: 0.65rem;
    padding: 0.5rem 1rem;
  }
  .count-number {
    font-size: 4.5rem;
  }
  .countdown-display {
    width: 130px;
    height: 130px;
    margin-bottom: 2rem;
  }
  .status-phrase {
    font-size: 0.75rem;
  }
}
</style>
