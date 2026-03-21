<script setup>
import { computed } from 'vue';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');

const whatsappNumber = '1234567890';

// Personal products
const personalProducts = [
  {
    id: 'smartwatch',
    name: 'Smartwatch',
    description: 'Rendimiento en tu muñeca. Monitoreo avanzado, notificaciones inteligentes y batería de larga duración.',
    originalPrice: '45.00',
    price: '25.00',
    image: '/product-smartwatch.png'
  },
  {
    id: 'audifonos',
    name: 'Audífonos ANC',
    description: 'Aísla el ruido. Domina tu entorno. Sonido de alta fidelidad con cancelación activa de ruido.',
    originalPrice: '35.00',
    price: '20.00',
    image: '/product-audifonos.png'
  },
  {
    id: 'dock',
    name: 'Dock Magnético',
    description: 'Energía sin cables. Un solo lugar para tu reloj, audífonos y teléfono. Diseño minimalista.',
    originalPrice: '40.00',
    price: '22.00',
    image: '/product-dock.png'
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
    image: '/product-smartwatch.png'
  },
  {
    id: 'audifonos',
    name: 'Audífonos ANC',
    description: 'Calidad que vende sola.',
    originalPrice: '20.00',
    price: '12.00',
    image: '/product-audifonos.png'
  },
  {
    id: 'dock',
    name: 'Dock Magnético',
    description: 'El accesorio que todos necesitan.',
    originalPrice: '22.00',
    price: '13.00',
    image: '/product-dock.png'
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
</script>

<template>
  <section id="productos" class="products-section" :class="{ 'products-aliado': isAliado }">
    <div class="container">
      
      <!-- Title (Only for Aliado) -->
      <h2 v-if="isAliado" class="section-title">Contenido del Baúl.</h2>
      <p v-if="isAliado" class="section-subtitle">Activos listos para mover. Requiere Llave para visualizar.</p>

      <!-- Grid -->
      <div class="products-grid">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
          :class="{ 'card-aliado': isAliado }"
        >
          <div class="product-image-wrap" :class="{ 'locked-image': isAliado }">
            <img :src="product.image" :alt="product.name" class="product-img" />
            <div v-if="isAliado" class="lock-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
            </div>
          </div>

          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            
            <div class="price-row">
              <span class="original-price">${{ product.originalPrice }}</span>
              <span class="current-price">${{ product.price }}</span>
            </div>

            <p class="product-desc">{{ product.description }}</p>
            <a 
              :href="getWhatsappUrl(product.name)" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-primary product-btn flex-center"
            >
              <img v-if="isAliado" src="/Llave Diamante.png" class="btn-icon" alt="Llave" />
              <span>{{ isAliado ? 'Obtener Llave' : 'Comprar Ahora' }}</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.products-section {
  padding: var(--section-padding);
  background-color: var(--bg-alt);
  transition: background-color var(--transition) ease;
}

.products-aliado {
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%);
}

/* ===== GRID ===== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* ===== CARD ===== */
.product-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px var(--shadow);
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
  height: 240px;
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
  transition: transform 0.5s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
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

.product-name {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.original-price {
  font-size: 1rem;
  color: var(--text-muted);
  text-decoration: line-through;
  opacity: 0.7;
}

.current-price {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent);
}

.product-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.product-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  gap: 0.5rem;
  font-weight: 700;
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
    height: 200px;
  }
}
</style>
