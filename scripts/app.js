// Datos de ejemplo (luego vendrán de una base de datos)
const products = [

];

let cart = [];

// Mostrar productos en el HTML
function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toLocaleString('es-AR')}</p>
      <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    `;
    container.appendChild(productCard);
  });
}

// Carrusel automático (opcional)
let currentSlide = 0;
const slides = document.querySelectorAll('.slide-item');

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  document.querySelector('.carousel-slide').scrollTo({
    left: currentSlide * slides[0].offsetWidth,
    behavior: 'smooth'
  });
}

// Auto-avance cada 5 segundos
setInterval(nextSlide, 5000);

// Añadir al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartCount();
}

// Actualizar contador del carrito
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});

// Toggle menú hamburguesa
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navbar = document.querySelector('.navbar');

hamburgerBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Toggle del menú
document.querySelector('.hamburger-btn').addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace (opcional)
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.navbar').classList.remove('active');
  });
});