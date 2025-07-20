// scripts/app.js

// Datos de productos para la página principal
const products = [
  // Tus productos aquí...
];

let cart = [];

// Variables globales para el carrusel
let currentSlide = 0;
let autoSlideInterval;

// Función para mostrar productos en la página principal
function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;
  
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

// Función para configurar el carrusel
function setupCarousel() {
  const carouselSlide = document.querySelector('.carousel-slide');
  const slides = document.querySelectorAll('.slide-item');
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  
  if (!carouselSlide || !slides.length) return;
  
  carouselSlide.style.overflow = 'hidden';
  carouselSlide.style.display = 'flex';
  carouselSlide.style.transition = 'transform 0.5s ease';
  
  slides.forEach(slide => {
    slide.style.flex = '0 0 100%';
    slide.style.minWidth = '100%';
  });
  
  if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', () => {
      currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
      updateCarousel();
      resetAutoSlide();
    });
    
    nextArrow.addEventListener('click', () => {
      currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
      updateCarousel();
      resetAutoSlide();
    });
  }
  
  if (window.innerWidth > 768) {
    resetAutoSlide();
  }
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      resetAutoSlide();
    } else {
      clearInterval(autoSlideInterval);
      carouselSlide.style.transform = 'none';
    }
  });
}

// Función para actualizar el carrusel
function updateCarousel() {
  const carouselSlide = document.querySelector('.carousel-slide');
  if (!carouselSlide) return;
  
  carouselSlide.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Función para auto-avance
function nextSlide() {
  const slides = document.querySelectorAll('.slide-item');
  if (!slides.length) return;
  
  currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
  updateCarousel();
}

// Función para reiniciar auto-avance
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000);
}

// Función para agregar al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCartCount();
  }
}

// Función para actualizar contador del carrito
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.length;
}

// Menú hamburguesa
function setupMobileMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!hamburgerBtn || !mobileMenu) return;
  
  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburgerBtn.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
  });
  
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburgerBtn.textContent = '☰';
    });
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.remove('active');
      hamburgerBtn.textContent = '☰';
    }
  });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupCarousel();
  setupMobileMenu();
  updateCartCount();
  
  if (window.innerWidth <= 768) {
    const carouselSlide = document.querySelector('.carousel-slide');
    if (carouselSlide) {
      carouselSlide.style.overflowX = 'auto';
      carouselSlide.style.scrollSnapType = 'x mandatory';
    }
    
    document.querySelectorAll('.slide-item').forEach(slide => {
      slide.style.scrollSnapAlign = 'start';
    });
  }
});
