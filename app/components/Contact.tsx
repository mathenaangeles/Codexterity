"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  company: string;
  service: "" | "automation" | "web" | "software" | "integration";
  message: string;
};

type Status = "" | "sending" | "success" | "error";

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<Status>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      window.setTimeout(() => setStatus(""), 3000);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData(initialFormData);
        window.setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
        window.setTimeout(() => setStatus(""), 3000);
      }
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              Let&apos;s Build Something Amazing
            </h2>

            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Ready to transform your business? Get in touch and we&apos;ll respond within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 7l10 7 10-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Email</div>
                  <div className="text-white text-lg">hello@codexterity.ai</div>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Phone</div>
                  <div className="text-white text-lg">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Location</div>
                  <div className="text-white text-lg">Global - Remote First</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/[0.05] to-transparent p-10 rounded-3xl border border-white/10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-3">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-3">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="john@company.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-3">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="Your Company"
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-3">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        service: e.target.value as FormData["service"],
                      }))
                    }
                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-gray-900">
                      Select a service
                    </option>
                    <option value="automation" className="bg-gray-900">
                      Workflow Automation
                    </option>
                    <option value="web" className="bg-gray-900">
                      Web Development
                    </option>
                    <option value="software" className="bg-gray-900">
                      Custom Software
                    </option>
                    <option value="integration" className="bg-gray-900">
                      System Integration
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-3">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  rows={6}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center">
                  Thank you! We&apos;ll get back to you within 24 hours.
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center">
                  Please fill in all required fields.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
