<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  mode: String
});

const isVip = computed(() => props.mode === 'afiliado');
const searchQuery = ref('');

// Replace this with your actual WhatsApp Number
const whatsappNumber = '1234567890';

const mercadoProducts = [
  // E-commerce
  { id: 1, name: 'Pack Digital Básico', price: '$29.99', niche: 'E-commerce', description: 'Herramientas esenciales para iniciar tu tienda online.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Ecom+Basic' },
  { id: 2, name: 'Master Shopify Setup', price: '$149.00', niche: 'E-commerce', description: 'Configuración profesional de tu tienda en Shopify.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Shopify' },
  { id: 3, name: 'Dropshipping Secrets', price: '$79.00', niche: 'E-commerce', description: 'Estrategias probadas para encontrar proveedores ganadores.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Dropship' },
  // IA
  { id: 4, name: 'IA para Contenido', price: '$59.00', niche: 'IA', description: 'Genera contenido masivo para redes usando inteligencia artificial.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=AI+Content' },
  { id: 5, name: 'Prompt Engineering Pro', price: '$89.00', niche: 'IA', description: 'Domina los prompts para obtener resultados expertos en LLMs.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Prompts' },
  { id: 6, name: 'Automatización con IA', price: '$199.00', niche: 'IA', description: 'Flujos de trabajo autónomos para ahorrar horas de trabajo.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=AI+Auto' },
  // Growth
  { id: 7, name: 'Growth Hacking 101', price: '$45.00', niche: 'Growth', description: 'Técnicas de crecimiento rápido para startups y marcas.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Growth' },
  { id: 8, name: 'Viralidad en Redes', price: '$67.00', niche: 'Growth', description: 'El algoritmo descifrado para volverte viral de manera orgánica.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Viral' },
  { id: 9, name: 'Scalability Blueprint', price: '$120.00', niche: 'Growth', description: 'Escala tu infraestructura y operaciones sin morir en el intento.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Scale' },
  // Marketing
  { id: 10, name: 'Facebook Ads Master', price: '$110.00', niche: 'Marketing', description: 'Campañas de publicidad pagada que realmente convierten.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Ads' },
  { id: 11, name: 'Copywriting Persuasivo', price: '$35.00', niche: 'Marketing', description: 'Palabras que venden: escribe textos irresistible.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Copy' },
  { id: 12, name: 'Email Marketing Pro', price: '$55.00', niche: 'Marketing', description: 'Marketing relacional para fidelizar a tus clientes.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Email' },
  // Automatización
  { id: 13, name: 'Zapier Mastery', price: '$80.00', niche: 'Automatización', description: 'Conecta tus aplicaciones y olvídate de las tareas manuales.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Zapier' },
  { id: 14, name: 'Make.com Advanced', price: '$130.00', niche: 'Automatización', description: 'Automatización de nivel industrial con escenarios complejos.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=Make' },
  { id: 15, name: 'CRM Automation Guide', price: '$95.00', niche: 'Automatización', description: 'Gestiona tus prospectos de forma 100% automatizada.', image: 'https://via.placeholder.com/400x300/333/00D0FF?text=CRM' },
];

const vipProducts = [
  { id: 101, name: 'Mentoría Elite 1:1', price: '$499.00', niche: 'Elite', description: 'Acceso directo y personalizado para escalar tu negocio.', image: 'https://via.placeholder.com/400x300/333/FFD700?text=Elite+Mentoria', isVip: true },
  { id: 102, name: 'Mastermind Platinum', price: '$999.00', niche: 'Elite', description: 'Networking exclusivo con los top performers.', image: 'https://via.placeholder.com/400x300/333/FFD700?text=Platinum+Mastermind', isVip: true },
  { id: 103, name: 'VIP Circle Lifetime', price: '$1999.00', niche: 'Elite', description: 'Todos los recursos de Off Basic para siempre.', image: 'https://via.placeholder.com/400x300/333/FFD700?text=VIP+Circle', isVip: true }
];

const filteredProducts = computed(() => {
  const source = isVip.value ? vipProducts : mercadoProducts;
  if (!searchQuery.value) return source;
  
  const query = searchQuery.value.toLowerCase();
  return source.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.niche.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );
});

const getWhatsappUrl = (productName) => {
  const message = `Hola, estoy interesado en el producto${isVip.value ? ' VIP' : ''}: *${productName}*. ¿Cómo puedo empezar?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};
</script>

<template>
  <section id="productos" class="products-section" :class="{ 'vip-section': isVip }">
    <div class="container">
      <h2 class="section-title" :class="{ 'premium-gradient-text': isVip }">
        {{ isVip ? 'Catálogo Exclusivo VIP' : 'Nuestros Productos' }}
      </h2>

      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-wrapper" :class="{ 'vip-search': isVip }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="search-icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            :placeholder="isVip ? 'Buscar en el círculo de élite...' : '¿Qué estás buscando hoy?'" 
            class="search-input"
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
            &times;
          </button>
        </div>
      </div>
      
      <div v-if="filteredProducts.length > 0" class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          :class="{ 'vip-card glass-panel': isVip }"
        >
          <div class="product-image-container">
            <span class="niche-badge" :class="{ 'vip-badge-small': isVip }">{{ product.niche }}</span>
            <div class="image-overlay" :class="{ 'vip-overlay': isVip }"></div>
            <div class="product-image-placeholder" :class="{ 'vip-img-placeholder': isVip }">
              <span>{{ product.name }}</span>
            </div>
          </div>
          
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-footer">
              <span class="product-price" :class="isVip ? 'vip-text-gold' : 'text-accent'">
                {{ product.price }}
              </span>
              <a 
                :href="getWhatsappUrl(product.name)" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn-primary buy-btn"
                :class="{ 'vip-btn-gold': isVip }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" class="wa-icon">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Comprar
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-results animate-fade-in">
        <p>No encontramos nada para "<span class="text-accent">{{ searchQuery }}</span>"</p>
        <button @click="searchQuery = ''" class="btn-secondary">Ver todo el catálogo</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section {
  padding: var(--section-padding);
  background-color: var(--bg-color-alt);
  transition: background-color 0.5s ease;
  min-height: 800px;
}

.vip-section {
  background: linear-gradient(to bottom, #050505, #0a0a0a);
}

.search-container {
  max-width: 600px;
  margin: 0 auto 4rem;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: all 0.3s ease;
}

.search-wrapper:focus-within {
  border-color: var(--accent-color);
  box-shadow: 0 4px 25px rgba(0, 208, 255, 0.2);
  transform: translateY(-2px);
}

.vip-search {
  background: rgba(255, 215, 0, 0.05);
  border-color: rgba(255, 215, 0, 0.2);
}

.vip-search:focus-within {
  border-color: var(--vip-gold);
  box-shadow: 0 4px 25px var(--vip-gold-glow);
}

.search-icon {
  color: var(--text-color-muted);
  margin-right: 1rem;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text-color);
  padding: 0.75rem 0;
  font-size: 1.1rem;
  outline: none;
}

.clear-btn {
  background: transparent;
  border: none;
  color: var(--text-color-muted);
  font-size: 1.5rem;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: color 0.3s;
}

.clear-btn:hover {
  color: var(--accent-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.product-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 40px var(--shadow-color);
}

.vip-card {
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.vip-card:hover {
  border-color: var(--vip-gold);
  box-shadow: 0 0 30px var(--vip-gold-glow);
}

.product-image-container {
  height: 220px;
  position: relative;
  overflow: hidden;
  background-color: var(--card-border);
}

.niche-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--accent-color);
  color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 5;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.vip-badge-small {
  background: var(--vip-gold);
}

.product-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, var(--card-bg) 0%, var(--card-border) 100%);
  color: var(--text-color);
  font-weight: 700;
  font-size: 1.2rem;
  opacity: 0.8;
  transition: all 0.5s ease;
}

.vip-img-placeholder {
  background: linear-gradient(45deg, #111 0%, #222 100%);
  color: var(--vip-gold);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
  z-index: 1;
}

.vip-overlay {
  background: linear-gradient(to bottom, transparent, rgba(255, 215, 0, 0.1));
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 1.35rem;
  margin-bottom: 0.5rem;
}

.product-desc {
  font-size: 0.95rem;
  color: var(--text-color-muted);
  flex-grow: 1;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.product-price {
  font-size: 1.6rem;
  font-weight: 800;
}

.vip-text-gold {
  color: var(--vip-gold);
}

.buy-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
}

.vip-btn-gold {
  background-color: var(--vip-gold);
  color: #000;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
}

.no-results p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: var(--accent-color);
  color: #000;
}

.wa-icon {
  width: 18px;
  height: 18px;
}
</style>
