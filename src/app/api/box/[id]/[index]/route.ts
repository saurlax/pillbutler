import { NextResponse } from "next/server";

import { normalizeBoxAlarms } from "@/lib/box";
import { connectMongoDb } from "@/lib/mongodb";
import Box from "@/server/models/BoxModel";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; index: string }> }
): Promise<Response> {
  try {
    await connectMongoDb();
    const { id, index } = await params;
    const body = await request.json();

    const box = await Box.findById(id);
    if (!box) {
      return NextResponse.json(null, { status: 404 });
    }

    const slotIndex = Number(index);
    if (Number.isNaN(slotIndex) || !box.slots[slotIndex]) {
      return NextResponse.json({ error: "Invalid slot index" }, { status: 400 });
    }

    box.slots[slotIndex] = {
      ...box.slots[slotIndex],
      ...body,
    };
    box.sequence++;

    normalizeBoxAlarms(box);

    const saved = await box.save();
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
