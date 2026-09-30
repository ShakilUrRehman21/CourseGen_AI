"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HiOutlineArrowLeft,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineSparkles,
} from "react-icons/hi2";

function CourseStart({ params }) {
  const [course, setCourse] = useState(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (params?.courseId) {
      GetCourse();
    }
  }, [params]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, params?.courseId));

      if (result.length > 0) {
        const courseData = result[0];
        setCourse(courseData);

        // Auto-select the first chapter if available
        const chapters = courseData?.courseOutput?.chapters;
        if (chapters && chapters.length > 0) {
          setSelectedChapterIndex(0);
          setSelectedChapter(chapters[0]);
          GetSelectedChapterContent(0, courseData?.courseId);
        }
      }
    } catch (err) {
      console.error("Error fetching course in start view:", err);
    }
  };

  const GetSelectedChapterContent = async (chapterIndex, courseId = course?.courseId) => {
    if (!courseId) return;

    try {
      setLoadingContent(true);
      const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.chapterId, chapterIndex),
            eq(Chapters.courseId, courseId)
          )
        );

      if (result.length > 0) {
        setChapterContent(result[0]);
      } else {
        setChapterContent(null);
      }
    } catch (err) {
      console.error("Error fetching chapter content:", err);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleSelectChapter = (chapter, index) => {
    setSelectedChapterIndex(index);
    setSelectedChapter(chapter);
    GetSelectedChapterContent(index);
    setMobileDrawerOpen(false);
  };

  const chapters = course?.courseOutput?.chapters || [];
  const courseTitle =
    course?.courseOutput?.course_name || course?.name || "Interactive Course";

  const handlePrev = () => {
    if (selectedChapterIndex > 0) {
      const nextIdx = selectedChapterIndex - 1;
      handleSelectChapter(chapters[nextIdx], nextIdx);
    }
  };

  const handleNext = () => {
    if (selectedChapterIndex < chapters.length - 1) {
      const nextIdx = selectedChapterIndex + 1;
      handleSelectChapter(chapters[nextIdx], nextIdx);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-16 flex-none bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href={`/course/${course?.courseId || ""}`}>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 gap-1.5 text-xs font-semibold">
              <HiOutlineArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Course Overview</span>
            </Button>
          </Link>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <h2 className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
            {courseTitle}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-primary border border-indigo-100 hidden sm:inline-block">
            Lesson {selectedChapterIndex + 1} of {chapters.length}
          </span>

          {/* Mobile drawer toggle */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="View chapters"
          >
            <HiOutlineBars3 className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Learning Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Desktop Sidebar */}
        <aside className="w-80 hidden md:flex flex-col bg-white border-r border-slate-200 flex-none h-full overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Curriculum Lessons
            </span>
            <span className="text-xs font-semibold text-slate-600">
              {chapters.length} Chapters
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => handleSelectChapter(chapter, index)}
                className="cursor-pointer"
              >
                <ChapterListCard
                  chapter={chapter}
                  index={index}
                  isSelected={selectedChapterIndex === index}
                  isCompleted={selectedChapterIndex > index}
                />
              </div>
            ))}
          </div>
        </aside>

        {/* Right Main Content Viewer */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {loadingContent ? (
            <div className="max-w-4xl mx-auto p-10 space-y-6 animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
              <div className="aspect-video bg-slate-200 rounded-2xl w-full" />
              <div className="h-32 bg-slate-200 rounded-2xl w-full" />
            </div>
          ) : (
            <ChapterContent
              chapter={selectedChapter}
              content={chapterContent}
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={selectedChapterIndex > 0}
              hasNext={selectedChapterIndex < chapters.length - 1}
            />
          )}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Course Chapters</span>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectChapter(chapter, index)}
                  className="cursor-pointer"
                >
                  <ChapterListCard
                    chapter={chapter}
                    index={index}
                    isSelected={selectedChapterIndex === index}
                    isCompleted={selectedChapterIndex > index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseStart;
