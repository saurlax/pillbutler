import { NextResponse } from "next/server";

import { connectMongoDb } from "@/lib/mongodb";
import Pill from "@/server/models/PillModel";

export async function GET(): Promise<Response> {
  try {
    await connectMongoDb();
    const pills = await Pill.find();
    return NextResponse.json(pills);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
