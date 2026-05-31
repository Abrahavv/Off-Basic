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
    name: 'Apple Watch Serie Nike',
    tag: 'MÁS VENDIDO',
    price: 35.00,
    originalPrice: 45.00,
    aliadoPrice: 25.00,
    rating: 4.8,
    reviewCount: 124,
    image: '/Apple-Watch-Nike-1.jpg',
    description: 'Experimenta el rendimiento máximo en tu muñeca. Incluye monitoreo avanzado de salud en tiempo real, notificaciones inteligentes...',
    extraImages: ['/Apple-Watch-Nike-1.jpg', '/Apple-Watch-Nike-2.jpg', '/Apple-Watch-Nike-3.jpg', '/Apple-Watch-Nike-4.jpg'],
    specs: [
      { label: 'Batería', value: 'Hasta 18 horas de autonomía normal (y hasta 36 horas en Modo Ahorro de Batería)' },
      { label: 'Resistencia', value: 'Sumergible hasta 50 metros (WR50) y certificado IP6X resistente al polvo' },
      { label: 'Pantalla', value: 'Retina siempre activa (Always-On) con hasta 2,000 nits de brillo para una visibilidad perfecta bajo el sol' }
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
    name: 'AirPods Pro 2',
    tag: 'NUEVO',
    price: 25.00,
    originalPrice: 35.00,
    aliadoPrice: 13.50,
    rating: 4.9,
    reviewCount: 89,
    image: '/AirPods-Pro-2-1.jpg',
    description: 'Aísla el ruido exterior y domina tu entorno con tecnología de cancelación activa. Disfruta de un sonido de alta fidelidad con bajos...',
    extraImages: ['/AirPods-Pro-2-1.jpg', '/AirPods-Pro-2-2.jpg', '/AirPods-Pro-2-3.jpg', '/AirPods-Pro-2-4.jpg'],
    specs: [
      { label: 'Bluetooth', value: 'Versión 5.3 (conexión más estable y eficiente con chip H2)' },
      { label: 'Autonomía', value: 'Hasta 6 horas por carga (y hasta 30 horas en total con el estuche)' },
      { label: 'Cancelación de Ruido', value: 'El doble de potente que en la generación anterior' }
    ],
    stats: {
      margin: 55.9,
      roi: '55.9%',
      demand: 'Muy Alta',
      minOrder: 3,
      profitPerUnit: 7.55,
      avgDailySales: 4,
      restockDays: 5,
      satisfaction: 99,
      competitionLevel: 15,
      monthlyRevenue: 679.50,
      monthlyForecast: 90,
      radarStats: [
        { label: 'Demanda', value: 95 },
        { label: 'Rentabilidad', value: 85 },
        { label: 'Escalabilidad', value: 80 },
        { label: 'Estabilidad', value: 95 },
        { label: 'Retención', value: 90 }
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
    name: 'Cargador Completo 20W (Cubo Tipo C + Cable)',
    tag: 'LIMITADO',
    price: 15.00,
    originalPrice: 20.00,
    aliadoPrice: 6.50,
    rating: 4.7,
    reviewCount: 56,
    image: '/Cargador-Completo-1.jpg',
    description: 'Carga tu dispositivo a la máxima velocidad con nuestro adaptador USB-C de 20W (Calidad 1:1 / OEM). Ofrece el mismo diseño estético, peso y rendimiento que el original, garantizando una carga rápida, segura and eficiente.',
    extraImages: ['/Cargador-Completo-1.jpg', '/Cargador-Completo-2.jpg', '/Cargador-Completo-3.jpg', '/Cargador-Completo-4.jpg'],
    specs: [
      { label: 'Cubo: Potencia', value: '20W con carga rápida Power Delivery (0% a 50% en ~30 min)' },
      { label: 'Cubo: Seguridad', value: 'Chip inteligente contra sobrecalentamiento y cortocircuitos' },
      { label: 'Cubo: Compatibilidad', value: 'Universal USB-C, optimizado para iPhone 8 en adelante (100-240V)' },
      { label: 'Cable: Compatibilidad', value: 'Chip interno sin errores de iOS (Calidad 1:1 / OEM)' },
      { label: 'Cable: Construcción', value: 'Longitud de 1 metro en material TPE flexible y reforzado' },
      { label: 'Cable: Velocidad', value: 'Soporta carga rápida de 20W y transferencia de datos de 480 Mbps' }
    ],
    stats: {
      margin: 55.4,
      roi: '55.4%',
      demand: 'Muy Alta',
      minOrder: 4,
      profitPerUnit: 3.60,
      avgDailySales: 5,
      restockDays: 7,
      satisfaction: 99,
      competitionLevel: 15,
      monthlyRevenue: 324.00,
      monthlyForecast: 90,
      radarStats: [
        { label: 'Demanda', value: 95 },
        { label: 'Rentabilidad', value: 85 },
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

const getInitialMode = () => {
  const path = window.location.pathname;
  if (path === '/aliado' || path === '/aliado/') {
    return 'aliado';
  }
  return localStorage.getItem('offbasic_mode') || 'personal';
};

const currentMode = ref(getInitialMode());
const activeProductId = ref(null);
// --- SCROLLPERSIST ---

const handleScroll = () => {
  // Logic for other scroll-dependent elements if any
};

const activeProduct = computed(() => {
  return products.find(p => p.id === activeProductId.value);
});

const displayProducts = computed(() => {
  if (currentMode.value === 'aliado') {
    return products.map(p => ({
      ...p,
      id: `aliado-${p.id}`,
      name: `Pack de ${p.name}`,
      price: p.aliadoPrice,
      originalPrice: p.price
    }));
  }
  return products;
});

const modeViewComponent = computed(() => {
  return currentMode.value === 'aliado' ? ModeAliadoView : ModePersonalView;
});

const activeProductData = computed(() => {
  if (!activeProduct.value) return null;
  if (currentMode.value === 'aliado') {
    return {
      ...activeProduct.value,
      id: `aliado-${activeProduct.value.id}`,
      name: `Pack de ${activeProduct.value.name}`,
      price: activeProduct.value.aliadoPrice,
      originalPrice: activeProduct.value.price
    };
  }
  return activeProduct.value;
});

const setMode = (mode) => {
  if (currentMode.value === mode) return;
  
  currentMode.value = mode;
  localStorage.setItem('offbasic_mode', mode);

  if (mode === 'aliado') {
    window.history.pushState(null, '', '/aliado');
  } else {
    window.history.pushState(null, '', '/');
  }

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
  // Sync mode based on pathname
  const path = window.location.pathname;
  if (path === '/aliado' || path === '/aliado/') {
    if (currentMode.value !== 'aliado') {
      currentMode.value = 'aliado';
      localStorage.setItem('offbasic_mode', 'aliado');
    }
  } else {
    if (currentMode.value !== 'personal') {
      currentMode.value = 'personal';
      localStorage.setItem('offbasic_mode', 'personal');
    }
  }

  const hash = window.location.hash;
  if (hash.startsWith('#producto-')) {
    const rawId = hash.replace('#producto-', '');
    const id = parseInt(rawId);
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
  
  // If there's a hash and it starts with #producto-, sync/open it, otherwise clear it to start at home
  if (window.location.hash) {
    if (window.location.hash.startsWith('#producto-')) {
      handleHash();
    } else {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }
  
  // Always start at the top (hero section) if not opening a product deep link
  if (!window.location.hash.startsWith('#producto-')) {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);
  }
  
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
