import { NextResponse } from "next/server";

import { normalizeBoxAlarms } from "@/lib/box";
import { connectMongoDb } from "@/lib/mongodb";
import Box from "@/server/models/BoxModel";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    await connectMongoDb();
    const { id } = await params;

    const box = await Box.findById(id);
    return NextResponse.json(box);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    await connectMongoDb();
    const { id } = await params;
    const body = await request.json();

    const box = await Box.findByIdAndUpdate(id, body, { new: true });
    if (!box) {
      return NextResponse.json(null, { status: 404 });
    }

    box.sequence++;
    normalizeBoxAlarms(box);

    const saved = await box.save();
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
