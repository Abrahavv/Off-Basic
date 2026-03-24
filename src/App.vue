<script setup>
import { ref, onMounted, watch } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import ProductList from './components/ProductList.vue';
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

// Modos: 'personal' (Light) & 'aliado' (Dark)
const currentMode = ref('personal');
// Modo Mantenimiento 
const isMaintenanceMode = ref(false);

const toggleMode = () => {
  currentMode.value = currentMode.value === 'personal' ? 'aliado' : 'personal';
};

const setMode = (mode) => {
  currentMode.value = mode;
};

const applyThemeClass = () => {
  document.body.className = `modo-${currentMode.value}`;
};

watch(currentMode, () => {
  applyThemeClass();
});

onMounted(() => {
  applyThemeClass();
});
</script>

<template>
  <div v-if="isMaintenanceMode" class="maintenance-screen">
    <img src="/Off-Basic-Web-Cromado.png" alt="Off Basic" class="maintenance-logo" />
    <h1 class="maintenance-text">En mantenimiento</h1>
  </div>
  
  <div v-else class="app-wrapper">
    <Navbar :mode="currentMode" @switch-mode="setMode" />
    <main>
      <Hero :mode="currentMode" @switch-mode="setMode" />

      <!-- Personal Mode Sections -->
      <template v-if="currentMode === 'personal'">
        <ProductList :mode="currentMode" />
        <ObjectivesSection :mode="currentMode" />
        <FounderSection :mode="currentMode" />
        <PaymentMethods :mode="currentMode" />
        <TestimonialsSection :mode="currentMode" />
      </template>

      <!-- Aliado Mode Sections -->
      <template v-else>
        <BaulExplainer :mode="currentMode" />
        <BenefitsSection />
        <ComparisonSection :mode="currentMode" />
        <ProductList :mode="currentMode" />
        <ObjectivesSection :mode="currentMode" />
        <KeysSection :mode="currentMode" />
        <FounderSection :mode="currentMode" />
        <PaymentMethods :mode="currentMode" />
        <TestimonialsSection :mode="currentMode" />
        <ClosingSection />
      </template>

      <FaqSection :mode="currentMode" />
    </main>
    <FooterSection :mode="currentMode" />
  </div>
</template>

<style scoped>
.maintenance-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #050505;
  color: white;
}
.maintenance-logo {
  max-width: 300px;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.1));
}
.maintenance-text {
  font-size: 2rem;
  font-weight: bold;
  font-family: var(--font-display);
  letter-spacing: 2px;
  color: var(--accent);
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
