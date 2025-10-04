
// Datos de ejemplo del carrito
const cartItems = [
    {
        id: 1,
        name: "Mesa Rústica de Caoba",
        price: 1000.00,
        quantity: 1,
        image: "img/mesa.jpg",
        description: "Mesa de comedor artesanal"
    },
    {
        id: 2,
        name: "Silla de Comedor",
        price: 1300.00,
        quantity: 1,
        image: "img/silla.jpg",
        description: "Silla de madera maciza"
    },
    {
        id: 3,
        name: "Estantería de Roble",
        price: 1500.00,
        quantity: 1,
        image: "img/estanteria.jpg",
        description: "Estantería estilo industrial"
    }
];

// Función para renderizar el carrito
function renderCart() {
    const cartContent = document.getElementById('cart-content');

    if (cartItems.length === 0) {
        cartContent.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>Tu carrito está vacío</h2>
                        <p>Descubre nuestros productos artesanales y añade algo especial a tu carrito.</p>
                        <a href="/html/Inicio.html" class="shop-btn">Ver Productos</a>
                    </div>
                `;
        document.getElementById('cart-count').textContent = '0';
        return;
    }

    // Calcular totales
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 200; // Envío gratis sobre $5000
    const total = subtotal + shipping;

    // Actualizar contador del carrito
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;

    // Renderizar items del carrito
    const cartItemsHTML = cartItems.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2280%22 viewBox=%220 0 100 80%22><rect width=%22100%22 height=%2280%22 fill=%22%23e8e0d5%22/><text x=%2250%22 y=%2240%22 font-family=%22Arial%22 font-size=%2212%22 text-anchor=%22middle%22 fill=%22%238b5a2b%22>Imagen</text></svg>'">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="cart-item-price">
                        <span class="item-price">Mx $${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');

    cartContent.innerHTML = `
                <div class="cart-container">
                    <div class="cart-items">
                        ${cartItemsHTML}
                    </div>
                    <div class="cart-summary">
                        <h2>Resumen del Pedido</h2>
                        <div class="summary-line">
                            <span>Subtotal (${totalItems} productos):</span>
                            <span>Mx $${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-line">
                            <span>Envío:</span>
                            <span>${shipping === 0 ? 'Gratis' : 'Mx $' + shipping.toFixed(2)}</span>
                        </div>
                        ${shipping > 0 ? `<div class="summary-line" style="font-size: 0.9rem; color: #8b5a2b;">
                            <span>¡Falta Mx $${(5000 - subtotal).toFixed(2)} para envío gratis!</span>
                        </div>` : ''}
                        <div class="summary-line summary-total">
                            <span>Total:</span>
                            <span>Mx $${total.toFixed(2)}</span>
                        </div>
                        <button class="checkout-btn" onclick="proceedToCheckout()">
                            <i class="fas fa-lock"></i> Proceder al Pago
                        </button>
                        <div class="continue-shopping">
                            <a href="/html/Inicio.html">← Continuar comprando</a>
                        </div>
                    </div>
                </div>
            `;
}

// Funciones del carrito
function updateQuantity(productId, change) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
        }
    }
}

function removeFromCart(productId) {
    const index = cartItems.findIndex(item => item.id === productId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        renderCart();
    }
}

function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Guardar carrito en localStorage para la página de checkout
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Redirigir a la página de checkout o cuenta
    window.location.href = 'checkout.html'; // o 'cuenta.html' si prefieres
}

// Función para añadir productos desde otras páginas
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1
        });
    }

    renderCart();
    alert('Producto añadido al carrito');
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    // Cargar carrito desde localStorage si existe
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems.length = 0; // Limpiar array
        cartItems.push(...JSON.parse(savedCart));
    }

    renderCart();
});