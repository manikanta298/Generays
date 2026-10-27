import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://example.com",
});
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  FormData: dom.window.FormData,
  IS_REACT_ACT_ENVIRONMENT: true,
});
const { MemoryRouter } = await import("react-router-dom");
const { render, fireEvent, cleanup } = await import("@testing-library/react");
const { default: ContactForm } =
  await import("../src/components/contact-form.js");
const originalFetch = globalThis.fetch;
afterEach(() => {
  cleanup();
  globalThis.fetch = originalFetch;
});

test("a service consultation carries the selected service through to the enquiry API", async () => {
  let payload: unknown;
  globalThis.fetch = ((_url, options) => {
    assert.equal(String(_url), "/api/contact");
    payload = JSON.parse(String(options?.body));
    return Promise.resolve(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
  }) as typeof fetch;
  const ui = render(
    React.createElement(
      MemoryRouter,
      { initialEntries: ["/contact?service=website-development"] },
      React.createElement(ContactForm),
    ),
  );
  assert.equal(
    (ui.getByLabelText("What do you need?") as HTMLSelectElement).value,
    "website-development",
  );
  fireEvent.change(ui.getByLabelText("Your name *"), {
    target: { value: " Customer " },
  });
  fireEvent.change(ui.getByLabelText("Email *"), {
    target: { value: "customer@example.com" },
  });
  fireEvent.change(ui.getByLabelText("Tell us about your business *"), {
    target: { value: "A new business website" },
  });
  fireEvent.click(ui.getByText("Build My Brand"));
  await ui.findByRole("status");
  assert.deepEqual(payload, {
    name: "Customer",
    company: "",
    email: "customer@example.com",
    phone: "",
    service: "website-development",
    message: "A new business website",
  });
});

test("an unknown service is not preselected and failed submissions retain the enquiry", async () => {
  globalThis.fetch = (() =>
    Promise.resolve(
      new Response(JSON.stringify({ error: "Please try again later" }), {
        status: 503,
      }),
    )) as typeof fetch;
  const ui = render(
    React.createElement(
      MemoryRouter,
      { initialEntries: ["/contact?service=unknown"] },
      React.createElement(ContactForm),
    ),
  );
  assert.equal(
    (ui.getByLabelText("What do you need?") as HTMLSelectElement).value,
    "",
  );
  fireEvent.change(ui.getByLabelText("Your name *"), {
    target: { value: "Customer" },
  });
  fireEvent.change(ui.getByLabelText("Email *"), {
    target: { value: "customer@example.com" },
  });
  fireEvent.change(ui.getByLabelText("Tell us about your business *"), {
    target: { value: "Keep my project brief" },
  });
  fireEvent.click(ui.getByText("Build My Brand"));
  assert.equal(
    (await ui.findByRole("alert")).textContent,
    "Please try again later",
  );
  assert.equal(
    (ui.getByLabelText("Tell us about your business *") as HTMLTextAreaElement)
      .value,
    "Keep my project brief",
  );
});
