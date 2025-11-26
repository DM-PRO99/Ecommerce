const products = [
  {
    name: "ChronoTech Eclipse Pro",
    reference: "CT-EP-001",
    price: 899,
    quantity: 15,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop"
  },
  {
    name: "Lunar Smartwatch Ultra",
    reference: "LS-UL-002",
    price: 549,
    quantity: 23,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop"
  },
  {
    name: "Vintage Classic Collection",
    reference: "VC-CC-003",
    price: 1299,
    quantity: 8,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop"
  },
  {
    name: "TechFit Sport Pro",
    reference: "TF-SP-004",
    price: 399,
    quantity: 31,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop"
  },
  {
    name: "Executive Elite Series",
    reference: "EE-ES-005",
    price: 1899,
    quantity: 5,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed5449adef?w=800&h=600&fit=crop"
  },
  {
    name: "Urban Minimalist Watch",
    reference: "UM-MW-006",
    price: 299,
    quantity: 42,
    imageUrl: "https://images.unsplash.com/photo-1522318400450-d796f7078780?w=800&h=600&fit=crop"
  }
];

async function createProducts() {
  for (const product of products) {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Producto creado: ${product.name}`);
      } else {
        const error = await response.json();
        console.log(`❌ Error al crear ${product.name}:`, error.message);
      }
    } catch (error) {
      console.log(`❌ Error de red con ${product.name}:`, error.message);
    }
  }
}

createProducts();
