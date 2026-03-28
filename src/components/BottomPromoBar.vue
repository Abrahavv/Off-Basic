<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');
const isVisible = ref(false);

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

let scrollTicking = false;
const handleScroll = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    isVisible.value = window.scrollY > 500;
    scrollTicking = false;
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="bottom-bar">
      <div v-if="isVisible" class="bottom-promo-bar" :class="{ 'aliado-bg': isAliado }">
        <div class="bar-inner">
          <div class="bar-text">
            <span class="bar-fire" v-if="!isAliado">🔥</span>
            <span class="bar-fire" v-if="isAliado">🗝️</span>
            <span class="bar-label">{{ isAliado ? 'Pago único. Acceso inmediato.' : 'Sube de nivel. Unidades limitadas.' }}</span>
          </div>
          <button class="bar-cta" @click="scrollToProducts">
            {{ isAliado ? 'Acceder Al Baúl' : 'Comprar Ahora' }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.bottom-promo-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9990;
  background: #000000;
  padding: 0.65rem 1.25rem;
  padding-bottom: calc(0.65rem + env(safe-area-inset-bottom, 0px));
  transition: background-color 0.3s ease;
}

.bottom-promo-bar.aliado-bg {
  background-color: #121212;
}

.bar-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.bar-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bar-fire {
  font-size: 1.1rem;
}

.bar-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.3px;
}

.bar-cta {
  background: #00D0FF;
  color: #000000;
  border: none;
  padding: 0.55rem 1.75rem;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.bar-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 208, 255, 0.45);
  background: #00b8e6;
}

/* === Transition === */
.bottom-bar-enter-active {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.bottom-bar-leave-active {
  transition: transform 0.3s cubic-bezier(0.55, 0, 1, 0.45);
}
.bottom-bar-enter-from,
.bottom-bar-leave-to {
  transform: translateY(100%);
}

/* === Mobile === */
@media (max-width: 480px) {
  .bottom-promo-bar {
    padding: 0.5rem 1rem;
    padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px));
  }
  .bar-label {
    font-size: 0.8rem;
  }
  .bar-cta {
    padding: 0.5rem 1.25rem;
    font-size: 0.75rem;
  }
  .bar-fire {
    font-size: 1rem;
  }
}
</style>
