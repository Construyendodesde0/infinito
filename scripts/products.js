document.addEventListener('DOMContentLoaded', function () {
  // Productos únicos combinados y corregidos
  const products = [
    { id: 1, name: "Juego de Tazas Premium", category: "bazar", price: 3500, image: "assets/products/tazas.jpg", description: "Set de 6 tazas de cerámica de alta calidad" },
    { id: 2, name: "Vaso Térmico Acero", category: "bazar", price: 2800, image: "assets/products/vaso-termico.jpg", description: "Mantiene bebidas frías/calientes por horas" },
    { id: 3, name: "Tupper Hermético Grande", category: "plasticos", price: 1500, image: "assets/products/tupper.jpg", description: "Ideal para almacenar alimentos, 100% hermético" },
    { id: 4, name: "Set de Cubiertos Inox", category: "bazar", price: 4200, image: "assets/products/cubiertos.jpg", description: "Set completo para 6 personas, acero inoxidable" },
    { id: 5, name: "Cuadro Decorativo Moderno", category: "decoracion", price: 5500, image: "assets/products/cuadro.jpg", description: "Impresión en lienzo, marco de madera natural" },
    { id: 6, name: "Set Escolar Completo", category: "escolar", price: 3200, image: "assets/products/lapices.jpg", description: "Incluye lápices, bolígrafos, regla y más" },
    { id: 7, name: "Caja Regalo Premium", category: "regalos", price: 850, image: "assets/products/caja-regalo.jpg", description: "Elegante caja para regalos especiales" },
    { id: 8, name: "Florero de Vidrio", category: "decoracion", price: 2700, image: "assets/products/florero.jpg", description: "Diseño moderno, perfecto para centros de mesa" },
    { id: 9, name: "Organizador Escritorio", category: "escolar", price: 1900, image: "assets/products/portalapices.jpg", description: "Mantén tu espacio de trabajo ordenado" },
    { id: 10, name: "Set de Platos Porcelana", category: "bazar", price: 6800, image: "assets/products/platos.jpg", description: "Elegante vajilla para ocasiones especiales" },
    { id: 11, name: "Bolsa Regalo Elegante", category: "regalos", price: 450, image: "assets/products/bolsa-regalo.jpg", description: "Presenta tus regalos con estilo" },
    { id: 12, name: "Cucharón Silicona Chef", category: "bazar", price: 1200, image: "assets/products/cucharon.jpg", description: "Resistente al calor, ideal para cocina" }
  ];

  // Elementos del DOM
  const productsGrid = document.getElementById('products-grid');
  const tabs = document.querySelectorAll('.tab');
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');
  const sortSelect = document.getElementById('sort-select');
  const cartCount = document.getElementById('cart-count');

  // Estado
  let currentCategory = 'all';
  let currentMaxPrice = 10000;
  let currentSort = 'default';
  let cart = [];

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
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
      }
    });
  }

  function filterProducts() {
    let filtered = [...products];
    if (currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }
    filtered = filtered.filter(p => p.price <= currentMaxPrice);
    filtered = sortProducts(filtered);
    renderProducts(filtered);
  }

  function sortProducts(list) {
    switch (currentSort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'name-asc': return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return [...list].sort((a, b) => b.name.localeCompare(a.name));
      default: return list;
    }
  }

  function renderProducts(list) {
    productsGrid.innerHTML = '';
    if (list.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-products">
          <h3>No se encontraron productos</h3>
          <p>Intenta cambiar los filtros o seleccionar otra categoría</p>
        </div>
      `;
      return;
    }

    list.forEach(p => {
      const el = document.createElement('div');
      el.className = 'product-card';
      el.innerHTML = `
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
      `;
      productsGrid.appendChild(el);
    });
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push(product);
      updateCartCount();
      showAddedToCart(product.name);
    }
  }

  function updateCartCount() {
    if (cartCount) cartCount.textContent = cart.length;
  }

  function showAddedToCart(name) {
    const notif = document.createElement('div');
    notif.className = 'cart-notification';
    notif.innerHTML = `<span>✓</span> ${name} añadido al carrito`;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => document.body.removeChild(notif), 300);
    }, 3000);
  }
});
