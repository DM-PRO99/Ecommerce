const mongoose = require('mongoose');

// Product schema (simplified version)
const productSchema = new mongoose.Schema({
  name: String,
  reference: String,
  price: Number,
  quantity: Number,
  imageUrl: String,
  description: String,
  category: String,
  brand: String,
  featured: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Sample products for ecommerce
const sampleProducts = [
  {
    name: "ChronoTech Eclipse Pro",
    reference: "CT-EP-001",
    price: 899,
    quantity: 15,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    description: "Reloj inteligente premium con monitor cardíaco, GPS y resistencia al agua. Perfecto para deportistas y profesionales.",
    category: "Relojes Inteligentes",
    brand: "ChronoTech",
    featured: true
  },
  {
    name: "Lunar Smartwatch Ultra",
    reference: "LS-UL-002",
    price: 549,
    quantity: 23,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    description: "Smartwatch con pantalla AMOLED, batería de 7 días y seguimiento avanzado de salud. Diseño elegante y funcional.",
    category: "Relojes Inteligentes",
    brand: "Lunar",
    featured: true
  },
  {
    name: "Vintage Classic Collection",
    reference: "VC-CL-003",
    price: 1299,
    quantity: 8,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    description: "Reloj de lujo automático con caja de acero inoxidable y correa de cuero genuino. Pieza única para coleccionistas.",
    category: "Relojes de Lujo",
    brand: "Vintage",
    featured: true
  },
  {
    name: "SportPro Fitness Tracker",
    reference: "SP-FT-004",
    price: 199,
    quantity: 45,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
    description: "Rastreador de fitness ligero con monitor de actividad, sueño y pulsómetro. Ideal para ejercicio diario.",
    category: "Fitness Trackers",
    brand: "SportPro",
    featured: false
  },
  {
    name: "Urban Minimalist Watch",
    reference: "UM-MW-005",
    price: 349,
    quantity: 18,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed5449adef?w=800",
    description: "Reloj de diseño minimalista con cuarzo japonés y caja ultrafina. Perfecto para el estilo urbano moderno.",
    category: "Relojes Casual",
    brand: "Urban",
    featured: false
  },
  {
    name: "TechGadget Pro X",
    reference: "TG-PX-006",
    price: 799,
    quantity: 12,
    imageUrl: "https://images.unsplash.com/photo-1522318400450-d796f7078780?w=800",
    description: "Gadget tecnológico multifunción con proyector integrado, control por voz y batería de larga duración.",
    category: "Gadgets",
    brand: "TechGadget",
    featured: true
  }
];

async function createSampleProducts() {
  try {
    // Connect to MongoDB - replace with your actual MongoDB URI
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-dashboard';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing products (optional)
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully created ${insertedProducts.length} sample products:`);
    
    insertedProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name} - $${product.price} (Stock: ${product.quantity})`);
    });

    console.log('\n🎉 Sample products created successfully!');
    console.log('📱 You can now test the ecommerce flow:');
    console.log('   1. Visit http://localhost:3000/products');
    console.log('   2. Add products to cart');
    console.log('   3. Go to checkout');
    console.log('   4. Complete the purchase flow');

  } catch (error) {
    console.error('❌ Error creating sample products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the function
createSampleProducts();
