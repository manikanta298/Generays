import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const payloadSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    res.status(503).json({ error: "Razorpay is not configured on the server." });
    return;
  }

  try {
    const payload = payloadSchema.parse(
      typeof req.body === "string" ? JSON.parse(req.body) : req.body,
    );

    const body = `${payload.razorpay_order_id}|${payload.razorpay_payment_id}`;
    const expected = createHmac("sha256", secret).update(body).digest("hex");

    const expectedBuffer = Buffer.from(expected, "utf8");
    const receivedBuffer = Buffer.from(payload.razorpay_signature, "utf8");
    const verified =
      expectedBuffer.length === receivedBuffer.length &&
      timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!verified) {
      res.status(400).json({
        verified: false,
        error: "Invalid payment signature.",
      });
      return;
    }

    res.status(200).json({ verified: true });
  } catch (error) {
    console.error("Razorpay verification failed:", error);
    res.status(400).json({
      verified: false,
      error: "Unable to verify payment.",
    });
  }
}
