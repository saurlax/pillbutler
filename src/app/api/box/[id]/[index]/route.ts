import { NextResponse } from "next/server";

import { normalizeBoxAlarms } from "@/lib/box";
import { connectMongoDb } from "@/lib/mongodb";
import Box from "@/server/models/BoxModel";

const ALLOWED_SLOT_FIELDS = ["pill", "alarm"] as const;

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

    const safeBody = Object.fromEntries(
      Object.entries(body).filter(([key]) =>
        ALLOWED_SLOT_FIELDS.includes(key as (typeof ALLOWED_SLOT_FIELDS)[number])
      )
    );

    if ("pill" in safeBody) {
      box.slots[slotIndex].pill = safeBody.pill as (typeof box.slots)[number]["pill"];
    }
    if ("alarm" in safeBody) {
      box.slots[slotIndex].alarm = safeBody.alarm as (typeof box.slots)[number]["alarm"];
    }
    box.sequence++;

    normalizeBoxAlarms(box);

    const saved = await box.save();
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
