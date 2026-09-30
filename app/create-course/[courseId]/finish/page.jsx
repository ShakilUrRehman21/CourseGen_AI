"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { Button } from "@/components/ui/button";
import {
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlinePlay,
  HiOutlineSquares2X2,
  HiOutlineCheck,
} from "react-icons/hi2";

function FinishLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params?.courseId && user) {
      GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList.createdBy, email)
          )
        );
      setCourse(result[0]);
    } catch (err) {
      console.error("Error fetching course for finish page:", err);
    }
  };

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/course/${course?.courseId}`;
    }
    const host = process.env.NEXT_PUBLIC_HOST_NAME || "http://localhost:3000";
    return `${host.replace(/\/$/, "")}/course/${course?.courseId}`;
  };

  const handleCopy = async () => {
    const url = getShareUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Celebration Banner Card */}
        <div className="text-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
            <HiOutlineCheckCircle className="w-10 h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Congratulations! Your Course is Ready 🎉
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            All curriculum chapters, detailed lesson content, and relevant video tutorials have been synthesized and published.
          </p>

          {/* Shareable Link Box */}
          <div className="pt-4 max-w-xl mx-auto">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-left">
              Shareable Course Link:
            </label>
            <div className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50/80">
              <input
                readOnly
                value={course ? getShareUrl() : "Generating course link..."}
                className="flex-1 bg-transparent px-2 text-xs sm:text-sm text-slate-700 font-mono outline-none truncate"
              />
              <Button
                size="sm"
                onClick={handleCopy}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg gap-1.5 shadow-sm"
              >
                {copied ? (
                  <>
                    <HiOutlineCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <HiOutlineClipboardDocumentCheck className="w-4 h-4 text-primary" />
                    <span>Copy URL</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/course/${course?.courseId}/start`} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-700 text-white font-bold rounded-xl gap-2 shadow-lg shadow-indigo-500/25 px-8">
                <HiOutlinePlay className="w-5 h-5" />
                <span>Start Learning Now</span>
              </Button>
            </Link>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 gap-2">
                <HiOutlineSquares2X2 className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Course Basic Info Preview */}
        {course && (
          <CourseBasicInfo
            course={course}
            edit={false}
            refreshData={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export default FinishLayout;