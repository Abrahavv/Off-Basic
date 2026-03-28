<script setup>
// Pantalla de mantenimiento
</script>

<template>
  <div class="maintenance-container">
    <div class="content">
      <img src="/Off-Basic-Web-Cromado.png" alt="Off Basic Logo" class="logo" />
      <h1 class="title">SITIO EN MANTENIMIENTO</h1>
      <p class="subtitle">Estamos realizando mejoras en el sistema para ofrecerte una experiencia superior en breves.</p>
      <div class="accent-text">VOLVEREMOS PRONTO</div>
    </div>
  </div>
</template>

<style scoped>
.maintenance-container {
  min-height: 100vh;
  width: 100vw;
  background-color: var(--bg); /* Usa el fondo global dark (o el de modo Aliado) */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999; /* Por encima de cualquier navbar/cart */
  padding: 2rem;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  animation: fadeIn 0.8s ease-out;
}

.logo {
  width: 280px;
  max-width: 80%;
  margin-bottom: 3rem;
  filter: drop-shadow(0 0 25px rgba(0, 240, 255, 0.15));
  animation: float 4s ease-in-out infinite;
}

.title {
  color: #ffffff; /* Letras blancas requeridas */
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-transform: uppercase;
}

.subtitle {
  color: #9CA3AF; /* Gris claro */
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
}

.accent-text {
  color: var(--accent); /* Azul cyan característico de Off Basic */
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 100px;
  background: rgba(0, 240, 255, 0.05);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
  transition: all 0.3s ease;
}

.accent-text:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
  background: rgba(0, 240, 255, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 768px) {
  .logo {
    width: 200px;
    margin-bottom: 2.5rem;
  }
  
  .title {
    font-size: 2.25rem;
  }
  
  .accent-text {
    font-size: 1rem;
    padding: 0.8rem 2rem;
  }
}
</style>
