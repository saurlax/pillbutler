import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var __pillbutlerMongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global.__pillbutlerMongoose ?? { conn: null, promise: null };

if (!global.__pillbutlerMongoose) {
  global.__pillbutlerMongoose = cached;
}

export async function connectMongoDb(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.DB_URI;
  if (!uri) {
    throw new Error("DB_URI is not set");
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", false);
    cached.promise = mongoose.connect(uri);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
