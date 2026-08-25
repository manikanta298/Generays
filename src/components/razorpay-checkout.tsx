
import { useEffect, useState } from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void | Promise<void>;
  modal?: { ondismiss?: () => void };
};

type RazorpayInstance = { open: () => void };
type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };

export function RazorpayCheckout() {
  useEffect(() => {
    if (window.Razorpay || document.querySelector("script[data-razorpay]")) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpay = "true";
    document.body.appendChild(script);
    return () => { /* Keep SDK loaded for route changes. */ };
  }, []);
  const [amount, setAmount] = useState("5000");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function startCheckout() {
    const numericAmount = Number(amount);
    if (!Number.isInteger(numericAmount) || numericAmount < 1) {
      setStatus("error");
      setMessage("Enter a valid amount in INR.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericAmount * 100 }),
      });

      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.error ?? "Unable to create payment order.");

      if (!window.Razorpay) throw new Error("Razorpay Checkout is still loading. Please try again.");

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "GeneRays",
        description: "GeneRays project consultation / deposit",
        order_id: order.orderId,
        theme: { color: "#283985" },
        handler: async (response) => {
          const verification = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const result = await verification.json();
          if (!verification.ok || !result.verified) {
            setStatus("error");
            setMessage(result.error ?? "Payment verification failed.");
            return;
          }
          setStatus("success");
          setMessage("Payment verified successfully. We'll follow up with the next steps.");
        },
        modal: { ondismiss: () => setStatus("idle") },
      });

      checkout.open();
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Payment could not be started.");
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-primary-soft p-7">
      <div className="flex items-start gap-3">
        <span className="icon-chip text-neon-cyan"><CreditCard className="h-5 w-5" /></span>
        <div>
          <h2 className="font-display text-lg font-bold">Optional project deposit</h2>
          <p className="mt-1 text-sm text-muted-foreground">Secure Razorpay checkout is ready for production credentials.</p>
        </div>
      </div>
      <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground" htmlFor="razorpay-amount">Amount (INR)</label>
      <div className="mt-2 flex gap-2">
        <input id="razorpay-amount" type="number" min="1" step="1" value={amount} onChange={(event) => setAmount(event.target.value)} className="min-w-0 flex-1 rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
        <button type="button" onClick={startCheckout} disabled={status === "loading"} className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : status === "success" ? <Check className="h-4 w-4" /> : null}
          {status === "success" ? "Verified" : "Pay securely"}
        </button>
      </div>
      {message ? <p className={`mt-3 text-xs ${status === "error" ? "text-destructive" : "text-primary"}`}>{message}</p> : null}
    </div>
  );
}
