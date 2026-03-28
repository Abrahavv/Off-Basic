<script setup>
import { computed } from 'vue';
import { WHATSAPP_NUMBER } from '../config.js';

const props = defineProps({
  mode: String
});

const isAliado = computed(() => props.mode === 'aliado');

const abrirCompra = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=` + encodeURIComponent('¡Hola! Quiero la Llave Aliado.');
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
  <section class="affiliate-video-section" v-if="isAliado">
    <div class="container">
      <div class="launch-badge">Precio de lanzamiento — solo por tiempo limitado</div>
      <div class="countdown">47 : 51 : 05</div>

      <h1>Haz que tus vídeos se vean profesionales y disruptivos</h1>
      <p>Accede al Baúl de Pablo con la Llave de Entrada</p>

      <div class="video-embed">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/caAWn6xFWkI"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <button class="buy-btn" @click="abrirCompra">ACCEDER</button>
      <p class="subtext">Acceso inmediato tras el pago. Sin suscripciones. Sin trampa.</p>
    </div>
  </section>
</template>

<style scoped>
.affiliate-video-section {
  background: radial-gradient(circle at top, rgba(148, 221, 61, 0.07), rgba(0, 0, 0, 0.96));
  color: #d8f99b;
  padding: 4rem 2rem 3rem;
  text-align: center;
}

.container {
  max-width: 980px;
  margin: 0 auto;
}

.launch-badge {
  font-size: 0.85rem;
  color: #b2ff9a;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.countdown {
  margin-bottom: 1.3rem;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #f9ff85;
}

h1 {
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 900;
  color: #fff;
  margin-bottom: 0.8rem;
}

p {
  color: #cbe5a2;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.video-embed {
  border: 2px solid rgba(203, 229, 162, 0.35);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1.8rem;
}

.buy-btn {
  margin-top: 1rem;
  background: linear-gradient(90deg, #b9f96f, #7eea5f);
  border: none;
  color: #182f13;
  font-weight: 900;
  font-size: 1.1rem;
  border-radius: 14px;
  padding: 1rem 1.7rem;
  cursor: pointer;
}

.subtext {
  margin-top: 0.7rem;
  font-size: 0.88rem;
  color: #b7cfa0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .affiliate-video-section {
    padding: 3rem 1rem 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  .video-placeholder {
    padding: 1.2rem;
  }

  .buy-btn {
    width: 100%;
  }
}
</style>
