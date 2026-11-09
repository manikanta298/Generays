import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { JSDOM } from "jsdom";
const dom = new JSDOM(
  '<!doctype html><html><body><div id="root"></div></body></html>',
  { url: "https://example.test" },
);
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  MutationObserver: dom.window.MutationObserver,
  FormData: dom.window.FormData,
  IS_REACT_ACT_ENVIRONMENT: true,
});
dom.window.matchMedia = (media) => ({
  media,
  matches: media === "(prefers-reduced-motion: reduce)",
  addEventListener() {},
  removeEventListener() {},
});
const { render, fireEvent, cleanup, waitFor } =
  await import("@testing-library/react");
const { MemoryRouter } = await import("react-router-dom");
const { EnquiryPopup } = await import("../src/components/EnquiryPopup.js");
const { ServiceBento } = await import("../src/components/ServiceBento.js");
const { services } = await import("../src/content/site.js");
const { default: Portfolio } = await import("../src/pages/Portfolio.js");
const originalFetch = globalThis.fetch;
// JSDOM does not implement the native dialog methods.
Object.assign(dom.window.HTMLDialogElement.prototype, {
  showModal() { this.open = true; },
  close() {
    this.open = false;
    this.dispatchEvent(new dom.window.Event("close"));
  },
});
afterEach(() => {
  cleanup();
  globalThis.fetch = originalFetch;
});
function choose(ui, option) {
  fireEvent.click(ui.getByRole("radio", { name: option }));
  fireEvent.click(ui.getByText("Continue"));
}
function fillEstimate(ui) {
  choose(ui, "Website Redesign");
  choose(ui, "₹25,000–₹49,999");
  choose(ui, "Immediately");
  for (const [label, value] of [
    ["Name", "Customer"],
    ["Business Email", "customer@example.test"],
    ["Phone Number", "+91 1234567890"],
  ]) fireEvent.change(ui.getByLabelText(label), { target: { value } });
}

test("popup validates steps, preserves data on back, and sends the complete estimate request", async () => {
  let payload;
  let calls = 0;
  globalThis.fetch = ((_url, options) => {
    calls++;
    assert.equal(_url, "/api/contact");
    payload = JSON.parse(options.body);
    return Promise.resolve(new Response(JSON.stringify({ success: true })));
  }) as typeof fetch;
  const ui = render(React.createElement(EnquiryPopup));
  const trigger = ui.getByLabelText("Open project enquiry");
  trigger.focus();
  fireEvent.click(trigger);
  assert.ok(ui.getByRole("dialog"));
  fireEvent.click(ui.getByText("Continue"));
  assert.ok(ui.getByRole("heading", { name: "What's your primary goal?" }));
  choose(ui, "Website Redesign");
  fireEvent.click(ui.getByText("Back"));
  assert.ok(ui.getByRole("radio", { name: "Website Redesign" }).checked);
  fillEstimate(ui);
  assert.equal(calls, 0);
  fireEvent.click(ui.getByText("Get My Custom Estimate"));
  await ui.findByText("Your enquiry has been sent.");
  assert.equal(calls, 1);
  assert.equal(payload.kind, "estimate");
  assert.equal(payload.goal, "Website Redesign");
  assert.equal(payload.budget, "₹25,000–₹49,999");
  assert.equal(payload.timeline, "Immediately");
  assert.equal(payload.phone, "+91 1234567890");
  assert.equal(payload.email, "customer@example.test");
  fireEvent.click(ui.getByText("Done"));
  assert.equal(ui.queryByRole("dialog"), null);
  assert.ok(
    document.activeElement === trigger,
    "Focus should return to the enquiry trigger",
  );
});

test("popup retains contact details on email failure and can retry successfully", async () => {
  let fail = true;
  globalThis.fetch = (() =>
    Promise.resolve(
      new Response(
        JSON.stringify(
          fail ? { error: "Email unavailable" } : { success: true },
        ),
        { status: fail ? 503 : 200 },
      ),
    )) as typeof fetch;
  const ui = render(React.createElement(EnquiryPopup));
  fireEvent.click(ui.getByLabelText("Open project enquiry"));
  fillEstimate(ui);
  fireEvent.click(ui.getByText("Get My Custom Estimate"));
  assert.equal((await ui.findByRole("alert")).textContent, "Email unavailable");
  assert.equal(ui.getByLabelText("Business Email").value, "customer@example.test");
  fail = false;
  fireEvent.click(ui.getByText("Get My Custom Estimate"));
  await ui.findByText("Your enquiry has been sent.");
});

test("modal traps tab focus, closes with Escape and restores scrolling", () => {
  const ui = render(React.createElement(EnquiryPopup));
  const trigger = ui.getByLabelText("Open project enquiry");
  trigger.focus();
  fireEvent.click(trigger);
  const close = ui.getByLabelText("Close dialog");
  const last = ui.getByText("Continue");
  last.focus();
  fireEvent.keyDown(document, { key: "Tab" });
  assert.ok(document.activeElement === close, "Tab should wrap to Close");
  fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
  assert.ok(
    document.activeElement === last,
    "Shift+Tab should wrap to Continue",
  );
  assert.equal(document.body.style.overflow, "hidden");
  fireEvent.keyDown(document, { key: "Escape" });
  assert.equal(ui.queryByRole("dialog"), null);
  assert.equal(document.body.style.overflow, "");
  assert.ok(
    document.activeElement === trigger,
    "Focus should return to the enquiry trigger",
  );
});

test("service filters and dialogs expose the correct details and links", async () => {
  const ui = render(
    React.createElement(
      MemoryRouter,
      null,
      React.createElement(ServiceBento, { services, filterable: true }),
    ),
  );
  const cards = () => ui.getAllByRole("button").filter((button) => button.getAttribute("aria-haspopup") === "dialog");
  assert.equal(cards().length, 12);
  assert.equal(cards().at(-1)?.textContent, "Search Engine Optimization");
  assert.equal(ui.container.querySelectorAll("img").length, 0);
  fireEvent.click(ui.getByRole("button", { name: "Design & Branding" }));
  assert.equal(cards().length, 3);
  fireEvent.click(ui.getByRole("button", { name: "All", exact: true }));
  const seo = ui.getByRole("button", { name: "Search Engine Optimization" });
  fireEvent.click(seo);
  assert.ok(ui.getByRole("dialog", { name: "Search Engine Optimization" }));
  assert.ok(ui.getByText("Technical SEO audit"));
  assert.equal(ui.getByRole("link", { name: "More" }).getAttribute("href"), "/services/search-engine-optimization");
  fireEvent.click(ui.getByRole("button", { name: "Close service details" }));
  await waitFor(() => {
    assert.equal(ui.queryByRole("dialog"), null);
    assert.equal(document.activeElement, seo);
  });
});

test("portfolio restores the industry from the URL and links filtered cards to their case studies", () => {
  const ui = render(
    React.createElement(MemoryRouter, { initialEntries: ["/portfolio?industry=Education"] }, React.createElement(Portfolio)),
  );
  assert.equal(ui.container.querySelectorAll("article").length, 2);
  assert.equal(ui.getByRole("button", { name: "Education" }).getAttribute("aria-pressed"), "true");
  assert.equal(ui.getByRole("link", { name: /ZENAIZ.*View Case Study/i }).getAttribute("href"), "/portfolio/zenaiz");
  fireEvent.click(ui.getByRole("button", { name: "All", exact: true }));
  assert.equal(ui.container.querySelectorAll("article").length, 8);
});
