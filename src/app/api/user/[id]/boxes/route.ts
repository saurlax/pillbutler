import { NextResponse } from "next/server";

import { connectMongoDb } from "@/lib/mongodb";
import User from "@/server/models/UserModel";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    await connectMongoDb();
    const { id } = await params;

    const user = await User.findById(id);
    return NextResponse.json(user?.boxes ?? []);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
