// Función para cambiar la imagen principal al hacer clic en una miniatura
function changeImage(thumb, imageSrc) {
    // Quitar la clase active de todas las miniaturas
    document.querySelectorAll('.thumbnail').forEach(item => {
        item.classList.remove('active');
    });

    // Añadir la clase active a la miniatura clickeada
    thumb.classList.add('active');

    // Cambiar la imagen principal
    document.getElementById('main-image').src = imageSrc;
}

// Botón de añadir al carrito
document.querySelector('.add-to-cart-btn').addEventListener('click', function () {
    alert('Producto añadido al carrito');
    // Aquí iría la lógica para añadir al carrito
});

// Botón de comprar ahora
document.querySelector('.buy-now-btn').addEventListener('click', function () {
    alert('Redirigiendo al proceso de compra');
    // Aquí iría la redirección al proceso de compra
});