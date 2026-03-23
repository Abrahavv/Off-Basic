<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  mode: String
});

const emit = defineEmits(['switch-mode']);

const isAliado = computed(() => props.mode === 'aliado');

// Countdown Timer — 45 hours looping tracker
const TIMER_KEY = 'offbasic_timer_end';
const HOURS_45_MS = 45 * 60 * 60 * 1000;

const getTargetDate = () => {
  let endTime = localStorage.getItem(TIMER_KEY);
  const now = Date.now();
  
  if (!endTime || parseInt(endTime) <= now) {
    endTime = now + HOURS_45_MS;
    localStorage.setItem(TIMER_KEY, endTime.toString());
  }
  return parseInt(endTime);
};

const countdown = ref({ hours: 0, minutes: 0, seconds: 0 });
let timer = null;

const updateCountdown = () => {
  const target = getTargetDate();
  const diff = target - Date.now();
  
  if (diff <= 0) {
    localStorage.removeItem(TIMER_KEY);
    countdown.value = { hours: 0, minutes: 0, seconds: 0 };
    return;
  }
  
  countdown.value = {
    hours: Math.floor(diff / (1000 * 60 * 60)), // Total hours left
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
};

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

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
  <header class="navbar-wrapper">
    <!-- Countdown Bar (Both Modes) -->
    <div class="top-countdown-bar" :class="isAliado ? 'timer-bg-aliado' : 'timer-bg-personal'">
      <div class="countdown-center">
        <span class="countdown-text">PRECIO DE LANZAMIENTO · SOLO POR TIEMPO LIMITADO</span>
        <div class="countdown-timer">
          <div class="time-block">
            <span class="time-value">{{ countdown.hours < 10 ? '0' + countdown.hours : countdown.hours }}</span>
            <span class="time-label">HRS</span>
          </div>
          <span class="time-separator">:</span>
          <div class="time-block">
            <span class="time-value">{{ countdown.minutes < 10 ? '0' + countdown.minutes : countdown.minutes }}</span>
            <span class="time-label">MIN</span>
          </div>
          <span class="time-separator">:</span>
          <div class="time-block">
            <span class="time-value">{{ countdown.seconds < 10 ? '0' + countdown.seconds : countdown.seconds }}</span>
            <span class="time-label">SEG</span>
          </div>
        </div>
        <button class="btn-primary countdown-btn" @click="scrollToProducts">
          {{ isAliado ? 'Acceder ahora' : 'Comprar' }}
        </button>
      </div>
    </div>

    <div class="navbar">
      <div class="container nav-content">
      <div class="logo">
        <img 
          :src="isAliado ? '/Icono-web-Oscuro.png' : '/Icono-web-Claro.png'" 
          alt="Off Basic" 
          class="logo-img"
        />
        <span class="logo-text">OFF BASIC</span>
      </div>
      
      <div class="nav-controls">
        <!-- Mode Switcher -->
        <button 
          class="mode-toggle-btn" 
          @click="emit('switch-mode', isAliado ? 'personal' : 'aliado')"
        >
          {{ isAliado ? 'Cambiar a Personal' : 'Cambiar a Aliado' }}
        </button>

        <!-- Social Media -->
        <div class="social-links">
          <a href="https://instagram.com" target="_blank" class="social-icon" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" class="social-icon" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" class="social-icon" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.043-.074 1.957l-.008.104-.022.26-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.42c-.101-.38-.172-.883-.22-1.402l-.01-.104-.022-.26-.008-.104A18.857 18.857 0 0 1 .056 7.901v-.075c.001-.194.01-1.043.074-1.957l.008-.104.022-.26.01-.104c.048-.519.119 1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
            </svg>
          </a>
        </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.countdown-btn {
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  box-shadow: 0 4px 10px rgba(0, 208, 255, 0.3);
  color: #FFFFFF !important;
}

/* ===== MAIN NAVBAR ===== */
.top-countdown-bar {
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-bg-personal {
  background-color: var(--black);
}

.timer-bg-personal .countdown-text,
.timer-bg-personal .time-value,
.timer-bg-personal .time-separator {
  color: var(--bg);
}

.timer-bg-personal .time-label {
  color: rgba(255, 255, 255, 0.7);
}

.timer-bg-aliado {
  background-color: var(--accent);
}

.timer-bg-aliado .countdown-text,
.timer-bg-aliado .time-value,
.timer-bg-aliado .time-separator {
  color: var(--black);
}

.timer-bg-aliado .time-label {
  color: rgba(0, 0, 0, 0.6);
}

.timer-bg-aliado .countdown-btn {
  background-color: var(--black);
  color: #FFFFFF !important;
}

.countdown-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.countdown-text {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--accent);
}

.countdown-timer {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.time-value {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.time-label {
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 1px;
}

.digit-sep {
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
  margin: 0 0.1rem;
}

.navbar {
  background-color: var(--header-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--card-border);
  z-index: 1000;
  height: 70px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.logo-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.5px;
  color: var(--text);
  margin-top: 2px;
}

.logo:hover .logo-img {
  transform: scale(1.05);
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-icon {
  color: var(--text-muted);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
}

.social-icon:hover {
  color: var(--accent);
  background: rgba(0, 208, 255, 0.08);
  transform: translateY(-2px);
}

.mode-toggle-btn {
  background: transparent;
  border: 1px solid var(--card-border);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 0.5rem;
}

.mode-toggle-btn:hover {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

@media (max-width: 768px) {
  .top-countdown-bar {
    gap: 0.5rem;
    padding: 0.4rem 0.5rem;
  }
  .countdown-center {
    gap: 0.75rem;
  }
  .countdown-text {
    font-size: 0.65rem;
    white-space: nowrap;
  }
  .countdown-label {
    font-size: 0.65rem;
    text-align: center;
    width: 100%;
  }
  .navbar {
    height: 56px;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .logo-text {
    font-size: 0.95rem;
    margin-top: 1px;
  }
  .logo-img {
    height: 32px;
  }
  .social-links {
    gap: 0.25rem;
  }
  .social-icon {
    width: 32px;
    height: 32px;
  }
  .mode-toggle-btn {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
    margin-right: 0.2rem;
  }
}
</style>
