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
  FormData: dom.window.FormData,
  IS_REACT_ACT_ENVIRONMENT: true,
});
const { render, fireEvent, cleanup, waitFor } =
  await import("@testing-library/react");
const { MemoryRouter } = await import("react-router-dom");
const { EnquiryPopup } = await import("../src/components/EnquiryPopup.js");
const { ServiceBento } = await import("../src/components/ServiceBento.js");
const { services } = await import("../src/content/site.js");
const { default: Portfolio } = await import("../src/pages/Portfolio.js");
const originalFetch = globalThis.fetch;
afterEach(() => {
  cleanup();
  globalThis.fetch = originalFetch;
});
function fillContact(ui) {
  fireEvent.change(ui.getByLabelText("Your name *"), {
    target: { value: "Customer" },
  });
  fireEvent.change(ui.getByLabelText("Email *"), {
    target: { value: "customer@example.test" },
  });
  fireEvent.click(ui.getByText("Continue"));
}
function fillProject(ui) {
  fireEvent.change(ui.getByLabelText("What do you need? *"), {
    target: { value: "website-development" },
  });
  fireEvent.change(ui.getByLabelText("Tell us about your project *"), {
    target: { value: "My project brief" },
  });
  fireEvent.click(ui.getByText("Continue"));
}

test("popup validates steps, preserves data on back, and emails the reviewed payload", async () => {
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
  assert.ok(ui.getByRole("heading", { name: "Your details" }));
  fillContact(ui);
  assert.ok(ui.getByRole("heading", { name: "Your project" }));
  fireEvent.click(ui.getByText("Back"));
  assert.equal(ui.getByLabelText("Your name *").value, "Customer");
  fireEvent.click(ui.getByText("Continue"));
  fillProject(ui);
  assert.ok(ui.getByText("My project brief"));
  assert.equal(calls, 0);
  fireEvent.click(ui.getByText("Send enquiry"));
  await ui.findByText("Your enquiry has been sent.");
  assert.equal(calls, 1);
  assert.equal(payload.service, "website-development");
  assert.equal(payload.email, "customer@example.test");
  fireEvent.click(ui.getByText("Done"));
  assert.equal(ui.queryByRole("dialog"), null);
  assert.ok(
    document.activeElement === trigger,
    "Focus should return to the enquiry trigger",
  );
});

test("popup retains the brief on email failure and can retry successfully", async () => {
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
  fillContact(ui);
  fillProject(ui);
  fireEvent.click(ui.getByText("Send enquiry"));
  assert.equal((await ui.findByRole("alert")).textContent, "Email unavailable");
  assert.ok(ui.getByText("My project brief"));
  fail = false;
  fireEvent.click(ui.getByText("Send enquiry"));
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

test("service filters preserve correct links and use icons without photos", () => {
  const ui = render(
    React.createElement(
      MemoryRouter,
      null,
      React.createElement(ServiceBento, { services, filterable: true }),
    ),
  );
  assert.equal(ui.container.querySelectorAll("a").length, 11);
  assert.equal(ui.container.querySelectorAll("img").length, 0);
  fireEvent.click(ui.getByRole("button", { name: "Design & Branding" }));
  assert.equal(ui.container.querySelectorAll("a").length, 3);
  assert.equal(
    ui
      .getByRole("listitem", { name: /Explore Logo Design/ })
      .getAttribute("href"),
    "/services/logo-design",
  );
  fireEvent.click(ui.getByRole("button", { name: "All", exact: true }));
  assert.equal(ui.container.querySelectorAll("a").length, 11);
});

test("portfolio category filters retain previews and link to project detail routes", async () => {
  const ui = render(
    React.createElement(MemoryRouter, null, React.createElement(Portfolio)),
  );
  assert.equal(ui.container.querySelectorAll("article").length, 8);
  fireEvent.click(ui.getByRole("button", { name: "Education", exact: true }));
  assert.equal(ui.container.querySelectorAll("article").length, 2);
  assert.equal(
    ui.getByRole("link", { name: "ZENAIZ", exact: true }).getAttribute("href"),
    "/portfolio/zenaiz",
  );
  fireEvent.click(
    ui.getAllByRole("button", { name: "Preview", exact: true })[0],
  );
  assert.ok(ui.getByRole("dialog"));
  assert.ok(ui.getByRole("link", { name: /open ZENAIZ in a new tab/ }));
  fireEvent.keyDown(document, { key: "Escape" });
  await waitFor(() => assert.equal(ui.queryByRole("dialog"), null));
  fireEvent.click(ui.getByRole("button", { name: "All", exact: true }));
  assert.equal(ui.container.querySelectorAll("article").length, 8);
});
