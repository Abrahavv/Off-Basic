<script setup>
const props = defineProps({
  mode: String
});
</script>

<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <div class="footer-logo-wrap">
          <img 
            :src="mode === 'aliado' ? '/Icono-web-Oscuro.png' : '/Icono-web-Claro.png'" 
            alt="Off Basic" 
            class="footer-logo"
            loading="lazy"
          />
          <span class="logo-text">OFF BASIC</span>
        </div>
        <p class="footer-desc">Tecnología premium para quienes exigen más.</p>
      </div>
      
      <div class="footer-links">
        <div class="link-column">
          <h4>Navegación</h4>
          <a href="#">Inicio</a>
          <a href="#productos">Productos</a>
        </div>
        
        <div class="link-column">
          <h4>Legal</h4>
          <a href="#">Términos de Servicio</a>
          <a href="#">Política de Privacidad</a>
        </div>
        
        <div class="link-column">
          <h4>Redes</h4>
          <div class="social-icons">
            <a href="https://instagram.com" target="_blank" class="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.036 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" class="social-link" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" class="social-link" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.043-.074 1.957l-.008.104-.022.26-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.42c-.101-.38-.172-.883-.22-1.402l-.01-.104-.022-.26-.008-.104A18.857 18.857 0 0 1 .056 7.901v-.075c.001-.194.01-1.043.074-1.957l.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        &copy; 2026 Off Basic. Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--card-bg);
  border-top: 1px solid var(--card-border);
  padding-top: 3.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-logo-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.footer-logo {
  height: 36px;
  width: auto;
}

.logo-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.5px;
  color: var(--text);
}

.footer-desc {
  font-size: 0.9rem;
  max-width: 280px;
  line-height: 1.6;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.link-column h4 {
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
  letter-spacing: 0.5px;
}

.link-column a {
  display: block;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  font-weight: 300;
  transition: color 0.3s, transform 0.3s;
}

.link-column a:hover {
  color: var(--accent);
  transform: translateX(4px);
}

.social-icons {
  display: flex;
  gap: 0.75rem;
}

.link-column .social-link {
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--text-muted);
  background: transparent;
  margin-bottom: 0;
  transition: all 0.3s ease;
}

.link-column .social-link:hover {
  color: var(--accent);
  background: rgba(0, 208, 255, 0.08);
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  padding: 1.25rem 0;
  border-top: 1px solid var(--card-border);
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 300;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .footer-links {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>
