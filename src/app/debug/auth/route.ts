import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/connect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Test MongoDB connection
    await dbConnect();
    
    // Check if users exist
    const users = await User.find({}).limit(5);
    
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connection working',
      userCount: users.length,
      users: users.map(u => ({
        id: u._id,
        name: u.name,
        email: u.email,
        hasPassword: !!u.password
      }))
    });
  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    await dbConnect();
    
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return NextResponse.json({
        status: 'error',
        message: 'User not found',
        email: email
      });
    }
    
    // Test password comparison
    const isValid = await bcrypt.compare(password, user.password);
    
    return NextResponse.json({
      status: 'success',
      message: 'Password test completed',
      email: email,
      userExists: true,
      passwordValid: isValid,
      userName: user.name,
      hasPassword: !!user.password
    });
  } catch (error) {
    console.error('Debug auth POST error:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
