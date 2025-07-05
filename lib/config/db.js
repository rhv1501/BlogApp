import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (cached.promise) {
    return await cached.promise;
  }

  const opts = {
    bufferCommands: false,
    maxPoolSize: process.env.NODE_ENV === "production" ? 10 : 5,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    retryWrites: true,
    w: "majority",
  };

  try {
    cached.promise = mongoose.connect(MONGODB_URI, opts);
    cached.conn = await cached.promise;

    console.log(`✅ MongoDB connected: ${cached.conn.connection.name}`);
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export const checkDBConnection = async () => {
  try {
    if (!cached.conn) {
      await connectDB();
    }

    const state = cached.conn.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    return {
      status: states[state],
      readyState: state,
      isHealthy: state === 1,
    };
  } catch (error) {
    return {
      status: "error",
      readyState: -1,
      isHealthy: false,
      error: error.message,
    };
  }
};

export default connectDB;
