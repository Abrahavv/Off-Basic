<script setup>
import { defineProps, defineEmits } from 'vue';
import Hero from './Hero.vue';
import ProductList from './ProductList.vue';
import ObjectivesSection from './ObjectivesSection.vue';
import FounderSection from './FounderSection.vue';
import PaymentMethods from './PaymentMethods.vue';
import TestimonialsSection from './TestimonialsSection.vue';
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

    <ProductList :mode="props.mode" :products="props.products" />

    <ObjectivesSection :mode="props.mode" />
    <FounderSection :mode="props.mode" />
    <PaymentMethods :mode="props.mode" />
    <TestimonialsSection :mode="props.mode" />
    <FaqSection :mode="props.mode" />
  </div>
</template>

<style scoped>
.mode-page-inner {
  animation: fadeInUp 0.3s ease-out both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
