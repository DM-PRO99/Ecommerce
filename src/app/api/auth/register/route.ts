import { NextResponse } from 'next/server';
import dbConnect from '@/db/connect';
import User from '@/models/User';

export async function POST(request: Request) {
  console.log('=== NEW REGISTRATION ATTEMPT ===');
  
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');
    
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { name, email, password } = body;

    if (!name || !email || !password) {
      console.error('Missing required fields');
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    console.log('Checking for existing user with email:', email);
    const existingUser = await User.findOne({ email }).lean();
    
    if (existingUser) {
      console.error('User already exists:', existingUser._id);
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    console.log('Creating new user...');
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // Will be hashed by the pre-save hook
    });

    console.log('Saving user to database...');
    const savedUser = await user.save();
    console.log('User saved successfully:', savedUser._id);
    
    // Remove password from the response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully',
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
      keyPattern: error.keyPattern,
      keyValue: error.keyValue,
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error registering user', 
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: error.code,
        keyPattern: error.keyPattern,
      },
      { status: error.code === 11000 ? 409 : 500 }
    );
  }
}
