import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, ClipboardList } from "lucide-react";
import { Modal } from "./Modal";

const questions = [
  {
    key: "goal",
    title: "What's your primary goal?",
    options: ["Website Redesign", "Brand Identity", "Performance Marketing", "SEO Scaling", "Other"],
  },
  {
    key: "budget",
    title: "What's your expected budget?",
    options: ["₹10,000–₹24,999", "₹25,000–₹49,999", "₹50,000–₹99,999", "₹1,00,000–₹1,49,999", "₹1,50,000+"],
  },
  {
    key: "timeline",
    title: "How soon do you want to start?",
    options: ["Immediately", "In one to two months", "In three months or later", "Just exploring"],
  },
] as const;

const steps = ["Goal", "Budget", "Timing", "Contact"];
const initialValues = { goal: "", budget: "", timeline: "", name: "", email: "", phone: "" };
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
    if (step < questions.length) {
      setStep((current) => current + 1);
      return;
    }
    if (!values.name.trim() || !values.phone.trim()) {
      setError("Enter your name and phone number.");
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
        body: JSON.stringify({ kind: "estimate", ...values }),
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
  const question = questions[step];

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
        {question?.title ?? "Where should we send your estimate?"}
      </h3>
      {question ? (
        <fieldset className="enquiry-options" aria-label={question.title} key={question.key}>
          {question.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={question.key}
                value={option}
                checked={values[question.key] === option}
                onChange={() => update(question.key, option)}
                required
              />
              {option}
            </label>
          ))}
        </fieldset>
      ) : (
        <div className="enquiry-fields">
          <label>
            Name
            <input name="name" autoComplete="name" required maxLength={120}
              value={values.name} onChange={(event) => update("name", event.target.value)} />
          </label>
          <label>
            Business Email
            <input name="email" type="email" autoComplete="email" required maxLength={254}
              value={values.email} onChange={(event) => update("email", event.target.value)} />
          </label>
          <label>
            Phone Number
            <input name="phone" type="tel" autoComplete="tel" required maxLength={40}
              value={values.phone} onChange={(event) => update("phone", event.target.value)} />
          </label>
        </div>
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
          {question ? "Continue" : sending ? "Sending…" : "Get My Custom Estimate"}
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
