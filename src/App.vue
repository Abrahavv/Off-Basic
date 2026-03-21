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

// Modes: 'personal' (Light) & 'aliado' (Dark)
const currentMode = ref('personal');

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
  <div class="app-wrapper">
    <Navbar :mode="currentMode" @switch-mode="setMode" />
    <main>
      <Hero :mode="currentMode" @switch-mode="setMode" />

      <!-- Personal Mode Sections -->
      <template v-if="currentMode === 'personal'">
        <ProductList :mode="currentMode" />
        <TestimonialsSection :mode="currentMode" />
        <ObjectivesSection :mode="currentMode" />
        <FounderSection :mode="currentMode" />
        <PaymentMethods :mode="currentMode" />
      </template>

      <!-- Aliado Mode Sections -->
      <template v-else>
        <BenefitsSection />
        <ProductList :mode="currentMode" />
        <TestimonialsSection :mode="currentMode" />
        <ObjectivesSection :mode="currentMode" />
        <FounderSection :mode="currentMode" />
        <PaymentMethods :mode="currentMode" />
        <ClosingSection />
      </template>

      <FaqSection :mode="currentMode" />
    </main>
    <FooterSection :mode="currentMode" />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex-grow: 1;
}
</style>
