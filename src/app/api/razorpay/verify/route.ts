import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const payloadSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ error: "Razorpay is not configured on the server." }, { status: 503 });

  try {
    const payload = payloadSchema.parse(await request.json());
    const body = `${payload.razorpay_order_id}|${payload.razorpay_payment_id}`;
    const expected = createHmac("sha256", secret).update(body).digest("hex");

    const expectedBuffer = Buffer.from(expected, "utf8");
    const receivedBuffer = Buffer.from(payload.razorpay_signature, "utf8");
    const verified = expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!verified) return NextResponse.json({ verified: false, error: "Invalid payment signature." }, { status: 400 });
    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error("Razorpay verification failed:", error);
    return NextResponse.json({ verified: false, error: "Unable to verify payment." }, { status: 400 });
  }
}
