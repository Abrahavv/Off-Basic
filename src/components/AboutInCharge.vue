<script setup>
</script>

<template>
  <section id="quien-soy" class="about-section">
    <div class="container">
      <h2 class="section-title">¿Quién está a cargo?</h2>
      
      <div class="about-grid">
        <div class="about-image-wrapper">
          <div class="image-placeholder">
            <!-- You can replace the src below with an actual image -->
            <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="accent-border"></div>
        </div>
        
        <div class="about-content">
          <h3 class="about-name">John Doe</h3>
          <p class="about-role text-accent">Fundador & CEO</p>
          <p class="about-bio">
            Con más de 10 años de experiencia en el sector del comercio electrónico y marketing de afiliados, 
            nuestro objetivo es proporcionar las mejores herramientas y productos para escalar tu negocio de manera exponencial.
          </p>
          <p class="about-bio">
            Este espacio está diseñado para conectar directamente contigo, ofreciendo soluciones de alto rendimiento
            que combinan diseño profesional, tecnología puntera y un enfoque obsesivo en la conversión.
          </p>
          
          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-number">10+</span>
              <span class="stat-label">Años Exp.</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">5k+</span>
              <span class="stat-label">Clientes</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">Compromiso</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: var(--section-padding);
  background-color: var(--bg-color-alt);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.about-image-wrapper {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 40px var(--shadow-color);
  overflow: hidden;
}

.placeholder-icon {
  width: 100px;
  height: 100px;
  color: var(--text-color-muted);
  opacity: 0.3;
}

.accent-border {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--accent-color);
  border-radius: var(--border-radius);
  z-index: 1;
  transition: transform 0.3s ease;
}

.about-image-wrapper:hover .accent-border {
  transform: translate(-10px, -10px);
}

.about-name {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.about-role {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.about-bio {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.stats-row {
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
  border-top: 1px solid var(--card-border);
  padding-top: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-color);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-color-muted);
  font-weight: 500;
}
</style>
