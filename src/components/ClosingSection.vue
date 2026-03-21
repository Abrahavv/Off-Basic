<script setup>
const whatsappNumber = '1234567890';

const getPostulacionUrl = () => {
  const msg = '¡Hola! Quiero postularme para ser Aliado oficial.';
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
};
</script>

<template>
  <section class="closing-section">
    <div class="container closing-inner">
      <h2 class="section-title">Conviértete en Portador.</h2>
      <p class="closing-copy">
        No buscamos vendedores. Buscamos socios. 
        Evaluamos cada postulación para proteger la exclusividad de nuestra red.
      </p>
      <a :href="getPostulacionUrl()" target="_blank" rel="noopener noreferrer" class="btn-primary closing-btn">
        Aliado
      </a>
    </div>
  </section>
</template>

<style scoped>
.closing-section {
  padding: var(--section-padding);
  background-color: var(--bg);
  text-align: center;
}

.closing-inner {
  max-width: 650px;
  margin: 0 auto;
}

.closing-copy {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  font-weight: 300;
}

.closing-btn {
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
}
</style>
