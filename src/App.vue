<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue';
import Navbar from './components/Navbar.vue';
import ProductDetailView from './components/ProductDetailView.vue';
import FooterSection from './components/FooterSection.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import BottomPromoBar from './components/BottomPromoBar.vue';
import MaintenanceMode from './components/MaintenanceMode.vue';
import ModePersonalView from './components/ModePersonalView.vue';
import ModeAliadoView from './components/ModeAliadoView.vue';

// --- DATA ---
const products = [
  {
    id: 1,
    name: 'Smartwatch',
    tag: 'MÁS VENDIDO',
    price: 25.00,
    originalPrice: 45.00,
    rating: 4.8,
    reviewCount: 124,
    image: '/product-smartwatch.svg',
    description: 'Experimenta el rendimiento máximo en tu muñeca. Incluye monitoreo avanzado de salud en tiempo real, notificaciones inteligentes...',
    extraImages: ['/product-smartwatch.svg', '/product-smartwatch.svg'],
    specs: [
      { label: 'Batería', value: '7-10 días' },
      { label: 'Resistencia', value: 'IP68 Sumergible' },
      { label: 'Pantalla', value: '1.9" AMOLED' }
    ],
    stats: {
      margin: 45,
      roi: '220%',
      demand: 'Muy Alta',
      minOrder: 10,
      profitPerUnit: 11.25,
      avgDailySales: 8,
      restockDays: 3,
      radarStats: [
        { label: 'Demanda', value: 90 },
        { label: 'Rentabilidad', value: 85 },
        { label: 'Escalabilidad', value: 95 },
        { label: 'Estabilidad', value: 80 },
        { label: 'Retención', value: 75 }
      ]
    },
    histogram: [
      { month: 'Ene', percent: 40 },
      { month: 'Feb', percent: 65 },
      { month: 'Mar', percent: 85 },
      { month: 'Abr', percent: 70 },
      { month: 'May', percent: 90 },
      { month: 'Jun', percent: 100 }
    ]
  },
  {
    id: 2,
    name: 'Audífonos ANC',
    tag: 'NUEVO',
    price: 20.00,
    originalPrice: 35.00,
    rating: 4.9,
    reviewCount: 89,
    image: '/product-audifonos.svg',
    description: 'Aísla el ruido exterior y domina tu entorno con tecnología de cancelación activa. Disfruta de un sonido de alta fidelidad con bajos...',
    extraImages: ['/product-audifonos.svg', '/product-audifonos.svg'],
    specs: [
      { label: 'ANC', value: 'Hasta 40dB' },
      { label: 'Autonomía', value: '30h con estuche' },
      { label: 'Bluetooth', value: '5.3 Estable' }
    ],
    stats: {
      margin: 52,
      roi: '280%',
      demand: 'Alta',
      minOrder: 5,
      profitPerUnit: 10.40,
      avgDailySales: 6,
      restockDays: 5,
      satisfaction: 98,
      competitionLevel: 30,
      monthlyRevenue: 3600,
      radarStats: [
        { label: 'Demanda', value: 85 },
        { label: 'Rentabilidad', value: 92 },
        { label: 'Escalabilidad', value: 80 },
        { label: 'Estabilidad', value: 95 },
        { label: 'Retención', value: 88 }
      ]
    },
    histogram: [
      { month: 'Ene', percent: 30 },
      { month: 'Feb', percent: 45 },
      { month: 'Mar', percent: 60 },
      { month: 'Abr', percent: 75 },
      { month: 'May', percent: 85 },
      { month: 'Jun', percent: 95 }
    ]
  },
  {
    id: 3,
    name: 'Dock Magnético',
    tag: 'LIMITADO',
    price: 22.00,
    originalPrice: 40.00,
    rating: 4.7,
    reviewCount: 56,
    image: '/product-dock.svg',
    description: 'Simplifica tu carga con tecnología de inducción magnética. Un solo lugar elegante para cargar simultáneamente tu reloj...',
    extraImages: ['/product-dock.svg', '/product-dock.svg'],
    specs: [
      { label: 'Capacidad', value: '10,000 mAh' },
      { label: 'MagSafe', value: '15W Carga rápida' },
      { label: 'Puertos', value: 'USB-C Bi-direccional' }
    ],
    stats: {
      margin: 38,
      roi: '180%',
      demand: 'Media-Alta',
      minOrder: 20,
      profitPerUnit: 8.36,
      avgDailySales: 4,
      restockDays: 7,
      satisfaction: 94,
      competitionLevel: 15,
      monthlyRevenue: 2640,
      radarStats: [
        { label: 'Demanda', value: 70 },
        { label: 'Rentabilidad', value: 78 },
        { label: 'Escalabilidad', value: 96 },
        { label: 'Estabilidad', value: 85 },
        { label: 'Retención', value: 92 }
      ]
    },
    histogram: [
      { month: 'Ene', percent: 20 },
      { month: 'Feb', percent: 35 },
      { month: 'Mar', percent: 50 },
      { month: 'Abr', percent: 65 },
      { month: 'May', percent: 80 },
      { month: 'Jun', percent: 100 }
    ]
  }
];

// --- APP STATE ---
const isMaintenanceMode = ref(false); // Cambiar a false para desactivar el modo mantenimiento
const currentMode = ref(localStorage.getItem('offbasic_mode') || 'personal');
const activeProductId = ref(null);
const handleScroll = () => {
  // Logic for other scroll-dependent elements if any
};

const activeProduct = computed(() => {
  return products.find(p => p.id === activeProductId.value);
});

const displayProducts = computed(() => {
  if (currentMode.value === 'aliado') {
    return products.map(p => ({ ...p, id: `aliado-${p.id}`, name: `Pack de ${p.name}` }));
  }
  return products;
});

const modeViewComponent = computed(() => {
  return currentMode.value === 'aliado' ? ModeAliadoView : ModePersonalView;
});

const activeProductData = computed(() => {
  if (!activeProduct.value) return null;
  if (currentMode.value === 'aliado') {
    return { ...activeProduct.value, id: `aliado-${activeProduct.value.id}`, name: `Pack de ${activeProduct.value.name}` };
  }
  return activeProduct.value;
});

const setMode = (mode) => {
  if (currentMode.value === mode) return;
  
  currentMode.value = mode;
  localStorage.setItem('offbasic_mode', mode);

  // Forzamos scroll instantáneo al cambiar de modo para evitar sensación de "pegado"
  window.scrollTo({ top: 0, behavior: 'instant' });
};

const applyThemeClass = () => {
  document.body.className = `modo-${currentMode.value}`;
};

const closeProduct = () => {
  window.history.pushState(null, null, window.location.pathname);
  activeProductId.value = null;
  // Small delay to ensure the re-render happens before scrolling
  setTimeout(() => {
    const targetId = currentMode.value === 'aliado' ? 'baul-content' : 'productos';
    const target = document.getElementById(targetId) || document.getElementById('productos');
    if (target) {
      const nav = document.querySelector('.navbar-wrapper');
      const offset = nav ? nav.offsetHeight + 20 : 100;
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: pos,
        behavior: 'smooth'
      });
    }
  }, 50);
};

// Scroll position persistence
const saveScrollPosition = () => {
  const scrollY = window.scrollY;
  localStorage.setItem('scrollPosition', scrollY.toString());
};

const restoreScrollPosition = () => {
  const savedPosition = localStorage.getItem('scrollPosition');
  if (savedPosition) {
    const scrollY = parseInt(savedPosition, 10);
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 100);
  }
};

const handleHash = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#p-')) {
    const rawId = hash.replace('#p-', '');
    // Handle both numeric IDs and 'aliado-X' IDs
    const id = parseInt(rawId.replace('aliado-', ''));
    activeProductId.value = id;
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    activeProductId.value = null;
  }
};

onMounted(() => {
  applyThemeClass();
  handleHash();
  // Always start at the top (hero section) instead of restoring scroll position
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 50);
  window.addEventListener('popstate', handleHash);
  window.addEventListener('beforeunload', saveScrollPosition);
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handleHash);
  window.removeEventListener('beforeunload', saveScrollPosition);
  window.removeEventListener('scroll', handleScroll);
});

watch(currentMode, () => {
  applyThemeClass();
});
</script>

<template>
  <div class="app-container">
    <!-- MAINTENANCE MODE -->
    <MaintenanceMode v-if="isMaintenanceMode" />

    <template v-else>
      <!-- SHOPPING CART DRAWER (always present) -->
      <ShoppingCart />

      <!-- PRODUCT ISOLATION VIEW -->
    <template v-if="activeProductData">
      <div class="isolation-overlay">
        <ProductDetailView 
          :product="activeProductData" 
          :isAliado="currentMode === 'aliado'" 
          @close="closeProduct" 
        />
      </div>
    </template>

    <!-- MAIN APP FLOW -->
    <template v-else>
      <div class="app-wrapper">
        <Navbar :mode="currentMode" @switch-mode="setMode" />
        <main>
          <transition name="page" mode="out-in">
            <component
              :is="modeViewComponent"
              :key="currentMode"
              :mode="currentMode"
              :products="currentMode === 'aliado' ? displayProducts : products"
              @switch-mode="setMode"
            />
          </transition>
        </main>
        <FooterSection :mode="currentMode" />
        <BottomPromoBar :mode="currentMode" />

      </div>
    </template>
    
    </template>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.isolation-overlay {
  min-height: 100vh;
  background-color: var(--bg);
  animation: slideIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}

.page-enter-active, .page-leave-active {
  transition: opacity 0.1s ease;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .back-to-top {
    bottom: 120px; /* Aún más arriba en móvil para no tapar el CTA de la barra */
    right: 20px;
    width: 46px;
    height: 46px;
  }
}
</style>
