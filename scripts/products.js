// Datos de ejemplo por categoría
const productsByCategory = {
  bazar: [...],
  plasticos: [...],
  decoracion: [...],
  escolar: [...],
  regalos: [...]
};

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remover clase active de todos los tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // Añadir clase active al tab clickeado
    tab.classList.add('active');
    // Filtrar productos
    renderProducts(tab.dataset.category);
  });
});

function renderProducts(category) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';
  
  productsByCategory[category].forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button>Agregar</button>
    `;
    container.appendChild(productCard);
  });
}

// Mostrar primera categoría al cargar
renderProducts('bazar');