import mongoose from 'mongoose';
const globalForMongoose = global;
let cached = globalForMongoose.mongoose || { conn: null, promise: null };
export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');
  if (!cached.promise) cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  cached.conn = await cached.promise; globalForMongoose.mongoose = cached; return cached.conn;
}
