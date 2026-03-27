<script setup>
import { ref, computed, watch } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');

const personalFaqs = [
  {
    question: '¿Cuánto tarda el envío?',
    answer: 'Los envíos se procesan en 24-48 horas hábiles. La entrega depende de tu ubicación, pero usualmente toma entre 3 y 7 días hábiles.'
  },
  {
    question: '¿Los productos tienen garantía?',
    answer: 'Sí. Todos nuestros productos tienen garantía de 6 meses por defectos de fabricación. Tu inversión está protegida.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencias bancarias, pago móvil, Zelle, Binance y PayPal. Contáctanos por WhatsApp para coordinar tu método preferido.'
  },
  {
    question: '¿Puedo devolver un producto?',
    answer: 'Aceptamos devoluciones dentro de los primeros 7 días siempre que el producto esté en perfectas condiciones y con su empaque original.'
  },
  {
    question: '¿Los productos son originales?',
    answer: 'Absolutamente. Trabajamos directamente con proveedores certificados para garantizar la autenticidad y calidad de cada artículo.'
  }
];

const aliadoFaqs = [
  {
    question: '¿Cómo obtengo la Llave de acceso?',
    answer: 'Contacta por WhatsApp usando el botón "Llave". Nuestro equipo verificará tu perfil y te enviará las credenciales de acceso a los precios al mayor.'
  },
  {
    question: '¿Cuál es el pedido mínimo?',
    answer: 'El pedido mínimo varía según el producto. Al obtener tu Llave, recibirás la tabla completa de precios y cantidades mínimas.'
  },
  {
    question: '¿Qué requisitos necesito para ser Aliado?',
    answer: 'Evaluamos cada solicitud individualmente. Buscamos personas comprometidas con la venta de tecnología premium. No necesitas experiencia previa, pero sí disposición para aprender.'
  },
  {
    question: '¿Recibo soporte para vender?',
    answer: 'Sí. Los aliados reciben material multimedia profesional (fotos, videos, copys), capacitación en ventas y soporte directo por WhatsApp.'
  },
  {
    question: '¿Qué significa la segunda y tercera Llave?',
    answer: 'Representan niveles de acceso futuro. Próximamente habilitaremos nuevas categorías de productos y beneficios exclusivos para aliados con mayor volumen.'
  }
];

const faqs = computed(() => isAliado.value ? aliadoFaqs : personalFaqs);

const openIndex = ref(null);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

// Reset when mode changes
watch(() => props.mode, () => {
  openIndex.value = null;
});

const revealRef = useScrollReveal();
</script>

<template>
  <section class="faq-section">
    <div class="container scroll-reveal slide-up" ref="revealRef">
      <h2 class="section-title">Preguntas Frecuentes</h2>
      
      <div class="faq-list">
        <div 
          v-for="(faq, i) in faqs" 
          :key="i" 
          class="faq-item"
          :class="{ 'faq-open': openIndex === i }"
        >
          <button class="faq-question" @click="toggle(i)">
            <span>{{ faq.question }}</span>
            <svg 
              class="faq-icon" 
              :class="{ 'rotated': openIndex === i }" 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <Transition name="faq-slide">
            <div v-if="openIndex === i" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  padding: var(--section-padding);
  background-color: var(--bg-alt);
}

.faq-list {
  max-width: 700px;
  margin: 2rem auto 0;
}

.faq-item {
  border-bottom: 1px solid var(--card-border);
  transition: all 0.3s ease;
}

.faq-item:first-child {
  border-top: 1px solid var(--card-border);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: color 0.3s ease;
  font-family: inherit;
}

.faq-question:hover {
  color: var(--accent);
}

.faq-icon {
  color: var(--text-muted);
  transition: transform 0.3s ease, color 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-icon.rotated {
  transform: rotate(180deg);
  color: var(--accent);
}

.faq-answer {
  overflow: hidden;
}

.faq-answer p {
  padding: 0 0 1.25rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-muted);
  font-weight: 300;
}

/* Slide Transition */
.faq-slide-enter-active {
  animation: slideDown 0.3s ease forwards;
}
.faq-slide-leave-active {
  animation: slideUp 0.25s ease forwards;
}

@keyframes slideDown {
  from { max-height: 0; opacity: 0; }
  to { max-height: 200px; opacity: 1; }
}

@keyframes slideUp {
  from { max-height: 200px; opacity: 1; }
  to { max-height: 0; opacity: 0; }
}

/* === Mobile === */
@media (max-width: 480px) {
  .faq-section {
    padding: 2.5rem 1rem;
  }
  .faq-question {
    font-size: 0.95rem;
    padding: 1rem 0;
  }
  .faq-answer p {
    font-size: 0.85rem;
    padding-bottom: 1rem;
  }
}
</style>
