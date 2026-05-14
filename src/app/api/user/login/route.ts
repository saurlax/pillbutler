import { NextResponse } from "next/server";

import { connectMongoDb } from "@/lib/mongodb";
import User from "@/server/models/UserModel";

export async function POST(request: Request): Promise<Response> {
  try {
    await connectMongoDb();
    const body = await request.json();

    const user = await User.findOne({
      username: body.username,
      password: body.password,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
