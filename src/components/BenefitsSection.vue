<script setup>
import { useScrollReveal } from '../composables/useScrollReveal';

const benefits = [
  {
    id: '01',
    title: 'Precios al Mayor',
    description: 'Accede a márgenes exclusivos diseñados para maximizar la rentabilidad de tu negocio.',
    icon: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>` // Price Tag
  },
  {
    id: '02',
    title: 'Soporte Prioritario',
    description: 'Atención técnica y comercial de primer nivel con línea directa para aliados.',
    icon: `<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />` // Tech Shield
  },
  {
    id: '03',
    title: 'Red Exclusiva',
    description: 'Forma parte de un ecosistema de networking y formación continua para el éxito.',
    icon: `<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>` // Network
  },
  {
    id: '04',
    title: 'Material de Venta',
    description: 'Contenido visual de alta gama: fotografía y video profesional para tus canales.',
    icon: `<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />` // Tech Image
  }
];

const revealRef = useScrollReveal();
</script>

<template>
  <section class="benefits-section">
    <div class="container scroll-reveal scale-up" ref="revealRef">
      <h2 class="section-title">¿Por qué ser Aliado?</h2>
      <p class="section-subtitle">Ecosistema diseñado para el alto rendimiento comercial.</p>
      
      <div class="premium-infographic">
        
        <!-- Left Side -->
        <div class="benefit-col left-col">
          <div class="premium-pill p-01">
            <div class="pill-text">
              <h3>{{ benefits[0].title }}</h3>
              <p>{{ benefits[0].description }}</p>
            </div>
            <div class="pill-node">
              <div class="node-glow"></div>
              <svg viewBox="0 0 24 24" v-html="benefits[0].icon"></svg>
            </div>
          </div>
          <div class="premium-pill p-03">
            <div class="pill-text">
              <h3>{{ benefits[2].title }}</h3>
              <p>{{ benefits[2].description }}</p>
            </div>
            <div class="pill-node">
              <div class="node-glow"></div>
              <svg viewBox="0 0 24 24" v-html="benefits[2].icon"></svg>
            </div>
          </div>
        </div>

        <!-- Central Hub -->
        <div class="tech-hub">
          <div class="hub-outer-ring"></div>
          <div class="hub-scanner"></div>
          <div class="hub-main">
            <div class="hub-segment s1"><span>01</span></div>
            <div class="hub-segment s2"><span>02</span></div>
            <div class="hub-segment s3"><span>03</span></div>
            <div class="hub-segment s4"><span>04</span></div>
            <div class="hub-core">
              <img src="/Off-Basic-Web-Cromado.png" alt="Logo" class="hub-logo" />
            </div>
          </div>
          <!-- Connection Lines SVG -->
          <svg class="hub-connections" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(0,208,255,0.05)" stroke-width="1" />
            <path d="M200 40 L200 80 M360 200 L320 200 M200 360 L200 320 M40 200 L80 200" stroke="rgba(0,208,255,0.2)" stroke-width="2" />
          </svg>
        </div>

        <!-- Right Side -->
        <div class="benefit-col right-col">
          <div class="premium-pill p-02">
            <div class="pill-node">
              <div class="node-glow"></div>
              <svg viewBox="0 0 24 24" v-html="benefits[1].icon"></svg>
            </div>
            <div class="pill-text">
              <h3>{{ benefits[1].title }}</h3>
              <p>{{ benefits[1].description }}</p>
            </div>
          </div>
          <div class="premium-pill p-04">
            <div class="pill-node">
              <div class="node-glow"></div>
              <svg viewBox="0 0 24 24" v-html="benefits[3].icon"></svg>
            </div>
            <div class="pill-text">
              <h3>{{ benefits[3].title }}</h3>
              <p>{{ benefits[3].description }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits-section {
  padding: 8rem 0;
  background-color: var(--bg);
  position: relative;
  overflow: hidden;
}

.premium-infographic {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 5rem;
  position: relative;
  max-width: 1200px;
  margin-inline: auto;
}

/* === Info Columns === */
.benefit-col {
  display: flex;
  flex-direction: column;
  gap: 7rem;
  flex: 1;
}

.premium-pill {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pill-text {
  flex: 1;
}

.left-col .pill-text { text-align: right; }
.right-col .pill-text { text-align: left; }

.pill-text h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
  letter-spacing: 0.5px;
}

.pill-text p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 300px;
}

.left-col .pill-text p { margin-left: auto; }

.pill-node {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  color: var(--accent);
}

.node-glow {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.pill-node svg {
  width: 32px;
  height: 32px;
  position: relative;
  z-index: 2;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
}

.premium-pill:hover {
  transform: translateX(var(--hover-slide, 10px));
}

.left-col .premium-pill { --hover-slide: -10px; }
.right-col .premium-pill { --hover-slide: 10px; }

.premium-pill:hover .pill-node {
  background: var(--accent);
  color: var(--black);
  transform: scale(1.1);
  box-shadow: 0 0 30px var(--accent);
}

.premium-pill:hover .node-glow {
  opacity: 0.5;
}

/* === Tech Hub === */
.tech-hub {
  position: relative;
  width: 340px;
  height: 340px;
  flex-shrink: 0;
}

.hub-outer-ring {
  position: absolute;
  top: -20px; left: -20px; right: -20px; bottom: -20px;
  border: 1px dashed rgba(0, 208, 255, 0.1);
  border-radius: 50%;
  animation: rotateHub 60s linear infinite;
}

.hub-scanner {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0deg, rgba(0, 208, 255, 0.15) 60deg, transparent 90deg);
  animation: rotateHub 10s linear infinite;
  z-index: 1;
}

.hub-main {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(15px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 0 60px rgba(0,0,0,0.5);
  position: relative;
  z-index: 2;
}

.hub-segment {
  border: 0.5px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: rgba(255,255,255,0.1);
  transition: all 0.5s ease;
}

.hub-core {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: var(--bg);
  border: 1px solid rgba(0, 208, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  box-shadow: 0 0 40px rgba(0,208,255,0.1);
}

.hub-logo {
  width: 70px;
  height: auto;
  opacity: 0.9;
}

.hub-connections {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 3;
}

/* Animation Hub Hooks */
@keyframes rotateHub {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.tech-hub:hover .hub-segment {
  color: var(--accent);
  background: rgba(0, 208, 255, 0.03);
}

/* === Responsive === */
@media (max-width: 1100px) {
  .premium-infographic {
    flex-direction: column;
    gap: 4rem;
  }
  
  .tech-hub { order: -1; scale: 0.85; }
  
  .benefit-col {
    flex-direction: row;
    gap: 3rem;
    width: 100%;
    justify-content: center;
  }

  .premium-pill { width: 45%; max-width: 350px; }
  .left-col .pill-text { text-align: left; order: 2; }
  .left-col .pill-node { order: 1; }
  .left-col .premium-pill { --hover-slide: 10px; }
}

@media (max-width: 768px) {
  .benefit-col { flex-direction: column; align-items: center; gap: 2.5rem; }
  .premium-pill { width: 100%; max-width: 400px; }
  .tech-hub { scale: 0.7; margin-top: -2rem; }
}
</style>
