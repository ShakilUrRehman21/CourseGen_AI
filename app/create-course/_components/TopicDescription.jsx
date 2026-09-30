"use client";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";
import { HiOutlineSparkles, HiOutlineDocumentText } from "react-icons/hi2";

function TopicDescription() {
  const { UserCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const sampleTopics = [
    "Full-Stack Next.js 14 Architecture",
    "Python for Data Science & AI",
    "Product Management & UX Metrics",
    "Mindfulness & Peak Performance",
    "Financial Freedom & Smart Investing",
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Course Topic & Scope
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Specify what you want to learn or teach, and customize the curriculum focus
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card space-y-6">
        {/* Topic Input */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Course Subject / Topic <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-500 mb-2">
            What is the primary theme or skill of the course?
          </p>
          <Input
            placeholder="e.g., Master Docker & Kubernetes from Scratch"
            className="h-12 text-sm sm:text-base border-slate-200 focus-visible:ring-primary rounded-xl"
            value={UserCourseInput?.topic || ""}
            onChange={(e) => handleInputChange("topic", e.target.value)}
          />

          {/* Quick topic inspiration pills */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-primary" />
              Try:
            </span>
            {sampleTopics.map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleInputChange("topic", topic)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-primary text-slate-600 transition-colors border border-slate-200/60"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Course Scope & Description */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5 flex items-center justify-between">
            <span>Additional Guidelines or Prerequisites</span>
            <span className="text-xs font-normal text-slate-400">Optional</span>
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Tell the AI any specific tools, frameworks, or subtopics you want included or emphasized.
          </p>
          <Textarea
            placeholder="e.g., Focus on real-world projects, modern ES6+ syntax, container security, and CI/CD pipelines..."
            className="min-h-[120px] text-sm border-slate-200 focus-visible:ring-primary rounded-xl resize-none leading-relaxed"
            value={UserCourseInput?.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default TopicDescription;
