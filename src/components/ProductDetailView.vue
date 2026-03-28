<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCart } from '../composables/useCart';
import { WHATSAPP_NUMBER } from '../config.js';

const { addToCart, openCart, cartCount } = useCart();

const props = defineProps({
  product: Object,
  isAliado: Boolean
});

const emit = defineEmits(['close']);

const activeImageIndex = ref(0);
const activeTab = ref('features');
const quantity = ref(1);

const getWhatsappUrl = (productName, price) => {
  if (props.isAliado) {
    const msg = `¡Hola! Quiero la **Llave de acceso** para vender ${productName} al mayor y conocer más sobre los márgenes.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }
  const msg = `¡Hola! Vi la web y quiero mi ${productName} ($${price}).`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

const incrementQty = () => { if (quantity.value < 10) quantity.value++; };
const decrementQty = () => { if (quantity.value > 1) quantity.value--; };

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<template>
  <div class="product-detail-view" :id="'p-' + product.id">
    <div class="container">
      <div class="detail-header">
        <!-- Back Button -->
        <button class="back-link" @click="emit('close')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
            <path d="M19 12H5m7-7l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Volver al catálogo</span>
        </button>

        <!-- Cart Button -->
        <button class="detail-cart-btn" @click="openCart" aria-label="Ver carrito">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>
      </div>

      <div class="detail-grid" :class="{ 'aliado-grid': isAliado }">
        
        <!-- VISUAL SIDE -->
        <div class="visual-side">
          <div class="main-image-card">
            <img 
              :src="product.extraImages ? product.extraImages[activeImageIndex] : product.image" 
              :alt="product.name" 
              class="main-img" 
              loading="lazy"
            />
            
            <!-- Profit Badge (Aliado) -->
            <div class="profit-badge" v-if="isAliado && product.stats?.margin">
              <span class="p-val">{{ product.stats.margin }}%</span>
              <span class="p-lbl">Margen</span>
            </div>
            
            <!-- Tag (Personal) -->
            <div class="personal-tag" v-if="!isAliado && product.tag">
              {{ product.tag }}
            </div>
          </div>

          <!-- Thumbnails (Personal) -->
          <div v-if="!isAliado && product.extraImages" class="thumbs">
            <div 
              v-for="(img, idx) in product.extraImages" 
              :key="idx"
              class="thumb-item"
              :class="{ active: activeImageIndex === idx }"
              @click="activeImageIndex = idx"
            >
              <img :src="img" :alt="product.name" loading="lazy" />
            </div>
          </div>

          <!-- Stats Row (Aliado) -->
          <div v-if="isAliado && product.stats" class="quick-stats">
            <div class="q-stat">
              <span class="q-icon">⚡</span>
              <span>Alta Rotación</span>
            </div>
            <div class="q-stat">
              <span class="q-icon">📈</span>
              <span>Rentabilidad</span>
            </div>
          </div>

          <!-- Charts below image (Aliado only) -->
          <div v-if="isAliado" class="visual-side-charts">
            <!-- Category Distribution -->
            <div class="chart-box" v-if="product.stats?.categories">
              <h4 class="chart-lbl">Distribución por Segmento de Mercado</h4>
              <div class="category-bars">
                <div v-for="cat in product.stats.categories" :key="cat.name" class="cat-row">
                  <span class="cat-name">{{ cat.name }}</span>
                  <div class="cat-track">
                    <div class="cat-fill" :style="{ width: cat.percent + '%' }"></div>
                  </div>
                  <span class="cat-pct">{{ cat.percent }}%</span>
                </div>
              </div>
            </div>

            <!-- Sales Projection Histogram -->
            <div class="chart-box" v-if="product.histogram">
              <h4 class="chart-lbl">Proyección de Ventas (6 meses)</h4>
              <div class="bars">
                <div v-for="d in product.histogram" :key="d.month" class="bar-col">
                  <div class="bar-track">
                    <div class="bar-fill" :style="{ height: d.percent + '%' }"></div>
                  </div>
                  <span class="bar-name">{{ d.month }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- INFO SIDE -->
        <div class="info-side">
          <div class="category-badge">{{ isAliado ? 'Oportunidad de Negocio' : 'Producto Premium' }}</div>
          <h1 class="product-name">{{ product.name }}</h1>
          
          <div class="price-row" v-if="!isAliado">
            <span class="price-current">${{ product.price }}</span>
            <span class="price-original">${{ product.originalPrice }}</span>
          </div>

          <p class="description">{{ product.description }}</p>

          <!-- MODE: PERSONAL -->
          <div v-if="!isAliado" class="personal-controls">
            <div class="tabs-nav">
              <button @click="activeTab = 'features'" :class="{ active: activeTab === 'features' }">Características</button>
              <button @click="activeTab = 'specs'" :class="{ active: activeTab === 'specs' }">Especificaciones</button>
            </div>
            
            <div class="tab-body">
              <div v-if="activeTab === 'features'" class="features">
                <div class="f-item">✓ Garantía oficial Off Basic</div>
                <div class="f-item">✓ Envío gratis a toda Venezuela</div>
                <div class="f-item">✓ Soporte técnico premium</div>
              </div>
              <div v-if="activeTab === 'specs'" class="specs">
                <div v-for="s in product.specs" :key="s.label" class="s-row">
                  <span class="s-label">{{ s.label }}</span>
                  <span class="s-value">{{ s.value }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- MODE: ALIADO — Enhanced Analytics Dashboard -->
          <div v-if="isAliado" class="aliado-controls">
            
            <!-- Primary Metrics Grid (2 rows of 3) -->
            <div class="metrics-grid">
              <div class="m-card highlight-card">
                <span class="m-title">ROI</span>
                <span class="m-val accent">{{ product.stats.roi }}</span>
                <span class="m-trend up">↑ Creciente</span>
              </div>
              <div class="m-card">
                <span class="m-title">Demanda</span>
                <span class="m-val">{{ product.stats.demand }}</span>
                <span class="m-trend up">⚡ Activa</span>
              </div>
              <div class="m-card">
                <span class="m-title">Mínimo</span>
                <span class="m-val">{{ product.stats.minOrder }} ud.</span>
              </div>
              <div class="m-card">
                <span class="m-title">Ganancia/ud.</span>
                <span class="m-val accent">${{ product.stats.profitPerUnit?.toFixed(2) }}</span>
              </div>
              <div class="m-card">
                <span class="m-title">Venta Diaria</span>
                <span class="m-val">{{ product.stats.avgDailySales }} ud.</span>
                <span class="m-trend up">📈 Promedio</span>
              </div>
              <div class="m-card">
                <span class="m-title">Restock</span>
                <span class="m-val">{{ product.stats.restockDays }} días</span>
              </div>
            </div>

            <!-- Gauges Row: Satisfaction + Competition + Revenue -->
            <div class="gauges-row">
              <!-- Circular Satisfaction Gauge -->
              <div class="gauge-card">
                <h4 class="gauge-label">Satisfacción del Cliente</h4>
                <div class="circular-gauge">
                  <svg viewBox="0 0 120 120" class="gauge-svg">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" stroke-width="8"
                      stroke-linecap="round"
                      :stroke-dasharray="(product.stats.satisfaction / 100) * 327 + ' 327'"
                      stroke-dashoffset="0"
                      transform="rotate(-90, 60, 60)"
                      class="gauge-arc"
                    />
                  </svg>
                  <div class="gauge-center">
                    <span class="gauge-value">{{ product.stats.satisfaction }}%</span>
                    <span class="gauge-sub">Clientes satisfechos</span>
                  </div>
                </div>
              </div>

              <!-- Competition Level -->
              <div class="gauge-card">
                <h4 class="gauge-label">Nivel de Competencia</h4>
                <div class="competition-meter">
                  <div class="comp-visual">
                    <div class="comp-bar-track">
                      <div class="comp-bar-fill" :style="{ width: product.stats.competitionLevel + '%' }">
                        <span class="comp-percent">{{ product.stats.competitionLevel }}%</span>
                      </div>
                    </div>
                    <div class="comp-labels">
                      <span>Baja</span>
                      <span>Media</span>
                      <span>Alta</span>
                    </div>
                  </div>
                  <p class="comp-insight" v-if="product.stats.competitionLevel < 30">
                    🟢 Mercado poco saturado — ventaja competitiva alta
                  </p>
                  <p class="comp-insight" v-else-if="product.stats.competitionLevel < 60">
                    🟡 Competencia moderada — diferenciación es clave
                  </p>
                  <p class="comp-insight" v-else>
                    🔴 Alta competencia — se requiere estrategia fuerte
                  </p>
                </div>
              </div>

              <!-- Monthly Revenue -->
              <div class="gauge-card revenue-card">
                <h4 class="gauge-label">Proyección Mensual</h4>
                <div class="revenue-display">
                  <span class="revenue-currency">$</span>
                  <span class="revenue-amount">{{ product.stats.monthlyRevenue?.toLocaleString() }}</span>
                </div>
                <div class="revenue-breakdown">
                  <div class="rev-item">
                    <span class="rev-label">Margen Bruto</span>
                    <span class="rev-val accent">{{ product.stats.margin }}%</span>
                  </div>
                  <div class="rev-item">
                    <span class="rev-label">Unidades/mes</span>
                    <span class="rev-val">{{ product.stats.avgDailySales * 30 }}</span>
                  </div>
                  <div class="rev-item">
                    <span class="rev-label">Ganancia neta</span>
                    <span class="rev-val accent">${{ (product.stats.profitPerUnit * product.stats.avgDailySales * 30).toFixed(0) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="buy-section">
            <div class="qty">
              <button @click="decrementQty" :disabled="quantity <= 1">−</button>
              <span>{{ quantity }}</span>
              <button @click="incrementQty" :disabled="quantity >= 10">+</button>
            </div>
            <button 
              @click="addToCart(product, quantity)" 
              class="btn-primary main-cta"
              aria-label="Agregar al carrito"
              title="Agregar al carrito"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Agregar
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="trust-footer">
            <div class="t-badge">🛡️ Garantía</div>
            <div class="t-badge">🚚 Envío Gratis</div>
            <div class="t-badge">💬 Soporte 24/7</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-view {
  min-height: 100vh;
  background: var(--bg);
  padding: 4rem 1.5rem;
  animation: fadeIn 0.5s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--accent);
}

.detail-cart-btn {
  position: relative;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
  opacity: 0.7;
}

.detail-cart-btn:hover {
  opacity: 1;
  color: var(--accent);
}

.cart-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: var(--accent);
  color: var(--bg);
  font-size: 0.75rem;
  font-weight: 800;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid var(--bg);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 5rem;
  align-items: start;
}

.quick-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  background: rgba(255,255,255,0.03);
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
}

.q-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
}

.q-icon {
  font-size: 1.1rem;
}

/* VISUAL SIDE */
.main-image-card {
  aspect-ratio: 1;
  background: var(--white);
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1));
}

.thumbs {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.thumb-item {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  border: 2px solid transparent;
  background: var(--white);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.thumb-item.active {
  border-color: var(--accent);
  box-shadow: 0 0 15px rgba(0,208,255,0.3);
}

.thumb-item img { width: 100%; height: 100%; object-fit: contain; }

.profit-badge {
  position: absolute;
  top: -20px; right: -20px;
  width: 100px; height: 100px;
  background: var(--accent);
  color: var(--black);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  border: 4px solid var(--bg);
  transform: rotate(10deg);
}

.personal-tag {
  position: absolute;
  top: 20px; right: 20px;
  background: var(--accent);
  color: var(--black);
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.8rem;
}

/* INFO SIDE */
.category-badge {
  display: inline-block;
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  letter-spacing: -2px;
  line-height:1;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.price-current { font-size: 2.5rem; font-weight: 800; color: var(--accent); }
.price-original { font-size: 1.5rem; text-decoration: line-through; color: var(--text-muted); opacity: 0.5; }

.description {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 3rem;
  font-weight: 300;
}

/* CONTROLS */
.tabs-nav {
  display: flex;
  gap: 2.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 2rem;
}

.tabs-nav button {
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 1rem 0;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tabs-nav button.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.features { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 3rem; }
.f-item { font-size: 1.05rem; color: var(--text); }

.specs { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 3rem; }
.s-row { display: flex; flex-direction: column; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 10px; }
.s-label { font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 800; }
.s-value { font-size: 1.1rem; font-weight: 600; }

.buy-section { display: flex; align-items: center; gap: 2rem; }
.qty { display: flex; align-items: center; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; }
.qty button { width: 50px; height: 50px; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }
.qty span { width: 40px; text-align: center; font-weight: 800; }

.main-cta {
  flex: 1;
  padding: 1.25rem;
  font-size: 1.1rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
 
/* Sidebar charts (Aliado only, below image) */
.visual-side-charts {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ALIADO SPECIFIC */
.metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
.m-card { padding: 1.25rem; background: rgba(255,255,255,0.03); border-radius: 15px; text-align: center; border: 1px solid rgba(255,255,255,0.05); transition: border-color 0.3s ease, transform 0.3s ease; display: flex; flex-direction: column; gap: 0.35rem; }
@media (hover: hover) {
  .m-card:hover { border-color: rgba(0, 208, 255, 0.2); transform: translateY(-2px); }
}
.highlight-card { border-color: rgba(0, 208, 255, 0.15); background: rgba(0, 208, 255, 0.04); }
.m-title { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; display: block; letter-spacing: 0.5px; }
.m-val { font-size: 1.6rem; font-weight: 800; }
.m-val.accent { color: var(--accent); }
.m-trend { font-size: 0.7rem; color: #4ade80; font-weight: 600; }
.m-trend.up { color: #4ade80; }

/* Gauges Row */
.gauges-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
.gauge-card { padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.gauge-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; text-align: center; margin: 0; }

/* Circular Gauge */
.circular-gauge { position: relative; width: 130px; height: 130px; display: flex; align-items: center; justify-content: center; }
.gauge-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.gauge-arc { transition: stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1); filter: drop-shadow(0 0 6px rgba(0, 208, 255, 0.3)); }
.gauge-center { display: flex; flex-direction: column; align-items: center; z-index: 2; }
.gauge-value { font-size: 1.8rem; font-weight: 800; color: var(--accent); }
.gauge-sub { font-size: 0.6rem; color: var(--text-muted); text-align: center; max-width: 80px; line-height: 1.2; }

/* Competition Meter */
.competition-meter { width: 100%; display: flex; flex-direction: column; gap: 0.75rem; }
.comp-visual { width: 100%; }
.comp-bar-track { width: 100%; height: 28px; background: rgba(255,255,255,0.05); border-radius: 14px; overflow: hidden; position: relative; }
.comp-bar-fill { height: 100%; background: linear-gradient(90deg, #4ade80, #eab308, #ef4444); border-radius: 14px; display: flex; align-items: center; justify-content: flex-end; padding-right: 10px; transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1); min-width: 50px; }
.comp-percent { font-size: 0.75rem; font-weight: 800; color: #000; }
.comp-labels { display: flex; justify-content: space-between; margin-top: 0.4rem; }
.comp-labels span { font-size: 0.65rem; color: var(--text-muted); }
.comp-insight { font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; text-align: center; margin: 0; }

/* Revenue Card */
.revenue-card { align-items: center; }
.revenue-display { display: flex; align-items: baseline; gap: 0.25rem; }
.revenue-currency { font-size: 1.4rem; font-weight: 700; color: var(--accent); opacity: 0.7; }
.revenue-amount { font-size: 2.4rem; font-weight: 900; color: var(--accent); letter-spacing: -1px; }
.revenue-breakdown { width: 100%; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; }
.rev-item { display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.rev-item:last-child { border-bottom: none; }
.rev-label { font-size: 0.75rem; color: var(--text-muted); }
.rev-val { font-size: 0.9rem; font-weight: 700; color: var(--text); }
.rev-val.accent { color: var(--accent); }

/* Category Distribution Bars */
.category-bars { display: flex; flex-direction: column; gap: 0.9rem; }
.cat-row { display: grid; grid-template-columns: 120px 1fr 45px; gap: 0.75rem; align-items: center; }
.cat-name { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cat-track { height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; overflow: hidden; }
.cat-fill { height: 100%; background: linear-gradient(90deg, var(--accent), rgba(0, 208, 255, 0.5)); border-radius: 5px; transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
.cat-pct { font-size: 0.8rem; font-weight: 700; color: var(--accent); text-align: right; }

/* Chart boxes */
.chart-box { padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 20px; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.05); }
.chart-lbl { text-align: center; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--text-muted); margin-top: 0; }
.bars { height: 150px; display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; }
.bar-col { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; align-items: center; }
.bar-track { width: 100%; height: 100px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: flex-end; }
.bar-fill { width: 100%; background: linear-gradient(to top, var(--accent), rgba(0, 208, 255, 0.4)); border-radius: 6px; transition: height 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
.bar-name { font-size: 0.75rem; color: var(--text-muted); }

.key-icon { width: 24px; height: 24px; filter: brightness(0); }

.trust-footer { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 4rem; padding-top: 2rem; display: flex; justify-content: center; gap: 3rem; }
.t-badge { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }

/* RESPONSIVE */
@media (max-width: 1000px) {
  .detail-grid { grid-template-columns: 1fr; gap: 3rem; }
  .product-name { font-size: 2.8rem; }
  .gauges-row { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .product-detail-view {
    padding: 2rem 1rem;
  }
  .buy-section { flex-direction: column; align-items: stretch; }
  .qty { justify-content: center; }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .gauges-row { grid-template-columns: 1fr; gap: 1rem; }
  .trust-footer { flex-wrap: wrap; gap: 1.5rem; }
  .detail-grid { gap: 2rem; }
  .product-name { font-size: 2.2rem; }
  .main-image-card { padding: 1.5rem; }
  .description { font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; }
  .tabs-nav { gap: 1.5rem; }
  .price-current { font-size: 2rem; }
  .price-original { font-size: 1.2rem; }
  .category-badge { font-size: 0.7rem; }
  .specs { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
  .s-row { padding: 0.8rem; }
  .chart-box { padding: 1.25rem; }
  .comparison-title { font-size: 1.8rem; }
  .cat-row { grid-template-columns: 90px 1fr 40px; }
  .cat-name { font-size: 0.7rem; }
  .revenue-amount { font-size: 2rem; }
  .circular-gauge { width: 110px; height: 110px; }
  .gauge-value { font-size: 1.5rem; }
  .visual-side-charts { margin-top: 1.5rem; gap: 1rem; }
}
</style>
