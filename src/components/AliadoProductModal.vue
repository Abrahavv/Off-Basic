<script setup>
import { watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  show: Boolean,
  product: Object
});

const emit = defineEmits(['close']);

// Lock body scroll when modal is open
watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

const handleOverlayClick = (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    emit('close');
  }
};

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.show) {
    emit('close');
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const getWhatsappUrl = (productName) => {
  const whatsappNumber = '1234567890';
  const msg = `¡Hola! Quiero la **Llave de acceso** para vender ${productName} al mayor y conocer más sobre los márgenes.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show && product" class="modal-overlay" @click="handleOverlayClick">
        <Transition name="scale">
          <div class="modal-content" @click.stop>
            <!-- Close Button -->
            <button class="close-btn" @click="emit('close')" aria-label="Cerrar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <div class="modal-grid">
              <!-- Left: Image Section -->
              <div class="visual-section">
                <div class="main-image-wrap">
                  <img :src="product.image" :alt="product.name" class="main-modal-img" />
                  
                  <!-- Profit Margin Badge Overlay -->
                  <div class="profit-badge" v-if="product.stats?.margin">
                    <span class="profit-value">{{ product.stats.margin }}%</span>
                    <span class="profit-label">Margen de Ganancia</span>
                  </div>
                </div>
                
                <!-- Quick Stats Row -->
                <div class="quick-stats-row" v-if="product.stats">
                  <div class="quick-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>Alta Rotación</span>
                  </div>
                  <div class="quick-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>Rentabilidad Comprobada</span>
                  </div>
                </div>
              </div>

              <!-- Right: Info & Stats Section -->
              <div class="info-section">
                <div class="aliado-badge">Oportunidad de Negocio</div>
                <h2 class="modal-title">{{ product.name }}</h2>
                
                <p class="modal-desc">{{ product.description }}</p>

                <!-- Statistics Grid -->
                <div class="stats-grid" v-if="product.stats">
                  <div class="stat-card">
                    <span class="stat-title">Retorno (ROI)</span>
                    <span class="stat-number accent">{{ product.stats.roi }}</span>
                  </div>
                  <div class="stat-card">
                    <span class="stat-title">Demanda Mensual</span>
                    <span class="stat-number text">{{ product.stats.demand }}</span>
                  </div>
                  <div class="stat-card">
                    <span class="stat-title">Pedido Mínimo</span>
                    <span class="stat-number text">{{ product.stats.minOrder }} unid.</span>
                  </div>
                </div>

                <!-- Sales Histogram -->
                <div class="sales-chart-wrapper" v-if="product.histogram">
                  <h4 class="chart-title">Proyección de Ventas (Últimos 6 meses)</h4>
                  <div class="histogram">
                    <div class="bar-col" v-for="data in product.histogram" :key="data.month">
                      <div class="bar-track">
                        <div class="bar-fill" :style="{ height: data.percent + '%' }">
                          <span class="bar-tooltip">{{ data.value }} ventas</span>
                        </div>
                      </div>
                      <span class="bar-label">{{ data.month }}</span>
                    </div>
                  </div>
                </div>

                <!-- CTA -->
                <div class="cta-wrapper">
                  <a 
                    :href="getWhatsappUrl(product.name)" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn-primary modal-buy-btn"
                  >
                    <img src="/Llave Diamante.png" class="btn-icon" alt="Llave" />
                    Obtener Llave para Vender
                  </a>
                  <p class="cta-disclaimer">Accede al precio mayorista y catálogo completo.</p>
                </div>

              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-content {
  background: var(--bg);
  width: 100%;
  max-width: 1100px;
  max-height: 92vh;
  border-radius: 20px;
  position: relative;
  overflow-y: auto;
  border: 1px solid var(--card-border);
  box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 208, 255, 0.1);
}

.modal-content::-webkit-scrollbar { width: 6px; }
.modal-content::-webkit-scrollbar-track { background: transparent; }
.modal-content::-webkit-scrollbar-thumb { background: var(--gray); border-radius: 3px; }

.close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--text);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--accent);
  color: var(--black);
  transform: rotate(90deg);
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  min-height: 600px;
}

/* ===== LEFT: VISUAL REF ===== */
.visual-section {
  padding: 2.5rem;
  background: linear-gradient(145deg, var(--bg-alt), rgba(0, 208, 255, 0.03));
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-right: 1px solid var(--card-border);
}

.main-image-wrap {
  position: relative;
  aspect-ratio: 1;
  background: var(--white);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.main-modal-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15));
}

.profit-badge {
  position: absolute;
  top: -15px;
  right: -15px;
  background: linear-gradient(135deg, var(--accent), #00a2ff);
  color: var(--black);
  width: 110px;
  height: 110px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 208, 255, 0.4);
  transform: rotate(10deg);
  border: 4px solid var(--bg);
}

.profit-value {
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -1px;
}

.profit-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.8;
  margin-top: 2px;
  padding: 0 10px;
}

.quick-stats-row {
  display: flex;
  gap: 1rem;
}

.quick-stat {
  flex: 1;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.quick-stat svg {
  color: var(--accent);
}

/* ===== RIGHT: INFO & STATS ===== */
.info-section {
  padding: 3rem;
  display: flex;
  flex-direction: column;
}

.aliado-badge {
  display: inline-block;
  width: fit-content;
  background: rgba(0, 208, 255, 0.1);
  color: var(--accent);
  border: 1px solid rgba(0, 208, 255, 0.3);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  letter-spacing: -1px;
  line-height: 1.1;
}

.modal-desc {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-muted);
  font-weight: 300;
  margin-bottom: 2rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 1.25rem 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.stat-title {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.stat-number.accent { color: var(--accent); }
.stat-number.text { color: var(--text); }

/* Histogram */
.sales-chart-wrapper {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.chart-title {
  font-size: 0.9rem;
  color: var(--text);
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.histogram {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 140px;
  padding: 0 1rem;
  gap: 0.5rem;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.bar-track {
  width: 100%;
  max-width: 32px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(to top, rgba(0, 208, 255, 0.4), var(--accent));
  border-radius: 6px;
  position: relative;
  transition: height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.bar-fill:hover {
  filter: brightness(1.2);
}

.bar-tooltip {
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--card-bg);
  border: 1px solid var(--accent);
  color: var(--text);
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  white-space: nowrap;
}

.bar-fill:hover .bar-tooltip {
  opacity: 1;
}

.bar-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
}

/* CTA */
.cta-wrapper {
  margin-top: auto;
}

.modal-buy-btn {
  width: 100%;
  padding: 1.1rem;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 12px;
  font-weight: 800;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, var(--accent), #00a2ff);
  border: none;
  color: var(--black);
}

.modal-buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(0, 208, 255, 0.3);
}

.btn-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.cta-disclaimer {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 1rem;
}

/* ===== ANIMATIONS ===== */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.scale-enter-active, .scale-leave-active { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease; }
.scale-enter-from, .scale-leave-to { transform: scale(0.92) translateY(20px); opacity: 0; }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .modal-grid { grid-template-columns: 1fr; }
  .visual-section { border-right: none; border-bottom: 1px solid var(--card-border); padding: 1.5rem; }
  .info-section { padding: 1.5rem; }
  .stats-grid { grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; }
  .stat-card { padding: 1rem 0.5rem; }
  .stat-number { font-size: 1.25rem; }
}

@media (max-width: 600px) {
  .stats-grid { grid-template-columns: 1fr; }
  .profit-badge { width: 80px; height: 80px; top: -10px; right: -10px; }
  .profit-value { font-size: 1.3rem; }
  .profit-label { font-size: 0.55rem; }
  .quick-stats-row { flex-direction: column; }
  .histogram { padding: 0; }
  .bar-track { max-width: 24px; }
}
</style>
