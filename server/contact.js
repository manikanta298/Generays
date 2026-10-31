const limits = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  service: 160,
  message: 6000,
  website: 500,
  timeline: 120,
};

export function validateContact(body) {
  if (!body || typeof body !== "object" || Array.isArray(body))
    return { error: "Enter your name, email and project details." };
  const values = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = body[key] ?? "";
    if (typeof value !== "string" || value.trim().length > limit)
      return { error: `Check the ${key} field and try again.` };
    values[key] = value.trim();
    if (key !== "message" && /[\r\n\x00]/.test(values[key]))
      return { error: `Check the ${key} field and try again.` };
  }
  if (!values.name || !values.email || !values.message)
    return { error: "Name, email and message are required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    return { error: "Enter a valid email address." };
  if (values.website) {
    try {
      if (!["http:", "https:"].includes(new URL(values.website).protocol))
        throw new Error();
    } catch {
      return {
        error: "Enter a website URL starting with https:// or http://.",
      };
    }
  }
  return { values };
}

export function createContactHandler(deliver, getConfig = () => process.env) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }
    const config = getConfig();
    const host = req.headers?.host;
    const origin = req.headers?.origin;
    if (origin && origin !== `https://${host}` && origin !== config.APP_ORIGIN)
      return res.status(403).json({ error: "Origin not allowed" });
    if (!req.headers?.["content-type"]?.startsWith("application/json"))
      return res.status(415).json({ error: "Send the enquiry as JSON." });
    const { values, error } = validateContact(req.body);
    if (error) return res.status(400).json({ error });
    const required = [
      "SMTP_HOST",
      "SMTP_USER",
      "SMTP_PASS",
      "SMTP_FROM",
      "CONTACT_TO",
    ];
    const port = Number(config.SMTP_PORT || 587);
    if (
      required.some((key) => !config[key]) ||
      !Number.isInteger(port) ||
      port < 1 ||
      port > 65535
    )
      return res
        .status(503)
        .json({
          error: "Email is temporarily unavailable. Please try again later.",
        });
    try {
      await deliver(
        {
          from: config.SMTP_FROM,
          to: config.CONTACT_TO,
          replyTo: values.email,
          subject: `New GeneRays enquiry from ${values.name}`,
          text: [
            `Name: ${values.name}`,
            `Company: ${values.company || "Not provided"}`,
            `Email: ${values.email}`,
            `Phone / WhatsApp: ${values.phone || "Not provided"}`,
            `Service: ${values.service || "Not selected"}`,
            `Website: ${values.website || "Not provided"}`,
            `Timeline: ${values.timeline || "Not provided"}`,
            "",
            "Message:",
            values.message,
          ].join("\n"),
        },
        config,
      );
      return res.status(200).json({ success: true });
    } catch {
      return res
        .status(502)
        .json({ error: "Unable to send your enquiry. Please try again." });
    }
  };
}
