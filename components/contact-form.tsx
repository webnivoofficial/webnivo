"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import { formServiceOptions, siteConfig } from "@/lib/site-data";

const stepList = [
  { label: "Tell us about yourself", key: "about" },
  { label: "Your business", key: "business" },
  { label: "Project needs", key: "needs" },
  { label: "Project goals", key: "details" },
  { label: "Contact method", key: "contact" },
];

type FormData = {
  name: string;
  company: string;
  email: string;
  currentWebsite: string;
  businessType: string;
  selectedServices: string[];
  businessDescription: string;
  detail: string;
  social: string;
  whatsapp: string;
  preferredContact: "WhatsApp" | "Email";
};

const initialFormData: FormData = {
  name: "",
  company: "",
  email: "",
  currentWebsite: "",
  businessType: "",
  selectedServices: [],
  businessDescription: "",
  detail: "",
  social: "",
  whatsapp: "",
  preferredContact: "WhatsApp",
};

export function ProjectInquiryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [deliveryUrl, setDeliveryUrl] = useState("");

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors([]);
  };

  const toggleService = (option: string) => {
    setFormData((current) => {
      const alreadySelected = current.selectedServices.includes(option);
      return {
        ...current,
        selectedServices: alreadySelected
          ? current.selectedServices.filter((item) => item !== option)
          : [...current.selectedServices, option],
      };
    });
    setErrors([]);
  };

  const validateStep = () => {
    const messages: string[] = [];
    if (currentStep === 0) {
      if (!formData.name.trim()) messages.push("Enter your name.");
      if (!formData.company.trim()) messages.push("Enter your business or company name.");
    }
    if (currentStep === 1) {
      if (!formData.businessType.trim()) messages.push("Tell us your business type.");
      if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) messages.push("Enter a valid email address.");
      if (formData.currentWebsite && !/^https?:\/\/\S+/i.test(formData.currentWebsite)) {
        messages.push("Enter a valid website URL, including https://.");
      }
    }
    if (currentStep === 2) {
      if (formData.selectedServices.length === 0) messages.push("Choose at least one service.");
      if (!formData.businessDescription.trim()) messages.push("Tell us a little about your business.");
    }
    if (currentStep === 3) {
      if (!formData.detail.trim()) messages.push("Tell us what you would like to achieve.");
      if (formData.social && !/^https?:\/\/\S+/i.test(formData.social)) {
        messages.push("Enter a valid social profile URL, including https://.");
      }
    }
    if (currentStep === 4 && formData.preferredContact === "WhatsApp" && !formData.whatsapp.trim()) {
      messages.push("Add a WhatsApp number or select Email.");
    }

    setErrors(messages);
    return messages.length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep((step) => Math.min(step + 1, stepList.length - 1));
  };
  const prevStep = () => {
    setErrors([]);
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;
    const inquiry = [
      `Project inquiry from ${formData.name}`,
      `Business: ${formData.company}`,
      `Business type: ${formData.businessType}`,
      `Email: ${formData.email}`,
      `WhatsApp: ${formData.whatsapp || "Not provided"}`,
      `Current website: ${formData.currentWebsite || "Not provided"}`,
      `Services: ${formData.selectedServices.join(", ")}`,
      `Business overview: ${formData.businessDescription}`,
      `Project goals: ${formData.detail}`,
      `Social profile: ${formData.social || "Not provided"}`,
    ].join("\n");

    const destination = formData.preferredContact === "WhatsApp"
      ? `${siteConfig.whatsappLink}?text=${encodeURIComponent(inquiry)}`
      : `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project inquiry — ${formData.company}`)}&body=${encodeURIComponent(inquiry)}`;
    setDeliveryUrl(destination);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" className="glass-prominent rounded-[2rem] border border-[var(--line)] p-8 shadow-[var(--shadow-soft)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
          <Check size={24} />
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">Your inquiry is ready.</h3>
        <p className="mt-3 max-w-md text-base leading-7 text-[var(--muted)]">
          {formData.preferredContact === "WhatsApp"
            ? "Open WhatsApp with your project details filled in, then send the message to complete your inquiry."
            : "Open your email app with the project details filled in, then send the email to complete your inquiry."}
        </p>
        <a
          href={deliveryUrl}
          target={formData.preferredContact === "WhatsApp" ? "_blank" : undefined}
          rel={formData.preferredContact === "WhatsApp" ? "noopener noreferrer" : undefined}
          className="brand-button mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
        >
          {formData.preferredContact === "WhatsApp" ? "Continue to WhatsApp" : "Open email draft"}
          <ArrowRight size={16} />
        </a>
      </div>
    );
  }

  return (
    <div className="glass-prominent rounded-[2rem] border border-[var(--line)] p-4 shadow-[var(--shadow-soft)] sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        {stepList.map((step, index) => (
          <div key={step.key} className="flex items-center gap-2 whitespace-nowrap">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                index === currentStep
                  ? "bg-[var(--accent-strong)] text-white"
                  : index < currentStep
                    ? "bg-[var(--surface-alt)] text-[var(--accent-strong)]"
                    : "border border-[var(--line)] bg-transparent text-[var(--muted)]"
              }`}
            >
              {index + 1}
            </div>
            <span className="hidden text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] sm:block">{step.label}</span>
          </div>
        ))}
      </div>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-[var(--surface-alt)]">
        <motion.div
          className="h-full rounded-full bg-[var(--accent)]"
          initial={false}
          animate={{ width: `${((currentStep + 1) / stepList.length) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {errors.length > 0 && (
        <ul role="alert" className="mb-5 space-y-1 rounded-2xl border border-[#b75d52]/25 bg-[#b75d52]/[0.06] px-4 py-3 text-sm text-[#a84f46]">
          {errors.map((message) => <li key={message}>{message}</li>)}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {currentStep === 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="name">Name</label>
                  <input id="name" className="field-input" value={formData.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" required />
                </div>
                <div>
                  <label className="field-label" htmlFor="company">Business or company</label>
                  <input id="company" className="field-input" value={formData.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Business name" required />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="businessType">Business type</label>
                  <input id="businessType" className="field-input" value={formData.businessType} onChange={(event) => updateField("businessType", event.target.value)} placeholder="Restaurant, retail, service business..." required />
                </div>
                <div>
                  <label className="field-label" htmlFor="email">Email</label>
                  <input id="email" className="field-input" type="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@business.com" required />
                </div>
                <div className="md:col-span-2">
                  <label className="field-label" htmlFor="currentWebsite">Current website</label>
                  <input id="currentWebsite" className="field-input" value={formData.currentWebsite} onChange={(event) => updateField("currentWebsite", event.target.value)} placeholder="https://yourwebsite.com" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="field-label">What do you need?</label>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2" role="group" aria-label="Choose project services">
                    {formServiceOptions.map((option) => {
                      const checked = formData.selectedServices.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={checked}
                          onClick={() => toggleService(option)}
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                            checked
                              ? "border-[var(--accent)] bg-[var(--surface-alt)] text-[var(--text)]"
                              : "glass-subtle border-[var(--line)] text-[var(--muted)]"
                          }`}
                        >
                          <span>{option}</span>
                          {checked ? <Check size={16} /> : null}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="businessDescription">Tell us about your business</label>
                  <textarea id="businessDescription" className="field-input min-h-[120px]" value={formData.businessDescription} onChange={(event) => updateField("businessDescription", event.target.value)} placeholder="What do you offer, who do you serve, and what is changing?" required />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="field-label" htmlFor="detail">What are your goals?</label>
                  <textarea id="detail" className="field-input min-h-[160px]" value={formData.detail} onChange={(event) => updateField("detail", event.target.value)} placeholder="Outline the challenge, desired outcome, audience, timeline, or goals for the project." required />
                </div>
                <div>
                  <label className="field-label" htmlFor="social">Instagram or social profile</label>
                  <input id="social" className="field-input" value={formData.social} onChange={(event) => updateField("social", event.target.value)} placeholder="https://instagram.com/yourbrand" />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="whatsapp">WhatsApp number</label>
                  <input id="whatsapp" className="field-input" type="tel" value={formData.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder="0301 2542026" />
                </div>
                <div>
                  <label className="field-label">Preferred contact method</label>
                  <div className="mt-2 flex gap-2">
                    {(["WhatsApp", "Email"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={formData.preferredContact === option}
                        onClick={() => updateField("preferredContact", option)}
                        className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                          formData.preferredContact === option
                            ? "border-[var(--accent)] bg-[var(--surface-alt)] text-[var(--text)]"
                            : "glass-subtle border-[var(--line)] text-[var(--muted)]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2.5 text-sm font-medium text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {currentStep < stepList.length - 1 ? (
            <button type="button" onClick={nextStep} className="brand-button inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white">
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button type="submit" className="brand-button inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white">
              Send inquiry
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
