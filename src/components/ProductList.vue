<script setup>
import { ref, computed } from 'vue';
import ProductModal from './ProductModal.vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const props = defineProps({
  mode: String
});

const emit = defineEmits(['switch-mode']);

const isAliado = computed(() => props.mode === 'aliado');

// Modal State
const isModalOpen = ref(false);
const selectedProduct = ref(null);

const openModal = (product) => {
  if (isAliado.value) return; // Modal only for personal mode
  selectedProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProduct.value = null;
};

const whatsappNumber = '1234567890';

// Calculate discount percentage
const getDiscount = (original, current) => {
  return Math.round((1 - parseFloat(current) / parseFloat(original)) * 100);
};

// Personal products
const personalProducts = [
  {
    id: 'smartwatch',
    name: 'Smartwatch',
    description: 'Rendimiento en tu muñeca. Monitoreo avanzado, notificaciones inteligentes y batería de larga duración.',
    originalPrice: '45.00',
    price: '25.00',
    image: '/product-smartwatch.png',
    extraImages: ['/product-smartwatch.png', '/product-smartwatch.png', '/product-smartwatch.png', '/product-smartwatch.png'],
    rating: 4.8,
    reviews: 124,
    tag: 'Más Vendido',
    specs: [
      { label: 'Pantalla', value: 'AMOLED 1.91"' },
      { label: 'Batería', value: 'Hasta 7 días' },
      { label: 'Resistencia', value: 'IP68' },
      { label: 'Conectividad', value: 'Bluetooth 5.2' }
    ]
  },
  {
    id: 'audifonos',
    name: 'Audífonos ANC',
    description: 'Aísla el ruido. Domina tu entorno. Sonido de alta fidelidad con cancelación activa de ruido.',
    originalPrice: '35.00',
    price: '20.00',
    image: '/product-audifonos.png',
    extraImages: ['/product-audifonos.png', '/product-audifonos.png', '/product-audifonos.png', '/product-audifonos.png'],
    rating: 4.9,
    reviews: 89,
    tag: 'Nuevo',
    specs: [
      { label: 'Driver', value: '40mm Hi-Res' },
      { label: 'ANC', value: 'Cancelación Activa' },
      { label: 'Batería', value: '35 horas' },
      { label: 'Conectividad', value: 'Bluetooth 5.3' }
    ]
  },
  {
    id: 'dock',
    name: 'Dock Magnético',
    description: 'Energía sin cables. Un solo lugar para tu reloj, audífonos y teléfono. Diseño minimalista.',
    originalPrice: '40.00',
    price: '22.00',
    image: '/product-dock.png',
    extraImages: ['/product-dock.png', '/product-dock.png', '/product-dock.png', '/product-dock.png'],
    rating: 4.7,
    reviews: 56,
    tag: null,
    specs: [
      { label: 'Potencia', value: '15W Qi' },
      { label: 'Puertos', value: '3 en 1' },
      { label: 'Material', value: 'Aluminio' },
      { label: 'Compatible', value: 'Universal MagSafe' }
    ]
  }
];

// Aliado products
const aliadoProducts = [
  {
    id: 'smartwatch',
    name: 'Smartwatch',
    description: 'Alta demanda, alta rotación.',
    originalPrice: '25.00',
    price: '15.00',
    image: '/product-smartwatch.png',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'audifonos',
    name: 'Audífonos ANC',
    description: 'Calidad que vende sola.',
    originalPrice: '20.00',
    price: '12.00',
    image: '/product-audifonos.png',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'dock',
    name: 'Dock Magnético',
    description: 'El accesorio que todos necesitan.',
    originalPrice: '22.00',
    price: '13.00',
    image: '/product-dock.png',
    rating: 4.7,
    reviews: 56
  }
];

const products = computed(() => isAliado.value ? aliadoProducts : personalProducts);

const getWhatsappUrl = (productName) => {
  if (isAliado.value) {
    const msg = `¡Hola! Quiero la **Llave de acceso** para cotizar ${productName} al mayor.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }
  const msg = `¡Hola! Vi la web y quiero mi ${productName}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

const revealRef = useScrollReveal();
</script>

<template>
  <section id="productos" class="products-section" :class="{ 'products-aliado': isAliado }">
    <div class="container scroll-reveal slide-left" ref="revealRef">
      
      <!-- Title (Only for Aliado) -->
      <h2 v-if="isAliado" class="section-title">Contenido del Baúl</h2>
      <p v-if="isAliado" class="section-subtitle">Activos listos para mover. Requiere Llave para visualizar.</p>

      <!-- Title (Personal) -->
      <h2 v-if="!isAliado" class="section-title">Productos Premium</h2>

      <!-- Grid -->
      <div class="products-grid">
        <div 
          v-for="(product, idx) in products" 
          :key="product.id" 
          class="product-card"
          :class="{ 'card-aliado': isAliado }"
          :style="{ animationDelay: `${idx * 0.12}s` }"
          @click="openModal(product)"
        >
          <div class="product-image-wrap" :class="{ 'locked-image': isAliado }">
            <img :src="product.image" :alt="product.name" class="product-img" />
            
            <!-- Discount Badge Removed -->


            <!-- Product Tag -->
            <div v-if="product.tag && !isAliado" class="product-tag">
              {{ product.tag }}
            </div>

            <!-- Lock Overlay for Aliado -->
            <div v-if="isAliado" class="lock-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
            </div>

            <!-- Quick View Overlay -->
            <div v-if="!isAliado" class="quick-view-overlay">
              <span class="quick-view-text">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Ver Detalles
              </span>
            </div>
          </div>

          <div class="product-info">
            <div class="title-price-header">
              <div class="product-name-block">
                <h3 class="product-name">{{ product.name }}</h3>
                <!-- Star Rating -->
                <div class="product-rating" v-if="product.rating">
                  <div class="stars-row">
                    <svg v-for="star in 5" :key="star" class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </div>
                  <span class="rating-text">{{ product.rating }} ({{ product.reviews }})</span>
                </div>
              </div>
              
              <div class="price-block">
                <span class="original-price">${{ product.originalPrice }}</span>
                <span class="current-price">${{ product.price }}</span>
              </div>
            </div>

            <p class="product-desc">{{ product.description }}</p>

            <!-- Free Shipping Badge -->
            <div v-if="!isAliado" class="shipping-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <path d="M16 8l4 0 0 8-4 0"/>
                <circle cx="6.5" cy="18.5" r="2.5"/>
                <circle cx="17.5" cy="18.5" r="2.5"/>
              </svg>
              Envío Gratis
            </div>

            <!-- Redesigned Footer (Personal Only) -->
            <div v-if="!isAliado" class="product-footer">
              <a 
                :href="getWhatsappUrl(product.name)" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-primary product-buy-btn"
                @click.stop
              >
                Comprar
              </a>
            </div>

            <!-- Aliado Button -->
            <a 
              v-else
              :href="getWhatsappUrl(product.name)" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-primary product-btn-aliado flex-center"
            >
              <img src="/Llave Diamante.png" class="btn-icon" alt="Llave" />
              <span>Obtener Llave</span>
            </a>
          </div>
        </div>
      </div>

    </div>

    <!-- Product Detail Modal (Personal Only) -->
    <ProductModal 
      v-if="!isAliado"
      :show="isModalOpen" 
      :product="selectedProduct" 
      @close="closeModal" 
    />
  </section>
</template>

<style scoped>
.products-section {
  padding: 2.5rem 1.5rem 3rem;
  background-color: var(--bg-alt);
  transition: background-color var(--transition) ease;
  scroll-margin-top: 100px;
}

.products-aliado {
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%);
}

/* ===== GRID ===== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

/* ===== CARD ===== */
.product-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  animation: cardEntrance 0.6s ease both;
  position: relative;
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px var(--shadow), 0 0 0 1px rgba(0, 208, 255, 0.15);
}

.card-aliado {
  border-color: rgba(0, 208, 255, 0.1);
}

.card-aliado:hover {
  border-color: var(--accent);
  box-shadow: 0 0 30px rgba(0, 208, 255, 0.15);
}

/* ===== IMAGE ===== */
.product-image-wrap {
  position: relative;
  height: 260px;
  overflow: hidden;
  background: var(--bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-card:hover .product-img {
  transform: scale(1.08);
}

/* Discount Badge */
.discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #ff4757, #ff6b81);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  z-index: 3;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
}

/* Product Tag */
.product-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--accent);
  color: var(--black);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
  z-index: 3;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

/* Quick View Overlay */
.quick-view-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.35s ease;
  z-index: 2;
  cursor: pointer;
}

.product-card:hover .quick-view-overlay {
  opacity: 1;
}

.quick-view-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 0.6rem 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.product-card:hover .quick-view-text {
  border-color: #fff;
}

/* Lock overlay for aliado */
.locked-image .product-img {
  filter: blur(6px) brightness(0.5);
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  z-index: 2;
}

/* ===== INFO ===== */
.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title-price-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.product-name-block {
  flex: 1;
}

.product-name {
  font-size: 1.3rem;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

/* Star Rating */
.product-rating {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stars-row {
  display: flex;
  gap: 0.1rem;
  color: #facc15;
}

.star-icon {
  width: 14px;
  height: 14px;
}

.rating-text {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Price */
.price-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  flex-shrink: 0;
}

.original-price {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-decoration: line-through;
  opacity: 0.6;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.5px;
}

.product-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-muted);
  font-weight: 300;
  margin-bottom: 0.75rem;
}

/* Shipping Badge */
.shipping-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #22c55e;
  margin-bottom: 1rem;
  padding: 0.3rem 0.6rem;
  background: rgba(34, 197, 94, 0.08);
  border-radius: 4px;
  width: fit-content;
  letter-spacing: 0.3px;
}

.shipping-badge svg {
  color: #22c55e;
}

/* ===== FOOTER ===== */
.product-footer {
  margin-top: auto;
}

.product-buy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.85rem 1.2rem;
  font-size: 0.95rem;
  border-radius: 8px;
  font-weight: 700;
  transition: all 0.3s ease;
}

.product-buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 208, 255, 0.35);
}

.product-buy-btn svg {
  flex-shrink: 0;
}

.product-btn-aliado {
  align-self: flex-start;
  padding: 0.8rem 1.6rem;
}

.btn-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  .product-image-wrap {
    height: 220px;
  }
}
</style>
