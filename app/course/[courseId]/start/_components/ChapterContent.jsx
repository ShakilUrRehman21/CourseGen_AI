"use client";
import React, { useState } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
import {
  HiOutlineVideoCamera,
  HiOutlineClipboard,
  HiOutlineCheck,
  HiOutlineBookOpen,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";

function CodeSnippetCard({ code }) {
  const [copied, setCopied] = useState(false);

  // Clean away any leftover <precode> or </precode> tags
  const cleanCode = (code || "")
    .replace(/<precode>/gi, "")
    .replace(/<\/precode>/gi, "")
    .trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!cleanCode) return null;

  return (
    <div className="mt-4 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800">
        <span className="text-[11px] font-mono text-slate-400">Code Example</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <HiOutlineCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <HiOutlineClipboard className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs font-mono text-indigo-200 leading-relaxed">
        <pre>
          <code>{cleanCode}</code>
        </pre>
      </div>
    </div>
  );
}

function ChapterContent({
  chapter,
  content,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  const videoId = content?.videoId;
  const rawConcepts = content?.content;
  const concepts = Array.isArray(rawConcepts)
    ? rawConcepts
    : typeof rawConcepts === "object" && rawConcepts !== null
    ? [rawConcepts]
    : [];

  const chapterTitle =
    chapter?.chapter_name ||
    chapter?.ChapterName ||
    chapter?.name ||
    "Lesson Content";
  const chapterAbout = chapter?.about || chapter?.description || "";

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8">
      {/* Chapter Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-semibold mb-3">
          <HiOutlineBookOpen className="w-4 h-4" />
          <span>Active Lesson</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {chapterTitle}
        </h1>
        {chapterAbout && (
          <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-3xl">
            {chapterAbout}
          </p>
        )}
      </div>

      {/* Synchronized YouTube Video Player */}
      {videoId && videoId.trim() !== "" ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <HiOutlineVideoCamera className="w-4 h-4 text-rose-500" />
            <span>Synchronized Video Tutorial</span>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-card">
            <YouTube
              videoId={videoId}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              className="w-full h-full"
              iframeClassName="w-full h-full"
            />
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center gap-3 text-xs text-indigo-900">
          <HiOutlineBookOpen className="w-5 h-5 text-primary flex-none" />
          <span>
            This lesson is optimized for text & code study. Follow along with the explanations and code labs below.
          </span>
        </div>
      )}

      {/* Educational Concept Breakdown Cards */}
      <div className="space-y-6 pt-2">
        <h2 className="text-lg font-bold text-slate-900">
          Curriculum Concepts & Deep Dive
        </h2>

        {concepts.length > 0 ? (
          concepts.map((item, index) => {
            const code = item?.codeExample || item?.code || item?.code_example;

            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-card space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 text-primary text-xs font-bold flex items-center justify-center flex-none">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    {item?.title || `Topic ${index + 1}`}
                  </h3>
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed pl-10">
                  <ReactMarkdown>{item?.description || ""}</ReactMarkdown>
                </div>

                {code && (
                  <div className="pl-10">
                    <CodeSnippetCard code={code} />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            Detailed content for this chapter is being prepared. Select another chapter or refresh.
          </div>
        )}
      </div>

      {/* Bottom Lesson Navigation Bar */}
      <div className="pt-8 border-t border-slate-200 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          disabled={!hasPrev}
          onClick={onPrev}
          className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 gap-2 text-xs sm:text-sm font-semibold"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>Previous Chapter</span>
        </Button>

        <Button
          disabled={!hasNext}
          onClick={onNext}
          className="rounded-xl bg-primary hover:bg-primary-700 text-white gap-2 text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20"
        >
          <span>Next Chapter</span>
          <HiOutlineArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default ChapterContent;