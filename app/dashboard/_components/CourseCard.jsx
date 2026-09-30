"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineBookOpen, HiEllipsisVertical, HiOutlineClock, HiOutlineSparkles } from 'react-icons/hi2';
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function CourseCard({ course, refreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    try {
      // 1. Delete associated chapters to avoid orphaned database records
      if (course?.courseId) {
        await db.delete(Chapters).where(eq(Chapters.courseId, course.courseId));
      }
      // 2. Delete the course entry
      await db.delete(CourseList).where(eq(CourseList.id, course?.id));

      if (refreshData) {
        refreshData();
      }
    } catch (err) {
      console.error("Error deleting course and chapters:", err);
      alert("Failed to delete course. Please try again.");
    }
  };

  const courseTitle =
    course?.courseOutput?.course_name || course?.name || 'Untitled Course';
  const category =
    course?.category || course?.courseOutput?.category || 'General';
  const level =
    course?.level || course?.courseOutput?.level || 'Beginner';
  const chapterCount =
    course?.courseOutput?.no_of_chapters ||
    course?.courseOutput?.chapters?.length ||
    0;
  const duration =
    course?.courseOutput?.duration || '1-2 Hours';

  const bannerSrc =
    course?.courseBanner && course?.courseBanner !== ''
      ? course.courseBanner
      : '/placeholder.jpg';

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-xl hover:border-indigo-200 transition-all overflow-hidden">
      <div>
        {/* Banner image with hover effect */}
        <Link href={`/course/${course?.courseId}`} className="block relative w-full h-44 overflow-hidden bg-slate-100">
          <Image
            src={bannerSrc}
            alt={courseTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={bannerSrc.startsWith('data:') || bannerSrc.startsWith('blob:')}
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-semibold text-slate-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{category}</span>
          </div>

          {course?.publish && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold tracking-wide uppercase shadow-sm">
              Ready
            </div>
          )}
        </Link>

        {/* Content details */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/course/${course?.courseId}`} className="flex-1">
              <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-primary transition-colors">
                {courseTitle}
              </h3>
            </Link>

            {!displayUser && (
              <div className="flex-none -mr-1">
                <DropdownOption handleOnDelete={handleOnDelete}>
                  <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                    <HiEllipsisVertical className="w-5 h-5" />
                  </button>
                </DropdownOption>
              </div>
            )}
          </div>

          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {course?.courseOutput?.description || "Structured curriculum crafted with AI."}
          </p>

          {/* Badges row */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <HiOutlineBookOpen className="w-4 h-4 text-primary" />
              <span>{chapterCount} Chapters</span>
            </span>

            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-primary font-semibold border border-indigo-100 text-[11px]">
              {level}
            </span>
          </div>
        </div>
      </div>

      {/* Creator Info footer for Explore page */}
      {displayUser && (
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2.5">
          {course?.userProfileImage ? (
            <Image
              src={course.userProfileImage}
              width={26}
              height={26}
              alt={course?.userName || "User"}
              className="rounded-full ring-1 ring-slate-200"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-primary flex items-center justify-center text-xs font-bold">
              {course?.userName?.[0] || 'U'}
            </div>
          )}
          <span className="text-xs font-medium text-slate-700 truncate">
            {course?.userName || 'Anonymous Creator'}
          </span>
        </div>
      )}
    </div>
  );
}

export default CourseCard;