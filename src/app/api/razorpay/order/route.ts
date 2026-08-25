import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";

export const runtime = "nodejs";

const requestSchema = z.object({
  amount: z.number().int().positive().max(100_000_000),
  currency: z.string().length(3).default("INR"),
  receipt: z.string().max(40).optional(),
});

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Razorpay is not configured on the server." }, { status: 503 });
  }

  try {
    const parsed = requestSchema.parse(await request.json());
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: parsed.amount,
      currency: parsed.currency.toUpperCase(),
      receipt: parsed.receipt ?? `gr-${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json({ error: "Unable to create Razorpay order." }, { status: 400 });
  }
}
