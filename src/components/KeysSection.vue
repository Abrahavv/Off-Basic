<script setup>
import { computed, ref } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');
const revealRef = useScrollReveal();

const activeKey = ref(1);

// --- TILT LOGIC ---
const mainKeyRef = ref(null);

// Simplified tilt for performance
const handleTilt = (e, el) => {
  if (!el || window.innerWidth < 768) return;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
  const centerX = rect.width / 2;
  const rotY = (x - centerX) / 15;
  el.style.transform = `perspective(1000px) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
};

const resetTilt = (el) => {
  if (!el) return;
  el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
};

const handleMouseMove = (e) => handleTilt(e, mainKeyRef.value);
const handleMouseLeave = () => resetTilt(mainKeyRef.value);

// Sidebar keys tilt refs
const sidebarKeyRefs = ref([]);
const handleSidebarTilt = (e, index) => handleTilt(e, sidebarKeyRefs.value[index]);
const resetSidebarTilt = (index) => resetTilt(sidebarKeyRefs.value[index]);

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

const keys = [
  {
    id: 1,
    number: '01 DE 03',
    title: 'Llave Aliado',
    subtitle: 'Tu primer acceso al Baúl. El pack de recursos, herramientas y sistemas que necesitas para dejar de improvisar y empezar a facturar al nivel de los mejores.',
    status: 'DISPONIBLE',
    image: '/Llave Aliado.png',
    price: '19,99$',
    benefits: [
      'Pack de Catálogo Premium',
      'Material de Marketing de alta gama',
      'Checklist del Aliado Profesional',
      'Guía de aplicación de los recursos',
      'Acceso exclusivo de por vida'
    ]
  },
  {
    id: 2,
    number: '02 DE 03',
    title: 'Llave Mentoría',
    subtitle: 'Sesiones personalizadas para acelerar tu crecimiento y dominar las estrategias de venta avanzada.',
    status: 'PRÓXIMAMENTE',
    image: '/Llave Oro.png',
    locked: true
  },
  {
    id: 3,
    number: '03 DE 03',
    title: 'Llave Maestra',
    subtitle: 'El acceso total. Todos los recursos, sistemas avanzados para escalar sin límites.',
    status: 'PRÓXIMAMENTE',
    image: '/Llave Diamante.png',
    locked: true
  }
];

const currentKey = computed(() => keys.find(k => k.id === activeKey.value));
</script>

<template>
  <section class="keys-showcase" v-if="isAliado">
    <div class="container scroll-reveal slide-up" ref="revealRef">
      
      <div class="keys-header">
        <span class="keys-count-badge">1 DE 3 DISPONIBLES</span>
        <h2 class="section-title">Tu oportunidad de entrar al Baúl</h2>
      </div>

      <div class="keys-grid">
        <!-- LEFT: Active Key Display -->
        <div class="active-key-panel">
          <div class="active-header">
            <span class="status-badge" :class="{ 'status-available': !currentKey.locked }">
              ● {{ currentKey.status }}
            </span>
          </div>

          <div 
            class="key-visual-main"
            @mousemove="handleMouseMove" 
            @mouseleave="handleMouseLeave"
            @touchstart="handleMouseMove"
            @touchmove="handleMouseMove"
            @touchend="handleMouseLeave"
          >
            <div class="glow-container">
              <div class="main-glow"></div>
              <div class="key-floater-clean">
                <img 
                  ref="mainKeyRef"
                  :src="currentKey.image" 
                  alt="Key Image" 
                  class="main-key-img" 
                  loading="lazy" 
                />
              </div>
            </div>
          </div>

          <div class="key-info-main">
            <span class="key-number">LLAVE {{ currentKey.number }}</span>
            <h2 class="key-title">{{ currentKey.title }}</h2>
            <p class="key-subtitle">{{ currentKey.subtitle }}</p>

            <ul class="benefits-list" v-if="currentKey.benefits">
              <li v-for="benefit in currentKey.benefits" :key="benefit" class="benefit-item">
                <span class="check-icon">✓</span>
                {{ benefit }}
              </li>
            </ul>

            <div class="cta-area" v-if="!currentKey.locked">
              <button class="btn-primary buy-key-btn" @click="scrollToProducts">
                Acceder
              </button>
              <p class="cta-hint">Garantía · Pago único · Sin suscripciones</p>
            </div>
          </div>
        </div>

        <!-- RIGHT: Sidebar with Other Keys -->
        <div class="keys-sidebar">
          <div 
            v-for="(key, index) in keys" 
            :key="key.id" 
            class="sidebar-card"
            :class="{ 
              'active-card': activeKey === key.id, 
              'locked-card': key.locked,
              'key-aliado': key.id === 1,
              'key-mentoria': key.id === 2,
              'key-maestra': key.id === 3
            }"
            @click="key.locked ? null : activeKey = key.id"
            @mousemove="!key.locked && handleSidebarTilt($event, index)"
            @mouseleave="resetSidebarTilt(index)"
          >
            <div class="card-visual">
              <div class="key-floater-clean-sidebar">
                <img 
                  :ref="el => sidebarKeyRefs[index] = el"
                  :src="key.image" 
                  class="sidebar-key-img" 
                  loading="lazy" 
                />
              </div>
              <div class="card-glow"></div>
            </div>
            <div class="card-info">
              <span class="card-status">{{ key.status.split('·')[0] }}</span>
              <h4 class="card-title">{{ key.title }}</h4>
              <div class="progress-bar" v-if="key.locked">
                <div class="progress-track"></div>
                <span class="progress-label">PRÓXIMAMENTE</span>
              </div>
              <div class="progress-bar available" v-else>
                <div class="progress-track active"></div>
                <span class="progress-label">DISPONIBLE</span>
              </div>
            </div>
          </div>

          <div class="sidebar-footer-note">
            🚀 El Baúl no para de crecer. Consigue el acceso ahora.
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.keys-showcase {
  padding: 5rem 0;
  background-color: var(--bg); /* Match app dark background */
  color: var(--text);
  position: relative;
  overflow: hidden;
}

.keys-header {
  text-align: center;
  margin-bottom: 3.5rem;
  padding: 0 1rem;
}

.keys-count-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(0, 208, 255, 0.1);
  color: #00d0ff; /* App cyan */
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  margin-bottom: 1rem;
  border: 1px solid rgba(0, 208, 255, 0.2);
}

.keys-showcase .section-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -1.5px;
  max-width: 800px;
  margin: 0 auto;
}

.keys-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: flex-start;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
}

/* LEFT PANEL */
.active-key-panel {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 208, 255, 0.15); /* App Cyan */
  border-radius: 40px;
  padding: 4rem;
  position: relative;
  backdrop-filter: blur(20px);
  width: 100%;
  box-sizing: border-box;
}

.active-header {
  margin-bottom: 2rem;
}

.status-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-available {
  color: #00d0ff; /* App Cyan */
  background: rgba(0, 208, 255, 0.1);
}

.key-visual-main {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  width: 100%;
}

.glow-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-glow {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 208, 255, 0.2) 0%, transparent 70%); /* App Cyan */
  filter: blur(40px);
}

@keyframes keyFloat {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.main-key-img {
  width: 250px;
  max-width: 100%;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease-out;
  transform-origin: center center;
  will-change: transform;
}

.key-floater-clean,
.key-floater-clean-sidebar {
  animation: keyFloat 6s ease-in-out infinite;
}

.key-info-main {
  text-align: left;
  width: 100%;
}

.key-number {
  font-size: 0.8rem;
  color: rgba(0, 208, 255, 0.8); /* App Cyan */
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: block;
  letter-spacing: 2px;
}

.key-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: -2px;
}

.key-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #999;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #ddd;
}

.check-icon {
  color: #00d0ff; /* App Cyan */
  font-weight: 900;
}

.cta-area {
  margin-top: 2rem;
  width: 100%;
}

.buy-key-btn {
  width: 100%;
  padding: 1.25rem 2rem;
  background: #00d0ff; /* App Cyan */
  color: #000;
  border-radius: 12px;
  font-weight: 900;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.buy-key-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(0, 208, 255, 0.4);
}

.price-tag {
  background: rgba(0,0,0,0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

.cta-hint {
  text-align: center;
  font-size: 0.75rem;
  color: #444;
  margin-top: 1rem;
}

/* SIDEBAR */
.keys-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.sidebar-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.sidebar-card.active-card {
  background: rgba(0, 208, 255, 0.05); /* App Cyan */
  border-color: rgba(0, 208, 255, 0.3);
}

.locked-card {
  opacity: 0.5;
  cursor: not-allowed;
}

.card-visual {
  width: 80px;
  height: 80px;
  background: rgba(0,0,0,0.3);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.card-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 25px;
  filter: blur(15px);
  opacity: 0.6;
}

/* Key-specific styling */
.key-aliado {
  border-color: rgba(0, 208, 255, 0.15); /* Blue */
}
.key-aliado.active-card {
  background: rgba(0, 208, 255, 0.05);
  border-color: rgba(0, 208, 255, 0.3);
}
.key-aliado .card-glow {
  background: radial-gradient(circle, rgba(0, 208, 255, 0.4) 0%, transparent 70%); 
}

.key-mentoria {
  border-color: rgba(255, 215, 0, 0.15); /* Gold */
}
.key-mentoria.active-card {
  background: rgba(255, 215, 0, 0.05);
  border-color: rgba(255, 215, 0, 0.3);
}
.key-mentoria .card-glow {
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%); 
}

.key-maestra {
  border-color: rgba(138, 43, 226, 0.15); /* Purple */
}
.key-maestra.active-card {
  background: rgba(138, 43, 226, 0.05);
  border-color: rgba(138, 43, 226, 0.3);
}
.key-maestra .card-glow {
  background: radial-gradient(circle, rgba(138, 43, 226, 0.4) 0%, transparent 70%); 
}

.sidebar-key-img {
  width: 50px;
  transition: transform 0.15s ease-out;
  transform-origin: center center;
  will-change: transform;
}

.sidebar-card:nth-child(2) .sidebar-key-img {
  animation-delay: -1.3s;
}

.sidebar-card:nth-child(3) .sidebar-key-img {
  animation-delay: -2.6s;
}

.sidebar-card:not(.locked-card):hover .sidebar-key-img {
  animation-play-state: paused;
}

.card-status {
  font-size: 0.65rem;
  font-weight: 800;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  display: block;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress-track {
  flex: 1;
  max-width: 100px;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.progress-track.active {
  background: #00d0ff; /* App Cyan */
}

.progress-label {
  font-size: 0.6rem;
  font-weight: 700;
  color: #444;
  white-space: nowrap;
}

.sidebar-footer-note {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 15px;
  background: rgba(0, 208, 255, 0.03); /* App Cyan */
  border: 1px dashed rgba(0, 208, 255, 0.2);
  font-size: 0.8rem;
  color: #888;
  text-align: center;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 968px) {
  .keys-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .keys-showcase {
    padding: 3rem 0;
  }
  
  .keys-showcase .section-title {
    font-size: clamp(2rem, 8vw, 2.5rem);
  }
  
  .active-key-panel {
    padding: 2rem;
    border-radius: 20px;
  }
  
  .key-title {
    font-size: 2.2rem;
  }
  
  .key-visual-main {
    height: 250px;
  }
  
  .main-key-img {
    width: 200px;
  }
  /* ANIM-07: Disable sidebar float animation on mobile */
  .sidebar-key-img, .key-floater-clean, .key-floater-clean-sidebar {
    animation: none !important;
  }
}

@media (max-width: 480px) {
  .active-key-panel {
    padding: 1.5rem;
  }
  
  .keys-showcase .section-title {
    font-size: clamp(1.8rem, 8vw, 2rem);
    line-height: 1.1;
  }

  .key-title {
    font-size: 2rem;
  }
  
  .key-subtitle {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .benefits-list {
    gap: 0.75rem;
  }
  
  .benefit-item {
    font-size: 0.9rem;
  }
}
</style>
