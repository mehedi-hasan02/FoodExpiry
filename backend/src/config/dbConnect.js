import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q9ntuh2.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`;

let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false, // fail fast instead of silent 10s buffer wait
        serverSelectionTimeoutMS: 5000,
      })
      .then((m) => {
        console.log(`MongoDB Connected: ${m.connection.host}`);
        return m;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
