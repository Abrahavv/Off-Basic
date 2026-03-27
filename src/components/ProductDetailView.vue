<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCart } from '../composables/useCart';

const { addToCart, toggleCart, cartTotalItems } = useCart();

const props = defineProps({
  product: Object,
  isAliado: Boolean
});

const emit = defineEmits(['close']);

const activeImageIndex = ref(0);
const activeTab = ref('features');
const quantity = ref(1);

const getWhatsappUrl = (productName, price) => {
  const whatsappNumber = '1234567890';
  if (props.isAliado) {
    const msg = `¡Hola! Quiero la **Llave de acceso** para vender ${productName} al mayor y conocer más sobre los márgenes.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }
  const msg = `¡Hola! Vi la web y quiero mi ${productName} ($${price}).`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
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
        <button class="detail-cart-btn" @click="toggleCart" aria-label="Ver carrito">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          <span v-if="cartTotalItems > 0" class="cart-badge">{{ cartTotalItems }}</span>
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

          <!-- MODE: ALIADO -->
          <div v-if="isAliado" class="aliado-controls">
            <div class="metrics-grid">
              <div class="m-card">
                <span class="m-title">ROI</span>
                <span class="m-val accent">{{ product.stats.roi }}</span>
              </div>
              <div class="m-card">
                <span class="m-title">Demanda</span>
                <span class="m-val">{{ product.stats.demand }}</span>
              </div>
              <div class="m-card">
                <span class="m-title">Mínimo</span>
                <span class="m-val">{{ product.stats.minOrder }} ud.</span>
              </div>
            </div>

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

          <div class="buy-section">
            <div class="qty">
              <button @click="decrementQty" :disabled="quantity <= 1">−</button>
              <span>{{ quantity }}</span>
              <button @click="incrementQty" :disabled="quantity >= 10">+</button>
            </div>
            <button 
              @click="addToCart(product, quantity)" 
              class="btn-primary main-cta icon-only-btn"
              aria-label="Agregar al carrito"
              title="Agregar al carrito"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
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
  font-size: 1.25rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 800;
}

.main-cta.icon-only-btn {
  flex: none;
  width: 55px;
  height: 55px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ALIADO SPECIFIC */
.metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
.m-card { padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 15px; text-align: center; border: 1px solid rgba(255,255,255,0.05); }
.m-title { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 0.5rem; }
.m-val { font-size: 1.8rem; font-weight: 800; }
.m-val.accent { color: var(--accent); }

.chart-box { padding: 2rem; background: rgba(255,255,255,0.02); border-radius: 20px; margin-bottom: 3rem; border: 1px solid rgba(255,255,255,0.05); }
.chart-lbl { text-align: center; margin-bottom: 2rem; font-size: 0.9rem; }
.bars { height: 150px; display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; }
.bar-col { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; align-items: center; }
.bar-track { width: 100%; height: 100px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: flex-end; }
.bar-fill { width: 100%; background: var(--accent); border-radius: 6px; }
.bar-name { font-size: 0.75rem; color: var(--text-muted); }

.key-icon { width: 24px; height: 24px; filter: brightness(0); }

.trust-footer { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 4rem; padding-top: 2rem; display: flex; justify-content: center; gap: 3rem; }
.t-badge { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }

/* RESPONSIVE */
@media (max-width: 1000px) {
  .detail-grid { grid-template-columns: 1fr; gap: 3rem; }
  .product-name { font-size: 2.8rem; }
}

@media (max-width: 600px) {
  .product-detail-view {
    padding: 2rem 1rem;
  }
  .buy-section { flex-direction: column; align-items: stretch; }
  .qty { justify-content: center; }
  .metrics-grid { grid-template-columns: 1fr; }
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
}
</style>
