"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  HiOutlineSparkles,
  HiOutlineVideoCamera,
  HiOutlineCodeBracket,
  HiOutlineShare,
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlinePlay,
} from 'react-icons/hi2';

function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-slate-50 to-white pt-12 pb-24">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-200/30 to-sky-200/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-indigo-100 text-primary shadow-sm hover:border-indigo-200 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Google Gemini 1.5 Flash Enabled</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-normal">Next-Gen Curriculum Engine</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="mt-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Create Complete Interactive Courses in{' '}
            <span className="gradient-text">Seconds with AI</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Turn any idea into a structured, production-ready curriculum. Complete with
            concept breakdowns, handpicked YouTube tutorials, and copyable code examples.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create-course" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold bg-primary hover:bg-primary-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl group transition-all">
                <span>Start Generating Free</span>
                <HiOutlineArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/dashboard/explore" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-7 text-base font-medium bg-white hover:bg-slate-50 border-slate-200 text-slate-700 rounded-xl shadow-sm">
                <HiOutlineAcademicCap className="mr-2 w-5 h-5 text-primary" />
                <span>Explore Community Courses</span>
              </Button>
            </Link>
          </div>

          {/* Micro Social Proof */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Video & Code auto-synced</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Export & share anywhere</span>
            </div>
          </div>
        </div>

        {/* Visual Product Mockup Card */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-white border border-slate-200/80 shadow-2xl p-4 sm:p-6 transition-all hover:shadow-indigo-100">
            {/* Mock Window Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-medium text-slate-400">ai-course-generator.app / course-preview</span>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full font-medium">
                Live Interactive Mode
              </span>
            </div>

            {/* Split Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Course Metadata */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-primary text-xs font-semibold">
                  <HiOutlineSparkles className="w-3.5 h-3.5" />
                  <span>Full-Stack Mastery</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Modern Next.js 14 & Tailwind Full-Stack Architecture
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Master server actions, streaming, authentication with Clerk, Postgres with Drizzle, and production deployment patterns.
                </p>

                {/* Chapter List Preview */}
                <div className="space-y-2 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                      <span className="text-sm font-medium text-slate-800">Next.js App Router Core Principles</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">15 mins • Video Sync</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs flex items-center justify-center font-bold">2</span>
                      <span className="text-sm font-medium text-slate-800">State Management & Server Actions</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">20 mins • Code Lab</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Video & Code Preview Widget */}
              <div className="md:col-span-5 bg-slate-900 rounded-xl p-4 text-white shadow-inner space-y-3">
                <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden border border-slate-700">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <HiOutlinePlay className="w-6 h-6 ml-1" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] bg-black/70 px-2 py-0.5 rounded text-slate-200">
                    YouTube Tutorial Synced
                  </span>
                </div>

                <div className="p-2.5 rounded bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800">
                  <div className="text-[11px] text-slate-500 mb-1">// app/actions/create-course.ts</div>
                  <div>export async function createCourse(data) &#123;</div>
                  <div className="pl-4 text-emerald-400">const layout = await generateLayout(data);</div>
                  <div className="pl-4 text-indigo-200">return &#123; success: true, layout &#125;;</div>
                  <div>&#125;</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Feature Process Section */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold text-primary uppercase tracking-wider">How It Works</h2>
            <p className="mt-2 text-3xl font-bold text-slate-900">From Idea to Complete Course in 3 Steps</p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-card hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-primary flex items-center justify-center text-xl font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Define Topic & Audience</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Choose any domain—from React and Python to Mindfulness and Real Estate. Set your target skill level and duration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-card hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-secondary-600 flex items-center justify-center text-xl font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI Synthesizes Curriculum</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Gemini 1.5 generates comprehensive lesson plans, conceptual explanations, and structured code snippets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-card hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Learn with Synced Media</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Relevant high-quality YouTube lectures are automatically matched to each chapter for a multimedia experience.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid Highlights */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/40 border border-slate-200/80 shadow-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-200/60 text-primary">
                <HiOutlineSparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Smart AI Curriculum</h4>
                <p className="text-xs text-slate-600 mt-1">Deep structure with tailored difficulty from Beginner to Advanced.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-200/60 text-sky-600">
                <HiOutlineVideoCamera className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Targeted Video Matches</h4>
                <p className="text-xs text-slate-600 mt-1">High-accuracy search algorithms query real tutorial videos per chapter.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-200/60 text-indigo-600">
                <HiOutlineCodeBracket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Formatted Code Blocks</h4>
                <p className="text-xs text-slate-600 mt-1">Ready-to-run code examples with syntax formatting and 1-click copy.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-200/60 text-emerald-600">
                <HiOutlineShare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Instant Sharing</h4>
                <p className="text-xs text-slate-600 mt-1">Public course URLs ready to share with students, peers, or teams.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;
