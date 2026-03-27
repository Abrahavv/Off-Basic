<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import ProductList from './components/ProductList.vue';
import ProductDetailView from './components/ProductDetailView.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';
import FounderSection from './components/FounderSection.vue';
import BenefitsSection from './components/BenefitsSection.vue';
import ClosingSection from './components/ClosingSection.vue';
import PaymentMethods from './components/PaymentMethods.vue';
import ObjectivesSection from './components/ObjectivesSection.vue';
import FaqSection from './components/FaqSection.vue';
import FooterSection from './components/FooterSection.vue';
import ComparisonSection from './components/ComparisonSection.vue';
import KeysSection from './components/KeysSection.vue';
import BaulExplainer from './components/BaulExplainer.vue';
import AffiliateVideoSection from './components/AffiliateVideoSection.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import BottomPromoBar from './components/BottomPromoBar.vue';
import BonusSection from './components/BonusSection.vue';
import MaintenanceMode from './components/MaintenanceMode.vue';

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
    image: '/SmartWatch.png',
    description: 'Experimenta el rendimiento máximo en tu muñeca. Incluye monitoreo avanzado de salud en tiempo real, notificaciones inteligentes...',
    extraImages: ['/SmartWatch.png', '/SmartWatch.png'],
    specs: [
      { label: 'Batería', value: '7-10 días' },
      { label: 'Resistencia', value: 'IP68 Sumergible' },
      { label: 'Pantalla', value: '1.9" AMOLED' }
    ],
    stats: {
      margin: 45,
      roi: '220%',
      demand: 'Muy Alta',
      minOrder: 10
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
    image: '/Audifonos.png',
    description: 'Aísla el ruido exterior y domina tu entorno con tecnología de cancelación activa. Disfruta de un sonido de alta fidelidad con bajos...',
    extraImages: ['/Audifonos.png', '/Audifonos.png'],
    specs: [
      { label: 'ANC', value: 'Hasta 40dB' },
      { label: 'Autonomía', value: '30h con estuche' },
      { label: 'Bluetooth', value: '5.3 Estable' }
    ],
    stats: {
      margin: 52,
      roi: '280%',
      demand: 'Alta',
      minOrder: 5
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
    image: '/Cargador 3 en 1.png',
    description: 'Simplifica tu carga con tecnología de inducción magnética. Un solo lugar elegante para cargar simultáneamente tu reloj...',
    extraImages: ['/Cargador 3 en 1.png', '/Cargador 3 en 1.png'],
    specs: [
      { label: 'Capacidad', value: '10,000 mAh' },
      { label: 'MagSafe', value: '15W Carga rápida' },
      { label: 'Puertos', value: 'USB-C Bi-direccional' }
    ],
    stats: {
      margin: 38,
      roi: '180%',
      demand: 'Media-Alta',
      minOrder: 20
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

const activeProduct = computed(() => {
  return products.find(p => p.id === activeProductId.value);
});

const displayProducts = computed(() => {
  if (currentMode.value === 'aliado') {
    return products.map(p => ({ ...p, name: `Pack de ${p.name}` }));
  }
  return products;
});

const activeProductData = computed(() => {
  if (!activeProduct.value) return null;
  if (currentMode.value === 'aliado') {
    return { ...activeProduct.value, name: `Pack de ${activeProduct.value.name}` };
  }
  return activeProduct.value;
});

const setMode = (mode) => {
  currentMode.value = mode;
  localStorage.setItem('offbasic_mode', mode);
  // Add scroll to top on mode change
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 50);
};

const applyThemeClass = () => {
  document.body.className = `modo-${currentMode.value}`;
};

const closeProduct = () => {
  window.history.pushState(null, null, window.location.pathname);
  activeProductId.value = null;
  // Small delay to ensure the re-render happens before scrolling
  setTimeout(() => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  }, 50);
};

onMounted(() => {
  applyThemeClass();
  
  const handleHash = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#p-')) {
      const id = parseInt(hash.replace('#p-', ''));
      activeProductId.value = id;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      activeProductId.value = null;
    }
  };

  handleHash();
  window.addEventListener('popstate', handleHash);
});

watch(currentMode, () => {
  applyThemeClass();
});

// Scroll position persistence
const saveScrollPosition = () => {
  const scrollY = window.scrollY;
  localStorage.setItem('scrollPosition', scrollY.toString());
};

const restoreScrollPosition = () => {
  const savedPosition = localStorage.getItem('scrollPosition');
  if (savedPosition) {
    const scrollY = parseInt(savedPosition, 10);
    // Use nextTick to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 100);
  }
};

// Save scroll position before page unload
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', saveScrollPosition);
});

// Setup scroll position persistence
onMounted(() => {
  // Restore scroll position on page load
  restoreScrollPosition();
  
  // Save scroll position on page unload
  window.addEventListener('beforeunload', saveScrollPosition);
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
          <Hero :mode="currentMode" @switch-mode="setMode" />

          <!-- Personal Mode Sections -->
          <div v-show="currentMode === 'personal'" class="mode-fade-in">
            <ProductList :mode="currentMode" :products="products" />
            <ObjectivesSection :mode="currentMode" />
            <FounderSection :mode="currentMode" />
            <PaymentMethods :mode="currentMode" />
            <TestimonialsSection :mode="currentMode" />
          </div>

          <!-- Aliado Mode Sections -->
          <div v-show="currentMode === 'aliado'" class="mode-fade-in">
            <!-- Video integrado en Hero para modo aliado -->
            <BaulExplainer :mode="currentMode" />
            <BenefitsSection />
            <ComparisonSection :mode="currentMode" />
            <ProductList :mode="currentMode" :products="displayProducts" />
            <KeysSection :mode="currentMode" />
            <BonusSection :mode="currentMode" />
            <ObjectivesSection :mode="currentMode" />
            <FounderSection :mode="currentMode" />
            <PaymentMethods :mode="currentMode" />
            <TestimonialsSection :mode="currentMode" />
            <ClosingSection />
          </div>

          <FaqSection :mode="currentMode" />
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
</style>
