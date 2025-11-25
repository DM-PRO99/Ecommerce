import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import dbConnect from '@/db/connect';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();
    
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Error fetching products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Check if reference already exists
    const existingProduct = await Product.findOne({ reference: body.reference });
    if (existingProduct) {
      return NextResponse.json(
        { message: 'A product with this reference already exists' },
        { status: 400 }
      );
    }
    
    const product = new Product(body);
    await product.save();
    
    return NextResponse.json(
      { message: 'Product created successfully', product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { message: 'Validation error', errors: messages },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error creating product' },
      { status: 500 }
    );
  }
}
