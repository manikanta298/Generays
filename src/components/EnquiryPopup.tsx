import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, ClipboardList } from "lucide-react";
import { services } from "@/content/site";
import { Modal } from "./Modal";

const steps = ["Your details", "Your project", "Review & send"];
const initialValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  website: "",
  timeline: "",
  message: "",
};
type Values = typeof initialValues;

export function EnquiryForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(initialValues);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const request = useRef<AbortController | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const busy = useRef(false);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    heading.current?.focus();
  }, [step, sent]);

  function update(key: keyof Values, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !event.currentTarget.reportValidity()) return;
    setError("");
    if (step === 0 && !values.name.trim()) {
      setError("Enter your name.");
      return;
    }
    if (step === 1 && !values.message.trim()) {
      setError("Tell us about your project.");
      return;
    }
    if (step < 2) {
      setStep((current) => current + 1);
      return;
    }
    busy.current = true;
    setSending(true);
    const controller = new AbortController();
    request.current = controller;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          result.error || "Unable to send your enquiry. Please try again.",
        );
      setSent(true);
    } catch (cause) {
      if (!controller.signal.aborted)
        setError(
          cause instanceof Error
            ? cause.message
            : "Unable to send your enquiry. Please try again.",
        );
    } finally {
      busy.current = false;
      if (!controller.signal.aborted) setSending(false);
    }
  }
  const serviceLabel =
    services.find((service) => service.slug === values.service)?.title ??
    "Not sure yet — advise me";

  if (sent)
    return (
      <div className="enquiry-success" role="status">
        <Check size={36} aria-hidden="true" />
        <h3 ref={heading} tabIndex={-1}>
          Your enquiry has been sent.
        </h3>
        <p>
          Thank you, {values.name}. We’ll review your project and reply to{" "}
          {values.email} with next steps.
        </p>
        <button className="brand-button" type="button" onClick={onClose}>
          Done
        </button>
      </div>
    );

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <ol className="enquiry-steps" aria-label="Enquiry progress">
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={step === index ? "step" : undefined}
            data-complete={index < step}
          >
            <span>
              {index < step ? (
                <Check size={14} aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            {label}
          </li>
        ))}
      </ol>
      <h3 ref={heading} tabIndex={-1}>
        {steps[step]}
      </h3>
      <p className="enquiry-intro">
        {step === 0
          ? "Tell us how to reach you. Fields marked * are required."
          : step === 1
            ? "A few details help us understand what you need."
            : "Check your details before sending them to the GeneRays team."}
      </p>
      {step === 0 && (
        <div className="enquiry-fields">
          <label>
            Your name *
            <input
              data-autofocus
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </label>
          <label>
            Email *
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </label>
          <label>
            Phone / WhatsApp
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              value={values.phone}
              onChange={(event) => update("phone", event.target.value)}
            />
          </label>
          <label>
            Company
            <input
              name="company"
              autoComplete="organization"
              maxLength={160}
              value={values.company}
              onChange={(event) => update("company", event.target.value)}
            />
          </label>
        </div>
      )}
      {step === 1 && (
        <div className="enquiry-fields">
          <label className="enquiry-full">
            What do you need? *
            <select
              name="service"
              required
              value={values.service}
              onChange={(event) => update("service", event.target.value)}
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option value={service.slug} key={service.slug}>
                  {service.title}
                </option>
              ))}
              <option value="not-sure">Not sure yet — advise me</option>
            </select>
          </label>
          <label>
            Website (optional)
            <input
              name="website"
              type="url"
              placeholder="https://yourwebsite.com"
              maxLength={500}
              value={values.website}
              onChange={(event) => update("website", event.target.value)}
            />
          </label>
          <label>
            Preferred timeline
            <select
              name="timeline"
              value={values.timeline}
              onChange={(event) => update("timeline", event.target.value)}
            >
              <option value="">Choose a timeline (optional)</option>
              <option>As soon as possible</option>
              <option>Within 1–3 months</option>
              <option>Within 3–6 months</option>
              <option>Just exploring</option>
            </select>
          </label>
          <label className="enquiry-full">
            Tell us about your project *
            <textarea
              name="message"
              required
              rows={4}
              maxLength={6000}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              placeholder="Your goals, audience and current challenges"
            />
          </label>
        </div>
      )}
      {step === 2 && (
        <dl className="enquiry-review">
          {[
            ["Name", values.name],
            ["Email", values.email],
            ["Phone", values.phone],
            ["Company", values.company],
            ["Service", serviceLabel],
            ["Website", values.website],
            ["Timeline", values.timeline],
            ["Project brief", values.message],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value || "Not provided"}</dd>
            </div>
          ))}
        </dl>
      )}
      {error && (
        <p role="alert" className="enquiry-error">
          {error}
        </p>
      )}
      <div className="enquiry-actions">
        {step > 0 && (
          <button
            type="button"
            className="brand-button brand-button--secondary"
            disabled={sending}
            onClick={() => {
              setError("");
              setStep((current) => current - 1);
            }}
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </button>
        )}
        <button className="brand-button" type="submit" disabled={sending}>
          {step < 2 ? "Continue" : sending ? "Sending…" : "Send enquiry"}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
      <p className="enquiry-privacy">
        Your details will be emailed to GeneRays to respond to this enquiry.
      </p>
    </form>
  );
}

export function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="enquiry-side-trigger"
        type="button"
        aria-label="Open project enquiry"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <ClipboardList size={21} aria-hidden="true" />
        <span>Get an estimate</span>
      </button>
      {open && (
        <Modal
          title="Let’s discuss your project"
          onClose={() => setOpen(false)}
        >
          <EnquiryForm onClose={() => setOpen(false)} />
        </Modal>
      )}
    </>
  );
}
