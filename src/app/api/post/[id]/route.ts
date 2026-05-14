import { NextResponse } from "next/server";

import { connectMongoDb } from "@/lib/mongodb";
import Post from "@/server/models/PostModel";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    await connectMongoDb();
    const { id } = await params;

    const post = await Post.findOne({ _id: id });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
