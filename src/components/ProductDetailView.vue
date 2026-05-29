<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCart } from '../composables/useCart';
import { WHATSAPP_NUMBER } from '../config.js';

const { addToCart: cartAdd, openCart, cartCount } = useCart();
const showToast = ref(false);

const handleAddToCart = (product, qty) => {
  cartAdd(product, qty, false); // Do not open cart automatically
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const handleGetKey = () => {
  const msg = "Hola team Off Basic, estoy interesado en ser Aliado quiero obtener la llave";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

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
const compColor = computed(() => {
  const pct = props.product.stats?.competitionLevel || 0;
  if (pct < 31) return '#4ade80'; // Verde
  if (pct <= 66) return '#eab308'; // Amarillo (>33 and >50)
  if (pct <= 73) return '#f97316'; // Naranja (>66)
  return '#ef4444'; // Rojo (>73)
});

// Radar Chart Methods
const getPoint = (i, value) => {
  const angle = (Math.PI * 2) / 5 * i - Math.PI / 2;
  const radius = value; // value is 0-100
  return {
    x: 150 + radius * Math.cos(angle),
    y: 150 + radius * Math.sin(angle)
  };
};

const getPentagonPoints = (radius) => {
  return Array.from({ length: 5 }, (_, i) => {
    const p = getPoint(i, radius);
    return `${p.x},${p.y}`;
  }).join(' ');
};

const getDataPoints = (stats) => {
  return stats.map((s, i) => {
    const p = getPoint(i, s.value);
    return `${p.x},${p.y}`;
  }).join(' ');
};

const getLabelPos = (i) => {
  const angle = (Math.PI * 2) / 5 * i - Math.PI / 2;
  const radius = 135; // Better spacing for labels
  return {
    x: 150 + radius * Math.cos(angle),
    y: 150 + radius * Math.sin(angle)
  };
};
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
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>
      </div>

      <div class="detail-grid" :class="{ 'aliado-grid': isAliado }">
        
        <!-- VISUAL SIDE -->
        <div class="visual-side">
          <div class="main-image-card" :class="{ 'full-cover': product.image.endsWith('.jpg') || product.image.endsWith('.png') }">
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
          <div v-if="product.extraImages" class="thumbs">
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
          <div v-if="isAliado" class="terminal-header-stats">
            <div class="t-stat-pill">
              <span class="pulse-dot"></span>
              <span class="t-stat-label">ALTA ROTACIÓN</span>
            </div>
            <div class="t-stat-pill highlight">
              <span class="t-stat-label">RENTABILIDAD PREMIUM</span>
            </div>
          </div>

          <!-- Charts: Desktop Version (Visible only on Desktop > 1000px) -->
          <div v-if="isAliado" class="visual-side-charts desktop-charts">
            <!-- Product Profile Radar -->
            <div class="chart-box" v-if="product.stats?.radarStats">
              <h4 class="chart-lbl">Perfil Táctico del Producto</h4>
              <div class="radar-container">
                <svg viewBox="0 0 300 300" class="radar-svg">
                  <polygon v-for="i in 5" :key="i" :points="getPentagonPoints(i * 20)" class="radar-grid-line" />
                  <line v-for="(p, i) in product.stats.radarStats" :key="'ml-'+i" x1="150" y1="150" :x2="getPoint(i, 100).x" :y2="getPoint(i, 100).y" class="radar-axis" />
                  <polygon :points="getDataPoints(product.stats.radarStats)" class="radar-area" />
                  <circle v-for="(p, i) in product.stats.radarStats" :key="'mc-'+i" :cx="getPoint(i, p.value).x" :cy="getPoint(i, p.value).y" r="3" class="radar-point" />
                  <text v-for="(p, i) in product.stats.radarStats" :key="'mt-'+i" :x="getLabelPos(i).x" :y="getLabelPos(i).y" class="radar-label" text-anchor="middle" dominant-baseline="middle">{{ p.label }}</text>
                </svg>
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
          
          <div class="price-row">
            <span class="price-current">${{ product.price.toFixed(2) }}</span>
            <span class="price-original">${{ product.originalPrice.toFixed(2) }}</span>
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

          <!-- MODE: ALIADO — High-Ticket Analytics Dashboard -->
          <div v-if="isAliado" class="aliado-premium-dashboard">
            
            <div class="dashboard-section-label">Métricas de Rendimiento</div>

            <!-- Primary Metrics: Investment View -->
            <div class="investment-grid">
              <div class="invest-card highlight">
                <div class="invest-inner">
                  <span class="i-label">ROI ESTIMADO</span>
                  <span class="i-value neon-glow">{{ product.stats.roi }}</span>
                  <div class="i-trend up">RENDIMIENTO POSITIVO</div>
                </div>
              </div>
              
              <div class="invest-group">
                <div class="invest-card small">
                  <span class="i-label">DEMANDA</span>
                  <span class="i-value">{{ product.stats.demand }}</span>
                </div>
                <div class="invest-card small">
                  <span class="i-label">PEDIDO MÍN.</span>
                  <span class="i-value">{{ product.stats.minOrder }} ud.</span>
                </div>
                <div class="invest-card small">
                  <span class="i-label">GANANCIA/UD</span>
                  <span class="i-value accent">${{ product.stats.profitPerUnit?.toFixed(2) }}</span>
                </div>
                <div class="invest-card small">
                  <span class="i-label">VENTA DIARIA</span>
                  <span class="i-value">{{ product.stats.avgDailySales }} ud.</span>
                </div>
              </div>
            </div>

            <!-- Charts: Mobile Version (Visible only on Screens < 1000px) -->
            <div class="visual-side-charts mobile-charts">
              <!-- Product Profile Radar -->
              <div class="chart-box" v-if="product.stats?.radarStats">
                <h4 class="chart-lbl">Perfil Táctico del Producto</h4>
                <div class="radar-container mobile-radar">
                  <svg viewBox="0 0 300 300" class="radar-svg">
                    <polygon v-for="i in 5" :key="i" :points="getPentagonPoints(i * 20)" class="radar-grid-line" />
                    <line v-for="(p, i) in product.stats.radarStats" :key="'ml-'+i" x1="150" y1="150" :x2="getPoint(i, 100).x" :y2="getPoint(i, 100).y" class="radar-axis" />
                    <polygon :points="getDataPoints(product.stats.radarStats)" class="radar-area" />
                    <circle v-for="(p, i) in product.stats.radarStats" :key="'mc-'+i" :cx="getPoint(i, p.value).x" :cy="getPoint(i, p.value).y" r="3" class="radar-point" />
                    <text v-for="(p, i) in product.stats.radarStats" :key="'mt-'+i" :x="getLabelPos(i).x" :y="getLabelPos(i).y" class="radar-label" text-anchor="middle" dominant-baseline="middle">{{ p.label }}</text>
                  </svg>
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

            <div class="dashboard-section-label">Vectores de Éxito</div>

            <!-- Gauges Row: Satisfaction + Competition + Revenue -->
            <div class="performance-vectors">
              <!-- Circular Satisfaction -->
              <div class="vector-card">
                <span class="v-label">SATISFACCIÓN</span>
                <div class="v-visual">
                  <div class="circular-gauge mini">
                    <svg viewBox="0 0 100 100" class="gauge-svg">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" stroke-width="6"
                        stroke-linecap="round"
                        :stroke-dasharray="(product.stats.satisfaction / 100) * 283 + ' 283'"
                        transform="rotate(-90, 50, 50)"
                        class="gauge-arc"
                      />
                    </svg>
                    <div class="gauge-center">
                      <span class="v-value">{{ product.stats.satisfaction }}%</span>
                    </div>
                  </div>
                </div>
                <span class="v-sub">CLIENTES FELICES</span>
              </div>

              <!-- Competition Meter -->
              <div class="vector-card">
                <span class="v-label">COMPETENCIA</span>
                <div class="v-visual centering">
                  <div class="h-meter">
                    <div class="h-track">
                      <div class="h-fill" :style="{ width: product.stats.competitionLevel + '%', background: compColor }"></div>
                    </div>
                    <div class="h-labels">
                      <span>Baja</span>
                      <span>Alta</span>
                    </div>
                  </div>
                </div>
                <span class="v-sub">{{ product.stats.competitionLevel }}% - CONTROLADO</span>
              </div>

              <!-- Monthly Revenue -->
              <div class="vector-card revenue-v">
                <span class="v-label">PROYECCIÓN MENSUAL</span>
                <div class="v-visual centering">
                  <span class="v-amount neon-text">${{ product.stats.monthlyRevenue?.toLocaleString() }}</span>
                </div>
                <div class="v-mini-table">
                  <span>MARGEN: {{ product.stats.margin }}%</span>
                  <span>PREV: {{ product.stats.avgDailySales * 30 }} UD</span>
                </div>
              </div>
            </div>
          </div>

          <div class="buy-section">
            <div class="qty" v-if="!isAliado">
              <button @click="decrementQty" :disabled="quantity <= 1">−</button>
              <span>{{ quantity }}</span>
              <button @click="incrementQty" :disabled="quantity >= 10">+</button>
            </div>
            
            <div class="btn-group-toast" :class="{ 'full-width': isAliado }">
              <button 
                v-if="isAliado"
                @click="handleGetKey" 
                class="btn-primary main-cta"
                aria-label="Obtener Llave"
                title="Obtener Llave"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                Obtener Llave
              </button>
              <button 
                v-else
                @click="handleAddToCart(product, quantity)" 
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

              <!-- Contextual Notification Bubble (Luxury Style) -->
              <Transition name="toast-float" v-if="!isAliado">
                <div v-if="showToast" class="contextual-toast">
                  <div class="c-toast-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span class="c-toast-msg">Añadido al carrito</span>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="trust-footer">
            <div class="t-badge">
              <svg class="t-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Garantía</span>
            </div>
            <div class="t-badge">
              <svg class="t-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3v10" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
              </svg>
              <span>Envío Gratis</span>
            </div>
            <div class="t-badge">
              <svg class="t-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Soporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
      <!-- (Removed Fixed Notification) -->
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
  background: #ff4d6a;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 800;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  box-shadow: 0 2px 6px rgba(255, 77, 106, 0.5);
  border: 1.5px solid var(--bg);
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
  gap: 3rem;
  margin-top: 1.5rem;
  background: rgba(255, 255, 255, 0.025);
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
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
  overflow: hidden; /* Ensure image corners are clipped by the card border radius */
}

.main-image-card.full-cover {
  padding: 0;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1));
}

.main-image-card.full-cover .main-img {
  object-fit: cover;
  filter: none; /* No drop-shadow needed when covered */
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
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.thumb-item:hover {
  border-color: rgba(0, 208, 255, 0.4);
}

.thumb-item.active {
  border-color: var(--accent);
  box-shadow: 0 0 15px rgba(0, 208, 255, 0.35);
  background: rgba(0, 208, 255, 0.05);
}

.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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
.qty { 
  display: flex; 
  align-items: center; 
  border: 1px solid var(--card-border); 
  border-radius: 8px; 
  background: rgba(255,255,255,0.03);
}

.qty button { 
  width: 50px; 
  height: 50px; 
  background: none; 
  border: none; 
  color: var(--text); 
  font-size: 1.5rem; 
  cursor: pointer; 
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty button:hover:not(:disabled) {
  background: rgba(0, 208, 255, 0.1);
  color: var(--accent);
}

.qty button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty span { 
  width: 40px; 
  text-align: center; 
  font-weight: 800; 
  color: var(--text);
}

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
 
/* Sidebar charts: now part of the main analytics flow */
.visual-side-charts {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.mobile-charts { display: none; }
.desktop-charts { display: flex; }

.aliado-premium-dashboard {
  margin-top: 2rem;
  margin-bottom: 4rem; /* More space before action buttons */
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.dashboard-section-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: -1.5rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-section-label::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0.2;
}

/* Investment Grid */
.investment-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;
}

.invest-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.invest-card.highlight {
  background: linear-gradient(135deg, rgba(0, 208, 255, 0.08) 0%, rgba(0, 208, 255, 0.02) 100%);
  border-color: rgba(0, 208, 255, 0.2);
}

.invest-inner {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.invest-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

.invest-card.small {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.i-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.i-value {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.5px;
}

.i-value.neon-glow {
  color: var(--accent);
  text-shadow: 0 0 15px rgba(0, 208, 255, 0.4);
  font-size: 2.4rem;
}

.i-trend {
  font-size: 0.65rem;
  font-weight: 700;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 0.5rem;
}

/* Performance Vectors */
.performance-vectors {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.vector-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  min-height: 240px;
}

.v-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--text-muted);
}

.v-visual {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.v-visual.centering { align-items: center; }

.v-value { font-size: 1.5rem; font-weight: 900; color: var(--text); }
.v-sub { 
  font-size: 0.6rem; 
  font-weight: 700; 
  color: var(--text-muted); 
  opacity: 0.6; 
  white-space: nowrap;
}

.v-amount {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--accent);
  letter-spacing: -1px;
}

.neon-text { text-shadow: 0 0 15px rgba(0, 208, 255, 0.3); }

.v-mini-table {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 1rem;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-muted);
}

/* Gauge Centering & Styles */
.circular-gauge.mini { 
  position: relative; 
  width: 120px; 
  height: 120px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
}
.gauge-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.gauge-center { 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  z-index: 2; 
  text-align: center;
}
.gauge-arc { transition: stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1); filter: drop-shadow(0 0 6px rgba(0, 208, 255, 0.3)); }

/* Horizontal Meter */
.h-meter { width: 100%; display: flex; flex-direction: column; gap: 0.8rem; }
.h-track { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
.h-fill { height: 100%; border-radius: 3px; }
.h-labels { display: flex; justify-content: space-between; font-size: 0.6rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }

/* Terminal Header Stats */
.terminal-header-stats {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.t-stat-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255,255,255,0.03);
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.05);
}

.t-stat-pill.highlight {
  border-color: rgba(0, 208, 255, 0.3);
  background: rgba(0, 208, 255, 0.05);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  animation: heartRate 1.5s infinite;
}

@keyframes heartRate {
  0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(0, 208, 255, 0.7); }
  70% { transform: scale(1.2); opacity: 0.5; box-shadow: 0 0 0 6px rgba(0, 208, 255, 0); }
  100% { transform: scale(1); opacity: 1; }
}

.t-stat-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--text);
}

/* Radar Chart Styles */
.radar-container {
  width: 100%;
  max-width: 250px; /* More elegant profile size */
  margin: 1rem auto;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.radar-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.radar-grid-line {
  fill: none;
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 1;
}

.radar-axis {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1;
}

.radar-area {
  fill: rgba(0, 208, 255, 0.25);
  stroke: var(--accent);
  stroke-width: 2.5;
  transition: all 0.5s ease;
}

.radar-point {
  fill: #fff;
  stroke: var(--accent);
  stroke-width: 1.5;
  filter: drop-shadow(0 0 3px var(--accent));
}

.radar-label {
  fill: var(--text-muted);
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  pointer-events: none;
}

.mobile-radar {
  max-width: 240px;
  margin: 2rem auto;
}

.mobile-radar .radar-label {
  font-size: 10px;
}

/* Chart boxes */
.chart-box { 
  padding: 1.5rem; 
  background: rgba(255,255,255,0.025); 
  border-radius: 20px; 
  margin-bottom: 2rem; 
  border: 1px solid rgba(255,255,255,0.05); 
}
.chart-lbl { text-align: center; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--text-muted); margin-top: 0; }
.bars { height: 150px; display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; }
.bar-col { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; align-items: center; }
.bar-track { width: 100%; height: 100px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: flex-end; }
.bar-fill { width: 100%; background: linear-gradient(to top, var(--accent), rgba(0, 208, 255, 0.4)); border-radius: 6px; transition: height 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
.bar-name { font-size: 0.75rem; color: var(--text-muted); }

.key-icon { width: 24px; height: 24px; filter: brightness(0); }

.trust-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 4rem;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.t-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.1rem;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.15);
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #22c55e;
  transition: all 0.3s ease;
}

.t-icon {
  width: 1.05rem;
  height: 1.05rem;
  stroke: currentColor;
  display: inline-block;
  flex-shrink: 0;
}

/* RESPONSIVE */
@media (max-width: 1000px) {
  .detail-grid { grid-template-columns: 1fr; gap: 3rem; }
  .product-name { font-size: 2.8rem; }
  .gauges-row { grid-template-columns: 1fr; }
  .mobile-charts { display: flex; }
  .desktop-charts { display: none; }
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
/* RESPONSIVE FIXES — HIGH-TICKET DASHBOARD */
@media (max-width: 992px) {
  .detail-grid { grid-template-columns: 1fr; gap: 3rem; }
  .product-name { font-size: 2.8rem; }
  .investment-grid { grid-template-columns: 1fr; }
  .performance-vectors { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
}

@media (max-width: 640px) {
  .product-name { font-size: 2.2rem; }
  .performance-vectors { grid-template-columns: 1fr; }
  /* Forced 2x2 grid as requested */
  .invest-group { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
  .invest-card.small .i-value { font-size: 1.1rem; }
  .invest-card.small .i-label { font-size: 0.55rem; }
  
  .i-value.neon-glow { font-size: 2rem; }
  .v-amount { font-size: 1.8rem; }
  
  .terminal-header-stats {
    flex-wrap: wrap;
  }
  
  .t-stat-pill {
    flex: 1;
    min-width: 140px;
    justify-content: center;
  }

  .vector-card {
    min-height: auto;
    padding: 1.25rem;
  }

  .circular-gauge.mini {
    width: 100px;
    height: 100px;
  }
}
/* Contextual Notification Bubble */
.btn-group-toast {
  position: relative;
  flex: 1;
  display: flex;
}

.contextual-toast {
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  color: #fff;
  padding: 8px 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.c-toast-icon {
  width: 18px;
  height: 18px;
  background: var(--accent);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Arrow Fix for Dark Style */
.contextual-toast::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
}

.toast-float-enter-active, .toast-float-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-float-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(10px) scale(0.8);
}

.toast-float-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px) scale(0.9);
}

.shipping-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  width: fit-content;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.ship-icon {
  width: 1.1rem;
  height: 1.1rem;
}
</style>
