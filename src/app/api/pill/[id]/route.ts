import { NextResponse } from "next/server";

import { connectMongoDb } from "@/lib/mongodb";
import Pill from "@/server/models/PillModel";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    await connectMongoDb();
    const { id } = await params;
    const numericId = Number(id);

    const pill = await Pill.findOne({ _id: numericId });
    return NextResponse.json(pill);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
