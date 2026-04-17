<script setup>
import { defineProps, defineEmits } from 'vue';
import Hero from './Hero.vue';
import BaulExplainer from './BaulExplainer.vue';
import BenefitsSection from './BenefitsSection.vue';
import ComparisonSection from './ComparisonSection.vue';
import ProductList from './ProductList.vue';
import KeysSection from './KeysSection.vue';
import BonusSection from './BonusSection.vue';
import ObjectivesSection from './ObjectivesSection.vue';
import FounderSection from './FounderSection.vue';
import PaymentMethods from './PaymentMethods.vue';
import TestimonialsSection from './TestimonialsSection.vue';
import ClosingSection from './ClosingSection.vue';
import FaqSection from './FaqSection.vue';

const props = defineProps({
  mode: String,
  products: Array
});
const emit = defineEmits(['switch-mode']);
</script>

<template>
  <div class="mode-page-inner">
    <Hero :mode="props.mode" @switch-mode="emit('switch-mode', $event)" />

    <BaulExplainer mode="aliado" />
    <BenefitsSection />
    <ComparisonSection mode="aliado" />

    <ProductList :mode="props.mode" :products="props.products" />

    <KeysSection mode="aliado" />
    <BonusSection mode="aliado" />

    <ObjectivesSection :mode="props.mode" />
    <FounderSection :mode="props.mode" />
    <PaymentMethods :mode="props.mode" />
    <TestimonialsSection :mode="props.mode" />
    <ClosingSection />
    <FaqSection :mode="props.mode" />
  </div>
</template>

<style scoped>
.mode-page-inner {
  animation: fadeInFast 0.15s ease-out both;
}

@keyframes fadeInFast {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
