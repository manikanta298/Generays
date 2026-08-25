import Razorpay from "razorpay";
import { z } from "zod";

const requestSchema = z.object({
  amount: z.number().int().positive().max(100_000_000),
  currency: z.string().length(3).default("INR"),
  receipt: z.string().max(40).optional(),
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    res.status(503).json({ error: "Razorpay is not configured on the server." });
    return;
  }

  try {
    const parsed = requestSchema.parse(
      typeof req.body === "string" ? JSON.parse(req.body) : req.body,
    );

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: parsed.amount,
      currency: parsed.currency.toUpperCase(),
      receipt: parsed.receipt ?? `gr-${Date.now()}`,
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    res.status(400).json({ error: "Unable to create Razorpay order." });
  }
}
