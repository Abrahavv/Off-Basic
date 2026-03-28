<script setup>
import { ref } from 'vue';
import { useCart } from '../composables/useCart';

const {
  cartItems, isCartOpen, isCheckoutOpen,
  cartCount, cartTotal,
  removeFromCart, updateQuantity, clearCart,
  closeCart, openCheckout, backToCart,
  generateWhatsAppUrl
} = useCart();

// Checkout form
const form = ref({
  name: '',
  phone: '',
  address: '',
  deliveryType: 'delivery',
  paymentMethod: 'pago_movil'
});

const formErrors = ref({});

const validateForm = () => {
  const errors = {};
  const name = form.value.name.trim();
  const phone = form.value.phone.trim();
  const address = form.value.address.trim();
  
  if (!name || name.length > 100) errors.name = true;
  if (!phone || !/^[\d\s\-+()]{7,15}$/.test(phone)) errors.phone = true;
  if (!address || address.length > 300) errors.address = true;
  
  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const submitOrder = () => {
  if (!validateForm()) return;
  const url = generateWhatsAppUrl(form.value);
  window.open(url, '_blank', 'noopener,noreferrer');
  clearCart();
  closeCart();
  form.value = { name: '', phone: '', address: '', deliveryType: 'delivery', paymentMethod: 'pago_movil' };
};

const useGPS = () => {
  if (!navigator.geolocation) {
    alert('Tu navegador no soporta geolocalización.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      form.value.address = `📍 ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
    },
    () => {
      alert('No se pudo obtener tu ubicación. Permite el acceso al GPS.');
    }
  );
};

const handleBackdropClick = (e) => {
  if (e.target.classList.contains('cart-overlay')) closeCart();
};
</script>

<template>
  <Teleport to="body">
    <Transition name="cart-fade">
      <div v-if="isCartOpen" class="cart-overlay" @click="handleBackdropClick">
        <Transition name="cart-slide">
          <div class="cart-drawer">

            <!-- ========== CART VIEW ========== -->
            <div v-if="!isCheckoutOpen" class="cart-view">
              <header class="drawer-header">
                <div>
                  <h2 class="drawer-title">Carrito de Compras</h2>
                  <p class="drawer-subtitle">{{ cartCount }} producto{{ cartCount !== 1 ? 's' : '' }} en tu carrito</p>
                </div>
                <button class="close-btn" @click="closeCart" aria-label="Cerrar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </header>

              <div class="cart-items-scroll">
                <TransitionGroup name="cart-item" tag="div">
                  <div v-for="item in cartItems" :key="item.id" class="cart-item">
                    <div class="item-image-wrap">
                      <img :src="item.image" :alt="item.name" class="item-image" loading="lazy" />
                    </div>
                    <div class="item-info">
                      <div class="item-top-row">
                        <div>
                          <h4 class="item-name">{{ item.name }}</h4>
                          <span class="item-price">${{ item.price.toFixed(2) }}</span>
                        </div>
                        <button class="delete-btn" @click="removeFromCart(item.id)" aria-label="Eliminar">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </div>
                      <div class="quantity-controls">
                        <button class="qty-btn" @click="updateQuantity(item.id, -1)">−</button>
                        <span class="qty-value">{{ item.quantity }}</span>
                        <button class="qty-btn" @click="updateQuantity(item.id, 1)">+</button>
                      </div>
                    </div>
                  </div>
                </TransitionGroup>

                <div v-if="cartItems.length === 0" class="cart-empty">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  <p>Tu carrito está vacío</p>
                </div>
              </div>

              <footer class="drawer-footer" v-if="cartItems.length > 0">
                <div class="total-row">
                  <span class="total-label">Total</span>
                  <span class="total-value">${{ cartTotal.toFixed(2) }}</span>
                </div>
                <button class="checkout-btn" @click="openCheckout">Finalizar Compra</button>
              </footer>
            </div>

            <!-- ========== CHECKOUT VIEW ========== -->
            <div v-else class="checkout-view">
              <header class="drawer-header">
                <button class="back-btn" @click="backToCart" aria-label="Volver">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                </button>
                <div class="checkout-header-text">
                  <h2 class="drawer-title">Finalizar Pedido</h2>
                  <p class="drawer-subtitle">Completa tus datos para enviar el pedido</p>
                </div>
                <button class="close-btn" @click="closeCart" aria-label="Cerrar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </header>

              <div class="checkout-form-scroll">
                <form @submit.prevent="submitOrder" class="checkout-form">
                  <div class="form-group">
                    <label class="form-label">Nombre completo</label>
                    <input
                      v-model="form.name"
                      type="text"
                      class="form-input"
                      :class="{ 'input-error': formErrors.name }"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Teléfono</label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      class="form-input"
                      :class="{ 'input-error': formErrors.phone }"
                      placeholder="04XX-XXXXXXX"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Dirección / Ubicación</label>
                    <textarea
                      v-model="form.address"
                      class="form-textarea"
                      :class="{ 'input-error': formErrors.address }"
                      rows="3"
                      placeholder="Av. Principal, Edificio..."
                    ></textarea>
                    <button type="button" class="gps-btn" @click="useGPS">
                      📍 Usar mi ubicación actual (GPS)
                    </button>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Tipo de entrega</label>
                    <div class="radio-group">
                      <label class="radio-option" :class="{ active: form.deliveryType === 'delivery' }">
                        <input type="radio" v-model="form.deliveryType" value="delivery" />
                        <span class="radio-circle"></span>
                        <span>🚚 Delivery</span>
                      </label>
                      <label class="radio-option" :class="{ active: form.deliveryType === 'shipping' }">
                        <input type="radio" v-model="form.deliveryType" value="shipping" />
                        <span class="radio-circle"></span>
                        <span>📦 Envío (correo o encomienda)</span>
                      </label>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Método de pago</label>
                    <div class="radio-group">
                      <label class="radio-option" :class="{ active: form.paymentMethod === 'pago_movil' }">
                        <input type="radio" v-model="form.paymentMethod" value="pago_movil" />
                        <span class="radio-circle"></span>
                        <span>📱 Pago Móvil (Bs)</span>
                      </label>
                      <label class="radio-option" :class="{ active: form.paymentMethod === 'zelle' }">
                        <input type="radio" v-model="form.paymentMethod" value="zelle" />
                        <span class="radio-circle"></span>
                        <span>💵 Zelle</span>
                      </label>
                      <label class="radio-option" :class="{ active: form.paymentMethod === 'binance' }">
                        <input type="radio" v-model="form.paymentMethod" value="binance" />
                        <span class="radio-circle"></span>
                        <span>🟡 Binance Pay</span>
                      </label>
                      <label class="radio-option" :class="{ active: form.paymentMethod === 'efectivo' }">
                        <input type="radio" v-model="form.paymentMethod" value="efectivo" />
                        <span class="radio-circle"></span>
                        <span>💵 Efectivo</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="submit-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                    Enviar Pedido por WhatsApp
                  </button>
                </form>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ===== OVERLAY ===== */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end; /* DRAWER ON RIGHT */
}

/* ===== DRAWER ===== */
.cart-drawer {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 100%;
  background: var(--card-bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.15); /* Shadow on the left */
  overflow: hidden;
}

/* ===== HEADER ===== */
.drawer-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--card-border);
  flex-shrink: 0;
}

.drawer-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.15rem;
  color: var(--text);
}

.drawer-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

.close-btn,
.back-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 8px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.close-btn:hover,
.back-btn:hover {
  color: var(--text);
  background: var(--card-border);
}

.checkout-header-text {
  flex: 1;
  text-align: center;
}

/* ===== CART ITEMS ===== */
.cart-items-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

.cart-items-scroll::-webkit-scrollbar {
  width: 4px;
}
.cart-items-scroll::-webkit-scrollbar-thumb {
  background: var(--card-border);
  border-radius: 4px;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg);
  border: 1px solid var(--card-border);
  border-radius: 14px;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

.cart-item:hover {
  background: var(--card-bg);
  box-shadow: 0 4px 15px var(--shadow);
}

.item-image-wrap {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  margin-bottom: 0.1rem;
  color: var(--text);
}

.item-price {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--accent);
}

.delete-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 6px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.delete-btn:hover {
  color: #ff4d6a;
  background: rgba(255, 77, 106, 0.1);
}

/* Quantity Controls */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0;
  margin-left: auto;
  width: fit-content;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--card-border);
  background: var(--bg);
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.qty-btn:hover {
  border-color: var(--accent);
  background: rgba(0, 208, 255, 0.1);
  color: var(--accent);
}

.qty-value {
  min-width: 32px;
  text-align: center;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
}

/* Empty State */
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 1rem;
  color: var(--text-muted);
  text-align: center;
  opacity: 0.7;
}

.cart-empty p {
  color: inherit;
  margin: 0;
}

/* ===== FOOTER ===== */
.drawer-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--card-border);
  flex-shrink: 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.total-label {
  font-size: 1.1rem;
  font-weight: 600;
}

.total-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent);
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background: var(--accent);
  color: var(--black);
  transition: all 0.3s;
  letter-spacing: 0.5px;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 208, 255, 0.35);
  filter: brightness(1.1);
}

/* ===== CHECKOUT FORM ===== */
.checkout-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.checkout-form-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
}

.checkout-form-scroll::-webkit-scrollbar {
  width: 4px;
}
.checkout-form-scroll::-webkit-scrollbar-thumb {
  background: var(--card-border);
  border-radius: 4px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s;
  outline: none;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--accent);
  background: rgba(0, 208, 255, 0.05);
  box-shadow: 0 0 0 3px rgba(0, 208, 255, 0.1);
}

.input-error {
  border-color: #ff4d6a !important;
  box-shadow: 0 0 0 3px rgba(255, 77, 106, 0.15) !important;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.gps-btn {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  background: var(--bg);
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.gps-btn:hover {
  background: rgba(0, 208, 255, 0.08);
  border-color: rgba(0, 208, 255, 0.3);
  color: var(--accent);
}

/* Radio Group */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.radio-option.active {
  color: var(--text);
}

.radio-option input[type="radio"] {
  display: none;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--text-muted);
  position: relative;
  flex-shrink: 0;
  transition: all 0.2s;
}

.radio-option.active .radio-circle {
  border-color: var(--accent);
}

.radio-option.active .radio-circle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: #fff;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.35);
}

/* ===== TRANSITIONS ===== */
.cart-fade-enter-active { transition: opacity 0.3s ease; }
.cart-fade-leave-active { transition: opacity 0.25s ease; }
.cart-fade-enter-from,
.cart-fade-leave-to { opacity: 0; }

.cart-slide-enter-active { transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.cart-slide-leave-active { transition: transform 0.25s cubic-bezier(0.55, 0, 1, 0.45); }
.cart-slide-enter-from { transform: translateX(100%); }
.cart-slide-leave-to { transform: translateX(100%); }

/* Cart item transitions */
.cart-item-enter-active { transition: all 0.3s ease; }
.cart-item-leave-active { transition: all 0.25s ease; }
.cart-item-enter-from { opacity: 0; transform: translateX(20px); }
.cart-item-leave-to { opacity: 0; transform: translateX(20px); }

/* ===== RESPONSIVE ===== */
@media (max-width: 480px) {
  .cart-drawer {
    max-width: 100%;
  }
  .drawer-header {
    padding: 1.25rem 1.25rem 0.75rem;
  }
  .cart-items-scroll {
    padding: 0.75rem 1.25rem;
  }
  .drawer-footer {
    padding: 1rem 1.25rem 1.25rem;
    padding-bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
  }
  .item-name {
    max-width: 140px;
  }
  .drawer-title {
    font-size: 1.15rem;
  }
  .total-value {
    font-size: 1.3rem;
  }
  .checkout-btn,
  .submit-btn {
    padding: 0.85rem;
    font-size: 0.95rem;
  }
  /* Checkout form mobile */
  .checkout-form-scroll {
    padding: 1rem 1.25rem;
  }
  .form-input,
  .form-textarea {
    padding: 0.75rem 0.85rem;
    font-size: 0.9rem;
    border-radius: 10px;
  }
  .form-label {
    font-size: 0.8rem;
  }
  .radio-option {
    font-size: 0.85rem;
    padding: 0.5rem 0;
  }
  .radio-circle {
    width: 18px;
    height: 18px;
  }
  .radio-option.active .radio-circle::after {
    width: 8px;
    height: 8px;
  }
  .gps-btn {
    font-size: 0.8rem;
    padding: 0.6rem;
  }
  .checkout-form {
    gap: 1rem;
  }
}
</style>
