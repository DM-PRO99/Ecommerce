import mongoose, { Mongoose, ConnectOptions, Error } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Log masked connection string (hides password)
console.log('MongoDB URI:', MONGODB_URI.replace(/:([^:]+)@/, ':*****@'));

interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: CachedMongoose | undefined;
}

interface MongoError extends Error {
  code?: number;
  codeName?: string;
}

let cached: CachedMongoose = global.mongoose || { conn: null, promise: null };

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
    };

    console.log('Creating new database connection...');
    
    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts);
      
      // Add event listeners to the connection
      mongoose.connection.on('connecting', () => {
        console.log('Connecting to MongoDB...');
      });

      mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
        console.log('Database name:', mongoose.connection.db?.databaseName);
      });

      mongoose.connection.on('error', (error: Error) => {
        console.error('MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });

      // Wait for the connection to be established
      const mongooseInstance = await cached.promise;
      console.log('MongoDB connection established');
      return mongooseInstance;
      
    } catch (error: unknown) {
      const mongoError = error as MongoError;
      console.error('MongoDB connection error:', {
        name: mongoError.name,
        message: mongoError.message,
        code: mongoError.code,
        codeName: mongoError.codeName,
      });
      throw error;
    }
  }

  try {
    console.log('Waiting for database connection...');
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: unknown) {
    const mongoError = error as MongoError;
    console.error('Failed to connect to MongoDB:', {
      name: mongoError.name,
      message: mongoError.message,
      code: mongoError.code,
    });
    cached.promise = null;
    throw error;
  }
}

// Function to check database connection status
const checkConnection = async () => {
  try {
    const conn = await dbConnect();
    if (!conn.connection.db) {
      throw new Error('Database connection established but no database instance found');
    }
    
    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

// Export the check function
// Uncomment to test connection on startup
// checkConnection().then(connected => {
//   console.log('Database connection check:', connected ? '✅ Success' : '❌ Failed');
// });

export { dbConnect, checkConnection };
export default dbConnect;
