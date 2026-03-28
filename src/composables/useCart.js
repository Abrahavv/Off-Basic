import { ref, computed, watch } from 'vue';
import { WHATSAPP_NUMBER } from '../config.js';

const STORAGE_KEY = 'offbasic_cart';

// Shared singleton state
const cartItems = ref([]);
const isCartOpen = ref(false);
const isCheckoutOpen = ref(false);

// Load from localStorage on init
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) cartItems.value = JSON.parse(saved);
} catch { /* ignore corrupt data */ }

// Persist on change
watch(cartItems, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
}, { deep: true });

export function useCart() {
  const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const addToCart = (product, qty = 1) => {
    const existing = cartItems.value.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty
      });
    }
    // Auto-open cart for feedback
    isCartOpen.value = true;
  };

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(i => i.id !== id);
  };

  const updateQuantity = (id, delta) => {
    const item = cartItems.value.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) removeFromCart(id);
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const openCart = () => {
    isCartOpen.value = true;
    isCheckoutOpen.value = false;
  };

  const closeCart = () => {
    isCartOpen.value = false;
    isCheckoutOpen.value = false;
  };

  const openCheckout = () => {
    isCheckoutOpen.value = true;
  };

  const backToCart = () => {
    isCheckoutOpen.value = false;
  };

  const generateWhatsAppUrl = (form) => {
    const whatsappNumber = WHATSAPP_NUMBER;
    const itemLines = cartItems.value
      .map((i, index) => `${index + 1}. *${i.name}*\nCantidad: ${i.quantity}\nPrecio: $${i.price.toFixed(2)}\nSubtotal: $${(i.price * i.quantity).toFixed(2)}`)
      .join('\n');

    const deliveryLabel = form.deliveryType === 'delivery'
      ? 'Delivery'
      : 'Envío (correo o encomienda)';

    const paymentLabels = {
      'pago_movil': 'Pago Móvil (Bs)',
      'zelle': 'Zelle',
      'binance': 'Binance Pay',
      'efectivo': 'Efectivo'
    };
    const paymentLabel = paymentLabels[form.paymentMethod] || 'Pago Móvil (Bs)';

    const msg = [
      '*Off Basic*',
      '🛒 *NUEVA ORDEN*',
      `👤 *Cliente:* ${form.name}`,
      `📞 *Teléfono:* ${form.phone}`,
      `📍 *Ubicación:* ${form.address}`,
      `🚚 *Tipo de entrega:* ${deliveryLabel}`,
      `💳 *Método de pago:* ${paymentLabel}`,
      `🛒 *PRODUCTOS:*`,
      itemLines,
      '',
      `💰 *TOTAL: $${cartTotal.value.toFixed(2)}*`
    ].join('\n');

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return {
    cartItems,
    isCartOpen,
    isCheckoutOpen,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    openCheckout,
    backToCart,
    generateWhatsAppUrl
  };
}
