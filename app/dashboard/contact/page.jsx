"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HiOutlineEnvelope,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineSparkles,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate or post form
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-semibold">
          <HiOutlineEnvelope className="w-4 h-4" />
          <span>Support & Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Encountered a bug, have a feature suggestion, or want to discuss enterprise learning? Drop us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form Card */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto">
                <HiOutlineCheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Message Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
                Thank you for your feedback. Our team will review your note and respond as soon as possible.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs rounded-xl"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Email Address
                </label>
                <Input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  className="h-11 text-sm border-slate-200 rounded-xl focus-visible:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject or Topic
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Bug report on chapter generation / Feature request"
                  className="h-11 text-sm border-slate-200 rounded-xl focus-visible:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message Details
                </label>
                <Textarea
                  rows={5}
                  required
                  placeholder="Describe your question or issue in detail..."
                  className="text-sm border-slate-200 rounded-xl focus-visible:ring-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-700 text-white font-semibold rounded-xl h-11 shadow-md shadow-indigo-500/20"
              >
                {loading ? "Sending Message..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        {/* Support Sidebar Info Cards */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-primary flex items-center justify-center">
              <HiOutlineQuestionMarkCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Frequently Asked Questions</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Course generation typically takes 10 to 30 seconds depending on curriculum length. All generated chapters include real educational videos and code snippets.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <HiOutlineChatBubbleBottomCenterText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Community & Support</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have questions regarding database setup or API quotas? Check the repository README or reach out to our maintainers directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
