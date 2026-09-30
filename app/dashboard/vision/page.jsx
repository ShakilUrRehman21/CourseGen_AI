import React from "react";
import {
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
} from "react-icons/hi2";

function Vision() {
  const principles = [
    {
      title: "Generative Curriculum Innovation",
      desc: "Harness state-of-the-art LLMs (Gemini 1.5) to synthesize tailored, pedagogical learning tracks in seconds rather than months.",
      icon: <HiOutlineCpuChip className="w-6 h-6 text-primary" />,
      bg: "bg-indigo-50",
    },
    {
      title: "Democratized Universal Learning",
      desc: "High quality education should be free and accessible to anyone with an internet connection, anywhere in the world.",
      icon: <HiOutlineGlobeAlt className="w-6 h-6 text-sky-600" />,
      bg: "bg-sky-50",
    },
    {
      title: "Multimedia Synchronization",
      desc: "Merge rich text, practical code sandboxes, and targeted YouTube video tutorials into a cohesive multimedia classroom.",
      icon: <HiOutlineRocketLaunch className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50",
    },
    {
      title: "Collaborative Knowledge Sharing",
      desc: "Empower creators, developers, and educators to share shareable course links and build an open library of wisdom.",
      icon: <HiOutlineUserGroup className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Vision Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-semibold">
          <HiOutlineSparkles className="w-4 h-4" />
          <span>Our Mission & Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pioneering the Future of AI-Driven Education
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We believe everyone learns differently. CourseGen AI was founded on the belief that software should adapt to individual curiosities, goals, and learning paces.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {principles.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-card hover:border-indigo-200 hover:shadow-lg transition-all space-y-3"
          >
            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
              {item.icon}
            </div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Tech Stack Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            Architecture Stack
          </span>
          <h3 className="text-xl font-bold mt-1">Built with Industry Standards</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
            Next.js 14 App Router, Google Gemini 1.5, Neon Serverless Postgres, Drizzle ORM, Clerk Authentication, and Firebase Cloud Storage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white border border-white/20">
            v1.0 Production
          </span>
        </div>
      </div>
    </div>
  );
}

export default Vision;
