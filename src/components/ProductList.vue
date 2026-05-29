<script setup>
import { computed, ref, onMounted } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';
import { useCart } from '../composables/useCart';
import { WHATSAPP_NUMBER } from '../config.js';

const { addToCart: cartAdd } = useCart();
const activeToastId = ref(null);

const handleAddToCart = (product, isPersonal) => {
  cartAdd(product, 1, false); // Do not open cart automatically
  activeToastId.value = product.id;
  setTimeout(() => {
    activeToastId.value = null;
  }, 3000);
};

const handleGetKey = () => {
  const msg = "Hola team Off Basic, estoy interesado en ser Aliado quiero obtener la llave";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

const props = defineProps({
  mode: {
    type: String,
    default: 'personal'
  },
  products: {
    type: Array,
    required: true
  }
});

const isAliado = computed(() => props.mode === 'aliado');
const revealRef = useScrollReveal();

// Catalog unlocked by default

const selectProduct = (id) => {
  window.location.hash = `#p-${id}`;
};

const getWhatsappUrl = (productName, price) => {
  if (isAliado.value) {
    const msg = `¡Hola! Quiero comprar ${productName} al mayor y conocer más sobre los márgenes.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }
  const msg = `¡Hola! Vi la web y quiero mi ${productName} ($${price}).`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
</script>

<template>
  <div class="products-wrapper" id="productos">
    <section class="products-section" :class="{ 'aliado-theme': isAliado }">
      <div class="container scroll-reveal slide-up" ref="revealRef">
        
        <header class="section-header" id="baul-content">
          <div class="category-pill">{{ isAliado ? 'Catálogo de Inversión' : 'Colección Premium' }}</div>
          <h2 class="section-title">
            {{ isAliado ? 'Contenido del Baúl' : 'Colección Exclusiva' }}
          </h2>
        </header>

        <div class="products-grid">
          <div 
            v-for="(product, index) in products" 
            :key="product.id" 
            class="product-card animate-product"
            :style="{ animationDelay: `${index * 0.15}s` }"
            @click="selectProduct(product.id)"
            role="button"
            :aria-label="'Ver detalles de ' + product.name"
          >
            <div class="card-visual" :class="{ 'full-cover': product.image.endsWith('.jpg') || product.image.endsWith('.png') }">
              <div v-if="product.tag" class="product-tag">{{ product.tag }}</div>
              <img :src="product.image" :alt="product.name" class="product-image" loading="lazy" />
            </div>

            <div class="card-content">
              <div class="card-header">
                <div class="header-main">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <!-- Stars and Rating -->
                  <div class="rating-row">
                    <div class="stars">★★★★★</div>
                    <span class="rating-val">{{ product.rating }} ({{ product.reviewCount }})</span>
                  </div>
                </div>

                <div class="header-price">
                  <div class="product-price">
                    <span class="old">${{ product.originalPrice.toFixed(2) }}</span>
                    <span class="current">${{ product.price.toFixed(2) }}</span>
                  </div>
                </div>
              </div>

              <p class="product-desc">{{ product.description }}</p>

              <!-- Shipping Badge -->
              <div class="shipping-badge">
                <svg class="ship-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3v10" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="17" cy="18" r="2" />
                </svg>
                <span>Envío Gratis</span>
              </div>

              <!-- Card Footer Actions: Symmetric layout -->
              <div class="footer-actions" @click.stop>
                <div class="info-link-wrapper">
                  <span class="more-info-link" @click.stop="selectProduct(product.id)">
                    ¿Mas info del producto?
                  </span>
                </div>

                <div class="btn-group-toast">
                  <button
                    v-if="isAliado"
                    @click.stop="handleGetKey"
                    class="btn-primary product-btn"
                  >
                    <span class="btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                      </svg>
                    </span>
                    <span class="btn-text">Obtener Llave</span>
                  </button>
                  <button
                    v-else
                    @click.stop="handleAddToCart(product, !isAliado)"
                    class="btn-primary product-btn"
                  >
                    <span class="btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 01-8 0"/>
                      </svg>
                    </span>
                    <span class="btn-text">Agregar</span>
                  </button>

                  <!-- Contextual Notification Bubble (Luxury Style) -->
                  <Transition name="toast-float">
                    <div v-if="activeToastId === product.id" class="contextual-toast">
                      <div class="c-toast-icon">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span class="c-toast-msg">Añadido al carrito</span>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.products-wrapper {
  min-height: 40vh;
  position: relative;
  overflow: visible; /* Prevent notification clipping */
}

.products-section {
  padding: 2rem 0;
  background-color: var(--bg);
  transition: background-color 0.3s ease;
  overflow: visible; /* Prevent notification clipping */
  position: relative;
}

.products-section .container {
  max-width: 1400px; /* Widened to fit 3 large cards */
}

.aliado-theme {
  background-color: var(--bg-alt);
}

.section-header {
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.category-pill {
  position: relative;
  z-index: 1;
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(0, 208, 255, 0.1);
  color: #00d0ff;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
}

.section-title {
  position: relative;
  z-index: 1;
  font-size: 3rem;
  letter-spacing: -1.5px;
  line-height: 1;
  color: var(--text);
}

/* Card Styling */
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 1.5rem;
  }
}

.product-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  overflow: visible; /* CRITICAL: Allows notifications to superimpose */
  transition: all 0.4s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

/* Ensure the card with the notification is always on top */
.product-card:has(.contextual-toast) {
  z-index: 9999;
}

.animate-product {
  opacity: 0;
  animation: cardFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (hover: hover) {
  .product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }
}

.card-visual {
  height: 320px;
  padding: 2.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-visual.full-cover {
  padding: 0;
  border-top-left-radius: 19px;
  border-top-right-radius: 19px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.card-visual.full-cover .product-image {
  object-fit: cover;
}

/* Catalog Styles (unlocked) */

.product-tag {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.35rem 0.8rem;
  background: #00d0ff;
  color: var(--white);
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 800;
}

.card-content {
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.header-main {
  flex: 1;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.25rem;
}

/* Rating Rows */
.rating-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  color: #ffcc00; /* Gold */
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.rating-val {
  font-size: 0.75rem;
  color: #888;
  font-weight: 600;
}

.header-price {
  text-align: right;
}

.product-price {
  display: flex;
  flex-direction: column;
}

.product-price .old {
  font-size: 0.85rem;
  color: #bbb;
  text-decoration: line-through;
  margin-bottom: -0.25rem;
}

.product-price .current {
  font-size: 1.6rem;
  font-weight: 900;
  color: #00d0ff;
}

.product-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Shipping Badge */
.shipping-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  background: rgba(34, 197, 94, 0.1); /* Adapts better to dark/light */
  color: #22c55e; /* Vibrant Green text */
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

/* Footer Actions */
.footer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
}

.info-link-wrapper {
  flex: 1;
}

.more-info-link {
  font-size: 0.73rem;
  color: #999;
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
}

.product-buy-btn {
  background-color: #00d0ff;
  color: var(--white);
  border: none;
  padding: 0.8rem 1.5rem;
  min-width: 120px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-buy-btn:hover {
  opacity: 0.9;
}

.product-buy-btn.icon-only-btn {
  min-width: unset;
  width: 48px;
  height: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Removed locked button styles */

/* === Mobile: iPhone-safe === */
@media (max-width: 480px) {
  .products-section {
    padding: 4rem 0;
  }
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .section-header {
  margin-bottom: 1.25rem;
  text-align: center;
}
  .section-title {
    font-size: 2rem;
  }
  .bg-title {
    font-size: 2.5rem;
  }
  .card-visual {
    height: 250px;
    padding: 1.5rem;
  }
  .card-content {
    padding: 1.25rem 1.25rem 1.5rem;
  }
  .product-name {
    font-size: 1.2rem;
  }
  .product-price .current {
    font-size: 1.3rem;
  }
  .product-desc {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
  .shipping-badge {
    margin-bottom: 1.25rem;
  }
  .footer-actions {
    gap: 0.75rem;
  }
  /* Removed mobile locked button styles */
}
/* Contextual Notification Bubble */
.btn-group-toast {
  position: relative;
  display: flex;
}

.contextual-toast {
  position: absolute;
  bottom: 135%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
  width: max-content; /* Force single line */
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  z-index: 9999;
  pointer-events: none;
}

.c-toast-icon {
  width: 16px;
  height: 16px;
  background: var(--accent);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
  transform: translateX(-50%) translateY(5px) scale(0.8);
}

.toast-float-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-5px) scale(0.9);
}
</style>
