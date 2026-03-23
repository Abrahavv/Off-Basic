<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  show: Boolean,
  product: Object
});

const emit = defineEmits(['close']);

const activeImageIndex = ref(0);
const activeTab = ref('features');
const quantity = ref(1);
const isImageTransitioning = ref(false);

// Reset state when product changes
watch(() => props.product, () => {
  activeImageIndex.value = 0;
  activeTab.value = 'features';
  quantity.value = 1;
});

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

const changeImage = (index) => {
  if (index === activeImageIndex.value) return;
  isImageTransitioning.value = true;
  setTimeout(() => {
    activeImageIndex.value = index;
    setTimeout(() => {
      isImageTransitioning.value = false;
    }, 50);
  }, 200);
};

const getWhatsappUrl = (productName, price) => {
  const whatsappNumber = '1234567890';
  const msg = `¡Hola! Vi la web y quiero mi ${productName} ($${price}).`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

const getDiscount = (original, current) => {
  return Math.round((1 - parseFloat(current) / parseFloat(original)) * 100);
};

const incrementQty = () => { if (quantity.value < 10) quantity.value++; };
const decrementQty = () => { if (quantity.value > 1) quantity.value--; };
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
              <!-- Gallery Section -->
              <div class="gallery-section">
                <div class="main-image-wrap">
                  <!-- Discount Badge Removed -->
                  <img 
                    :src="product.extraImages ? product.extraImages[activeImageIndex] : product.image" 
                    :alt="product.name" 
                    class="main-modal-img"
                    :class="{ 'img-transitioning': isImageTransitioning }" 
                  />
                </div>
                <div v-if="product.extraImages" class="thumbnails">
                  <div 
                    v-for="(img, index) in product.extraImages" 
                    :key="index"
                    class="thumb"
                    :class="{ active: activeImageIndex === index }"
                    @click="changeImage(index)"
                  >
                    <img :src="img" :alt="product.name" />
                  </div>
                </div>
              </div>

              <!-- Info Section -->
              <div class="info-section">
                <!-- Product Tag -->
                <div v-if="product.tag" class="modal-product-tag">{{ product.tag }}</div>

                <h2 class="modal-title">{{ product.name }}</h2>
                
                <!-- Rating -->
                <div class="modal-rating" v-if="product.rating">
                  <div class="modal-stars">
                    <svg v-for="star in 5" :key="star" class="modal-star" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </div>
                  <span class="modal-rating-text">{{ product.rating }} · {{ product.reviews }} reseñas</span>
                </div>

                <!-- Price Block -->
                <div class="modal-price-block">
                  <span class="modal-price-label">Precio de Lanzamiento</span>
                  <div class="modal-prices">
                    <span class="modal-original">${{ product.originalPrice }}</span>
                    <span class="modal-current">${{ product.price }}</span>
                  </div>
                </div>
                
                <p class="modal-desc">{{ product.description }}</p>

                <!-- Tabs -->
                <div class="modal-tabs">
                  <button 
                    class="tab-btn" 
                    :class="{ active: activeTab === 'features' }" 
                    @click="activeTab = 'features'"
                  >
                    Características
                  </button>
                  <button 
                    class="tab-btn" 
                    :class="{ active: activeTab === 'specs' }" 
                    @click="activeTab = 'specs'"
                  >
                    Especificaciones
                  </button>
                </div>

                <div class="tab-content">
                  <!-- Features Tab -->
                  <div v-if="activeTab === 'features'" class="features-list">
                    <div class="feature-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      Garantía oficial Off Basic
                    </div>
                    <div class="feature-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      Envío gratis a toda Venezuela
                    </div>
                    <div class="feature-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      Soporte técnico premium
                    </div>
                    <div class="feature-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      Producto 100% original
                    </div>
                  </div>

                  <!-- Specs Tab -->
                  <div v-if="activeTab === 'specs' && product.specs" class="specs-grid">
                    <div v-for="spec in product.specs" :key="spec.label" class="spec-item">
                      <span class="spec-label">{{ spec.label }}</span>
                      <span class="spec-value">{{ spec.value }}</span>
                    </div>
                  </div>
                  <div v-if="activeTab === 'specs' && !product.specs" class="specs-empty">
                    Especificaciones próximamente.
                  </div>
                </div>

                <!-- Quantity -->
                <div class="qty-row">
                  <span class="qty-label">Cantidad</span>
                  <div class="qty-selector">
                    <button class="qty-btn" @click="decrementQty" :disabled="quantity <= 1">−</button>
                    <span class="qty-value">{{ quantity }}</span>
                    <button class="qty-btn" @click="incrementQty" :disabled="quantity >= 10">+</button>
                  </div>
                </div>

                <!-- Buy Button -->
                <a 
                  :href="getWhatsappUrl(product.name, product.price)" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-primary modal-buy-btn"
                >
                  Comprar
                </a>

                <!-- Trust Badges -->
                <div class="trust-badges">
                  <div class="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 12L11 14L15 10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Garantía</span>
                  </div>
                  <div class="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
                      <rect x="1" y="3" width="15" height="13" rx="1"/>
                      <path d="M16 8l4 0 0 8-4 0"/>
                      <circle cx="6.5" cy="18.5" r="2.5"/>
                      <circle cx="17.5" cy="18.5" r="2.5"/>
                    </svg>
                    <span>Envío Gratis</span>
                  </div>
                  <div class="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Soporte 24/7</span>
                  </div>
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
  max-width: 1050px;
  max-height: 92vh;
  border-radius: 16px;
  position: relative;
  overflow-y: auto;
  border: 1px solid var(--card-border);
  box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.6);
}

/* Scrollbar for modal */
.modal-content::-webkit-scrollbar {
  width: 6px;
}
.modal-content::-webkit-scrollbar-track {
  background: transparent;
}
.modal-content::-webkit-scrollbar-thumb {
  background: var(--gray);
  border-radius: 3px;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  border-color: var(--accent);
  transform: rotate(90deg);
}

.modal-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  min-height: 520px;
}

/* ===== GALLERY ===== */
.gallery-section {
  padding: 2rem;
  background: var(--bg-alt);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 16px 0 0 16px;
}

.main-image-wrap {
  aspect-ratio: 1;
  background: var(--white);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.modal-discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #ff4757, #ff6b81);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  z-index: 3;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 10px rgba(255, 71, 87, 0.4);
}

.main-modal-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.2s ease, transform 0.3s ease;
}

.main-modal-img.img-transitioning {
  opacity: 0;
  transform: scale(0.97);
}

.thumbnails {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.thumb {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  background: var(--white);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumb:hover {
  border-color: var(--text-muted);
}

.thumb.active {
  border-color: var(--accent);
  box-shadow: 0 0 12px rgba(0, 208, 255, 0.25);
}

/* ===== INFO ===== */
.info-section {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
}

.modal-product-tag {
  display: inline-block;
  width: fit-content;
  background: var(--accent);
  color: var(--black);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.modal-title {
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
  letter-spacing: -0.5px;
}

/* Rating */
.modal-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.modal-stars {
  display: flex;
  gap: 0.1rem;
  color: #facc15;
}

.modal-star {
  width: 16px;
  height: 16px;
}

.modal-rating-text {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Price */
.modal-price-block {
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  background: rgba(0, 208, 255, 0.04);
  border: 1px solid rgba(0, 208, 255, 0.1);
  border-radius: 10px;
}

.modal-price-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  display: block;
  margin-bottom: 0.35rem;
}

.modal-prices {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.modal-original {
  text-decoration: line-through;
  color: var(--text-muted);
  font-size: 1.15rem;
  opacity: 0.6;
}

.modal-current {
  color: var(--accent);
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.modal-desc {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
  color: var(--text-muted);
  font-weight: 300;
}

/* ===== TABS ===== */
.modal-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 0;
  border-bottom: 1px solid var(--card-border);
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tab-btn:hover {
  color: var(--text);
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-content {
  padding: 1rem 0;
  margin-bottom: 1rem;
  min-height: 100px;
}

/* Features */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.9rem;
  color: var(--text);
  font-weight: 400;
}

.feature-item svg {
  color: var(--accent);
  flex-shrink: 0;
}

/* Specs */
.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.spec-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
}

.spec-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 0.2rem;
}

.spec-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}

.specs-empty {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-style: italic;
  padding: 1rem 0;
}

/* ===== QUANTITY ===== */
.qty-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.qty-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.qty-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  overflow: hidden;
}

.qty-btn {
  width: 36px;
  height: 36px;
  background: var(--card-bg);
  border: none;
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover:not(:disabled) {
  background: var(--accent);
  color: var(--black);
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-value {
  min-width: 40px;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text);
}

/* ===== BUY BUTTON ===== */
.modal-buy-btn {
  width: 100%;
  font-size: 1.1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 10px;
  font-weight: 700;
  margin-bottom: 1.25rem;
  transition: all 0.3s ease;
}

.modal-buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 208, 255, 0.4);
}

.modal-buy-btn svg {
  flex-shrink: 0;
}

/* ===== TRUST BADGES ===== */
.trust-badges {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--card-border);
}

.trust-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.trust-badge:hover {
  color: var(--accent);
}

.trust-badge span {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== ANIMATIONS ===== */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0.92) translateY(20px);
  opacity: 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .modal-grid {
    grid-template-columns: 1fr;
  }
  .modal-content {
    max-height: 95vh;
    border-radius: 12px;
  }
  .gallery-section {
    border-radius: 12px 12px 0 0;
  }
  .info-section {
    padding: 1.5rem;
  }
  .modal-title {
    font-size: 1.6rem;
  }
  .modal-current {
    font-size: 1.8rem;
  }
  .specs-grid {
    grid-template-columns: 1fr;
  }
  .trust-badges {
    gap: 1rem;
  }
}
</style>
