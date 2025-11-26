const mongoose = require('mongoose');
const Product = require('./src/models/Product');

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

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Conectado a MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Productos existentes eliminados');
    
    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ ${insertedProducts.length} productos creados exitosamente`);
    
    console.log('\n📋 Lista de productos:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.quantity})`);
    });
    
    await mongoose.disconnect();
    console.log('\n🎉 ¡Productos de ejemplo creados! Refresca la página para verlos.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedProducts();
