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
      satisfaction: 96,
      competitionLevel: 22,
      monthlyRevenue: 6000,
      categories: [
        { name: 'Salud & Fitness', percent: 40 },
        { name: 'Moda & Estilo', percent: 30 },
        { name: 'Productividad', percent: 20 },
        { name: 'Regalos', percent: 10 }
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
      categories: [
        { name: 'Trabajo Remoto', percent: 35 },
        { name: 'Deportes', percent: 25 },
        { name: 'Viajes', percent: 25 },
        { name: 'Gaming', percent: 15 }
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
      categories: [
        { name: 'Oficina & Escritorio', percent: 45 },
        { name: 'Hogar', percent: 30 },
        { name: 'Regalos Corp.', percent: 15 },
        { name: 'Viajes', percent: 10 }
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
const showBackToTop = ref(false);

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 800;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Instant scroll on mobile to avoid jank during DOM updates
  const isMobile = window.innerWidth <= 768;
  const scrollBehavior = isMobile ? 'auto' : 'smooth';

  // Use requestAnimationFrame for smoother state transition before scrolling
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: scrollBehavior });
  });
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
  restoreScrollPosition();
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
          <Hero :mode="currentMode" @switch-mode="setMode" />

          <!-- High-Octane Transition Layer -->
          <div class="mode-fade-in" :key="currentMode">
            
            <!-- Aliado Unique Intro -->
            <template v-if="currentMode === 'aliado'">
              <BaulExplainer mode="aliado" />
              <BenefitsSection />
              <ComparisonSection mode="aliado" />
            </template>

            <!-- Common Section: Products -->
            <ProductList 
              :mode="currentMode" 
              :products="currentMode === 'aliado' ? displayProducts : products" 
            />

            <!-- Aliado Unique Perks -->
            <template v-if="currentMode === 'aliado'">
              <KeysSection mode="aliado" />
              <BonusSection mode="aliado" />
            </template>

            <!-- Common Sections -->
            <ObjectivesSection :mode="currentMode" />
            <FounderSection :mode="currentMode" />
            <PaymentMethods :mode="currentMode" />
            <TestimonialsSection :mode="currentMode" />

            <!-- Aliado Closing -->
            <ClosingSection v-if="currentMode === 'aliado'" />
          </div>

          <FaqSection :mode="currentMode" />
        </main>
        <FooterSection :mode="currentMode" />
        <BottomPromoBar :mode="currentMode" />

        <!-- BACK TO TOP BUTTON -->
        <Transition name="fade">
          <button 
            v-if="showBackToTop" 
            @click="scrollToTop" 
            class="back-to-top"
            aria-label="Volver arriba"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </Transition>
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

/* === BACK TO TOP === */
.back-to-top {
  position: fixed;
  bottom: 100px; /* Above BottomPromoBar */
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--black);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 99;
  box-shadow: 0 4px 15px rgba(0, 208, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.back-to-top:hover {
  transform: scale(1.1) translateY(-5px);
  background: var(--accent-hover);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(20px);
}

@media (max-width: 480px) {
  .back-to-top {
    bottom: 90px;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}
</style>
