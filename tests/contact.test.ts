import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../server/contact.js";

const config = {
  SMTP_HOST: "smtp.example.test",
  SMTP_USER: "test",
  SMTP_PASS: "test-only-password",
  SMTP_FROM: "site@example.test",
  CONTACT_TO: "team@example.test",
};
const brief = {
  name: " Customer ",
  email: "customer@example.test",
  message: "A new website\nwith a booking flow",
  company: "Company",
  phone: "+91 1234567890",
  service: "website-development",
  website: "https://example.test",
  timeline: "Within 1–3 months",
};
async function call({
  body = brief,
  method = "POST",
  origin = "https://generays.example.test",
  contentType = "application/json",
  settings = config,
  fail = false,
} = {}) {
  let status = 200;
  let data;
  let delivered;
  let count = 0;
  const headers = {};
  const handler = createContactHandler(
    async (message) => {
      count++;
      if (fail) throw new Error("SMTP private error");
      delivered = message;
    },
    () => settings,
  );
  const req = {
    method,
    body,
    headers: {
      host: "generays.example.test",
      origin,
      "content-type": contentType,
    },
  };
  const res = {
    setHeader(key, value) {
      headers[key] = value;
    },
    status(value) {
      status = value;
      return this;
    },
    json(value) {
      data = value;
      return this;
    },
  };
  await handler(req, res);
  return { status, data, delivered, count, headers };
}

test("the enquiry email includes all popup steps and uses only the configured recipient", async () => {
  const result = await call({
    body: { ...brief, to: "attacker@example.test" },
  });
  assert.equal(result.status, 200);
  assert.equal(result.count, 1);
  assert.equal(result.delivered.to, config.CONTACT_TO);
  assert.equal(result.delivered.replyTo, brief.email);
  for (const value of [
    brief.name.trim(),
    brief.company,
    brief.phone,
    brief.service,
    brief.website,
    brief.timeline,
    brief.message,
  ])
    assert.ok(result.delivered.text.includes(value));
  assert.deepEqual(result.data, { success: true });
  assert.equal(result.headers["Cache-Control"], "no-store");
});

test("the existing contact form remains compatible without popup-only fields", async () => {
  const result = await call({
    body: { name: "Customer", email: brief.email, message: "Hello" },
  });
  assert.equal(result.status, 200);
  assert.ok(result.delivered.text.includes("Website: Not provided"));
});

test("invalid fields and header injection never reach SMTP", async () => {
  for (const body of [
    { ...brief, name: " " },
    { ...brief, email: "invalid" },
    { ...brief, name: "Name\r\nBcc: other@example.test" },
    { ...brief, website: "javascript:alert(1)" },
    { ...brief, company: {} },
    { ...brief, message: "x".repeat(6001) },
  ]) {
    const result = await call({ body });
    assert.equal(result.status, 400);
    assert.equal(result.count, 0);
  }
});

test("wrong method, foreign origin and non-JSON requests are rejected", async () => {
  assert.equal((await call({ method: "GET" })).status, 405);
  assert.equal(
    (await call({ origin: "https://other.example.test" })).status,
    403,
  );
  assert.equal((await call({ contentType: "text/plain" })).status, 415);
});

test("missing SMTP settings and SMTP errors never report a successful delivery", async () => {
  const missing = await call({ settings: {} });
  assert.equal(missing.status, 503);
  assert.equal(missing.count, 0);
  const failure = await call({ fail: true });
  assert.equal(failure.status, 502);
  assert.equal(JSON.stringify(failure.data).includes("private"), false);
});
