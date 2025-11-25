import mongoose from 'mongoose';
import { dbConnect, checkConnection } from '@/db/connect';
import User from '@/models/User';

async function testConnection() {
  try {
    console.log('=== TESTING DATABASE CONNECTION ===');
    
    // Test connection
    const conn = await dbConnect();
    console.log('✅ Database connection successful');
    
    // Check connection status
    const isConnected = await checkConnection();
    console.log('✅ Database check:', isConnected ? 'Connected' : 'Not connected');
    
    // Try to create a test user
    console.log('\n=== TESTING USER CREATION ===');
    const testEmail = `test-${Date.now()}@test.com`;
    
    const testUser = new User({
      name: 'Test User',
      email: testEmail,
      password: 'testpassword123',
    });
    
    const savedUser = await testUser.save();
    console.log('✅ Test user created:', {
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
      createdAt: savedUser.createdAt,
    });
    
    // Verify the user exists in the database
    const foundUser = await User.findById(savedUser._id);
    console.log('✅ Found user in database:', foundUser ? 'Yes' : 'No');
    
    // List all users
    const allUsers = await User.find({}).select('-password');
    console.log('\n=== ALL USERS ===');
    console.log(JSON.stringify(allUsers, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    // Close the connection
    if (mongoose.connection) {
      await mongoose.connection.close();
      console.log('Database connection closed');
    }
    process.exit(0);
  }
}

// Run the test
testConnection().catch(console.error);
