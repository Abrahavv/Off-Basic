<script setup>
import { ref, onMounted, watch } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import AboutInCharge from './components/AboutInCharge.vue';
import ObjectivesBox from './components/ObjectivesBox.vue';
import ProductList from './components/ProductList.vue';
import FooterSection from './components/FooterSection.vue';

// Theme modes: 'mercado' (Light) & 'afiliado' (Dark)
const currentMode = ref('afiliado'); // Default mode

const toggleMode = () => {
  currentMode.value = currentMode.value === 'mercado' ? 'afiliado' : 'mercado';
};

// Apply CSS class to document body to manage global styles
const applyThemeClass = () => {
  document.body.className = `modo-${currentMode.value}`;
};

watch(currentMode, () => {
  applyThemeClass();
  // We can optionally store the preference in localStorage
  localStorage.setItem('theme-preference', currentMode.value);
});

onMounted(() => {
  const savedTheme = localStorage.getItem('theme-preference');
  if (savedTheme && (savedTheme === 'mercado' || savedTheme === 'afiliado')) {
    currentMode.value = savedTheme;
  }
  applyThemeClass();
});
</script>

<template>
  <div class="app-wrapper">
    <Navbar :mode="currentMode" @toggle-mode="toggleMode" />
    <main>
      <Hero :mode="currentMode" />
      <AboutInCharge />
      <ObjectivesBox />
      <ProductList :mode="currentMode" />
    </main>
    <FooterSection :mode="currentMode" />
  </div>
</template>

<style scoped>
/* Scoped styles aren't strictly necessary since global handles everything, 
   but added wrapper for good practices */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex-grow: 1;
}
</style>
