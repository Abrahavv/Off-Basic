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
    name: 'Apple Watch Nike',
    tag: 'MÁS VENDIDO',
    price: 25.00,
    originalPrice: 45.00,
    rating: 4.8,
    reviewCount: 124,
    image: '/Apple-Watch-Nike-1.jpg',
    description: 'Experimenta el rendimiento máximo en tu muñeca. Incluye monitoreo avanzado de salud en tiempo real, notificaciones inteligentes...',
    extraImages: ['/Apple-Watch-Nike-1.jpg', '/Apple-Watch-Nike-2.jpg', '/Apple-Watch-Nike-3.jpg', '/Apple-Watch-Nike-4.jpg'],
    specs: [
      { label: 'Batería', value: '7-10 días' },
      { label: 'Resistencia', value: 'IP68 Sumergible' },
      { label: 'Pantalla', value: '1.9" AMOLED' }
    ],
    stats: {
      margin: 34.7,
      roi: '34.7%',
      demand: 'Muy Alta',
      minOrder: 2,
      profitPerUnit: 8.68,
      avgDailySales: 3,
      restockDays: 3,
      satisfaction: 99,
      competitionLevel: 15,
      monthlyRevenue: 781.20,
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
    name: 'AirPods Pro 2 ',
    tag: 'NUEVO',
    price: 20.00,
    originalPrice: 35.00,
    rating: 4.9,
    reviewCount: 89,
    image: '/AirPods-Pro-2-1.jpg',
    description: 'Aísla el ruido exterior y domina tu entorno con tecnología de cancelación activa. Disfruta de un sonido de alta fidelidad con bajos...',
    extraImages: ['/AirPods-Pro-2-1.jpg', '/AirPods-Pro-2-2.jpg', '/AirPods-Pro-2-3.jpg', '/AirPods-Pro-2-4.jpg'],
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
    name: 'Cargador Completo',
    tag: 'LIMITADO',
    price: 22.00,
    originalPrice: 40.00,
    rating: 4.7,
    reviewCount: 56,
    image: '/Cargador-Completo-1.jpg',
    description: 'Simplifica tu carga con tecnología de inducción magnética. Un solo lugar elegante para cargar simultáneamente tu reloj...',
    extraImages: ['/Cargador-Completo-1.jpg', '/Cargador-Completo-2.jpg', '/Cargador-Completo-3.jpg', '/Cargador-Completo-4.jpg'],
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
  // Increased delay even further (350ms) to ensure the DOM is fully stable and previous overlay is gone
  setTimeout(() => {
    const targetId = currentMode.value === 'aliado' ? 'baul-content' : 'productos';
    const target = document.getElementById(targetId);
    
    if (target) {
      // 1. Instant scroll to the approximate position to "break" any sticky scroll from the previous view
      const topPos = target.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: topPos, behavior: 'auto' });
      
      // 2. Smooth scroll to the exact target (using scrollIntoView to respect scroll-padding-top)
      requestAnimationFrame(() => {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 350);
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
  // Disable browser automatic scroll restoration to ensure we start at the top
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  applyThemeClass();
  
  // Clear any existing hash on initial load to ensure we start at "inicio" (home)
  // as requested by the user, instead of opening a product detail view.
  if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname);
  }
  
  // Always start at the top (hero section)
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 100);
  
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
