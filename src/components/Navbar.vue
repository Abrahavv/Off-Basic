<script setup>
import { computed } from 'vue';

const props = defineProps({
  mode: String
});

const emit = defineEmits(['toggle-mode']);

const isDark = computed(() => props.mode === 'afiliado');
</script>

<template>
  <header class="navbar">
    <div class="container nav-content">
      <div class="logo">
        <img 
          :src="isDark ? '/OFF-BASIC-IMAGOTIPO-1-BLANCO-PNG.png' : '/OFF-BASIC-IMAGOTIPO-1-NEGRO-PNG.png'" 
          alt="Off Basic Logo" 
          class="logo-img"
          :class="{ 'logo-dark': isDark }"
        />
      </div>
      
      <div class="nav-controls">
        <!-- Social Media Icons -->
        <div class="social-links">
          <a href="https://instagram.com" target="_blank" class="social-icon" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" class="social-icon" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" class="social-icon" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.043-.074 1.957l-.008.104-.022.26-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.367-.102-2.833-.228a2.007 2.007 0 0 1-1.415-1.42c-.101-.38-.172-.883-.22-1.402l-.01-.104-.022-.26-.008-.104C.065 8.944.057 8.088.056 7.901v-.075c.001-.194.01-1.043.074-1.957l.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
            </svg>
          </a>
        </div>

        <span class="mode-label">{{ isDark ? 'Modo VIP Afiliado' : 'Modo Mercado' }}</span>
        <button 
          class="theme-toggle" 
          :class="{ 'is-dark': isDark }"
          @click="emit('toggle-mode')"
          aria-label="Toggle Theme"
        >
          <div class="toggle-circle"></div>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--header-bg);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid var(--card-border);
  z-index: 1000;
  height: 110px; /* Increased from 90px */
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
  padding: 0;
}

.logo-img {
  height: 85px; /* Increased from 60px for better visibility */
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-dark {
  filter: drop-shadow(0 0 8px rgba(0, 208, 255, 0.5));
}

.logo:hover .logo-img {
  transform: scale(1.05);
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  padding-right: 1.5rem;
  border-right: 1px solid var(--card-border);
}

.social-icon {
  color: var(--text-color-muted);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon:hover {
  color: var(--accent-color);
  transform: translateY(-2px);
}

.mode-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: 0.5px;
}

.theme-toggle {
  width: 60px;
  height: 32px;
  border-radius: 30px;
  background-color: var(--card-border);
  border: 2px solid var(--accent-color);
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 0 4px;
}

.toggle-circle {
  width: 20px;
  height: 20px;
  background-color: var(--accent-color);
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.theme-toggle.is-dark .toggle-circle {
  transform: translateX(28px);
  background-color: #fff;
  box-shadow: 0 0 12px var(--accent-color);
}

@media (max-width: 768px) {
  .mode-label {
    display: none;
  }
  .social-links {
    padding-right: 0.5rem;
    gap: 0.75rem;
  }
  .navbar {
    height: 70px;
  }
  .logo-img {
    height: 40px;
  }
}
</style>
