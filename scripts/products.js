// scripts/products.js

document.addEventListener('DOMContentLoaded', function () {
  // ——— MENÚ HAMBURGUESA ———
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu  = document.querySelector('.mobile-menu');

  if (hamburgerBtn && mobileMenu) {
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

  // ——— DATOS Y RENDERIZADO DE PRODUCTOS ———
  const products = [
    { id: 1, name: "Juego de Tazas Premium", category: "bazar", price: 3500, image: "assets/imagenes/productos/producto1.jpg", description: "Set de 6 tazas de cerámica de alta calidad" },
    { id: 2, name: "Vaso Térmico Acero", category: "bazar", price: 2800, image: "assets/imagenes/productos/producto2.jpg", description: "Mantiene bebidas frías/calientes por horas" },
    { id: 3, name: "Tupper Hermético Grande", category: "plasticos", price: 1500, image: "assets/imagenes/productos/producto3.jpg", description: "Ideal para almacenar alimentos, 100% hermético" },
    { id: 4, name: "Set de Cubiertos Inox", category: "bazar", price: 4200, image: "assets/imagenes/productos/producto4.jpg", description: "Set completo para 6 personas, acero inoxidable" },
    { id: 5, name: "Cuadro Decorativo Moderno", category: "decoracion", price: 5500, image: "assets/imagenes/productos/producto5.jpg", description: "Impresión en lienzo, marco de madera natural" },
    { id: 6, name: "Set Escolar Completo", category: "escolar", price: 3200, image: "assets/imagenes/productos/producto6.jpg", description: "Incluye lápices, bolígrafos, regla y más" },
    { id: 7, name: "Caja Regalo Premium", category: "regalos", price: 850, image: "assets/imagenes/productos/producto7.jpg", description: "Elegante caja para regalos especiales" },
    { id: 8, name: "Florero de Vidrio", category: "decoracion", price: 2700, image: "assets/imagenes/productos/producto8.jpg", description: "Diseño moderno, perfecto para centros de mesa" },
    { id: 9, name: "Organizador Escritorio", category: "escolar", price: 1900, image: "assets/imagenes/productos/producto9.jpg", description: "Mantén tu espacio de trabajo ordenado" },
    { id: 10, name: "Set de Platos Porcelana", category: "bazar", price: 6800, image: "assets/imagenes/productos/producto10.jpg", description: "Elegante vajilla para ocasiones especiales" },
    { id: 11, name: "Bolsa Regalo Elegante", category: "regalos", price: 450, image: "assets/imagenes/productos/producto11.jpg", description: "Presenta tus regalos con estilo" },
    { id: 12, name: "Cucharón Silicona Chef", category: "bazar", price: 1200, image: "assets/imagenes/productos/producto12.jpg", description: "Resistente al calor, ideal para cocina" }
  ];

  const productsGrid = document.getElementById('products-grid');
  const tabs         = document.querySelectorAll('.tab');
  const priceFilter  = document.getElementById('price-filter');
  const priceValue   = document.getElementById('price-value');
  const sortSelect   = document.getElementById('sort-select');
  const cartCount    = document.getElementById('cart-count');

  let currentCategory = 'all';
  let currentMaxPrice = 10000;
  let currentSort     = 'default';
  let cart            = [];

  setupEventListeners();
  filterProducts();

  function setupEventListeners() {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        filterProducts();
      });
    });

    priceFilter.addEventListener('input', () => {
      currentMaxPrice = parseInt(priceFilter.value);
      priceValue.textContent = `$${currentMaxPrice}`;
      filterProducts();
    });

    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      filterProducts();
    });

    productsGrid.addEventListener('click', e => {
      if (e.target.classList.contains('add-to-cart')) {
        addToCart(parseInt(e.target.dataset.id));
      }
    });
  }

  function filterProducts() {
    let list = products
      .filter(p => currentCategory === 'all' || p.category === currentCategory)
      .filter(p => p.price <= currentMaxPrice);
    list = sortProducts(list);
    renderProducts(list);
  }

  function sortProducts(arr) {
    switch (currentSort) {
      case 'price-asc':  return arr.slice().sort((a,b)=>a.price-b.price);
      case 'price-desc': return arr.slice().sort((a,b)=>b.price-a.price);
      case 'name-asc':   return arr.slice().sort((a,b)=>a.name.localeCompare(b.name));
      case 'name-desc':  return arr.slice().sort((a,b)=>b.name.localeCompare(a.name));
      default:           return arr;
    }
  }

  function renderProducts(list) {
    productsGrid.innerHTML = list.length === 0
      ? `<div class="no-products"><h3>No se encontraron productos</h3><p>Cambia filtros o categoría.</p></div>`
      : list.map(p => `
        <div class="product-card">
          <div class="product-image-container">
            <img src="${p.image}" alt="${p.name}" class="product-image">
          </div>
          <div class="product-info">
            <h3 class="product-name">${p.name}</h3>
            <p class="product-category">${p.category}</p>
            <p class="product-price">$${p.price.toLocaleString('es-AR')}</p>
            <p class="product-description">${p.description}</p>
            <button class="add-to-cart" data-id="${p.id}">Agregar al carrito</button>
          </div>
        </div>
      `).join('');
  }

  function addToCart(id) {
    const prod = products.find(p=>p.id===id);
    if (!prod) return;
    cart.push(prod);
    cartCount.textContent = cart.length;
    notify(`✓ ${prod.name} añadido al carrito`);
  }

  function notify(msg) {
    const n = document.createElement('div');
    n.className = 'cart-notification';
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(()=>n.classList.add('show'),10);
    setTimeout(()=>{ n.classList.remove('show'); setTimeout(()=>n.remove(),300); }, 3000);
  }
});
