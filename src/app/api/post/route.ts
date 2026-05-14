import { NextResponse } from "next/server";

import { connectMongoDb } from "@/lib/mongodb";
import Post from "@/server/models/PostModel";

export async function GET(): Promise<Response> {
  try {
    await connectMongoDb();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
