"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq, desc } from "drizzle-orm";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import {
  HiOutlineSparkles,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const PAGE_SIZE = 9;

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.publish, true))
        .orderBy(desc(CourseList.id))
        .limit(PAGE_SIZE)
        .offset(pageIndex * PAGE_SIZE);

      setCourseList(result || []);
    } catch (err) {
      console.error("Error fetching explore courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courseList.filter((course) => {
    const title = (
      course?.courseOutput?.course_name ||
      course?.name ||
      ""
    ).toLowerCase();
    const cat = (course?.category || "").toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || cat.includes(q);
  });

  return (
    <div className="space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-semibold mb-2">
            <HiOutlineSparkles className="w-3.5 h-3.5" />
            <span>Community Gallery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore AI-Generated Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse and learn from ready-to-study courses crafted by the global community.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by topic or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4 animate-pulse"
            >
              <div className="h-44 bg-slate-200 rounded-xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id || course.courseId}
              course={course}
              displayUser={true}
              refreshData={GetAllCourse}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center mx-auto mb-3">
            <HiOutlineAcademicCap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">
            No published courses found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No published courses match "${searchQuery}". Try a different keyword.`
              : "Be the first to generate and publish an interactive course!"}
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <Button
          variant="outline"
          disabled={pageIndex === 0}
          onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
          className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 gap-2 text-xs font-semibold"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </Button>

        <span className="text-xs font-semibold text-slate-500">
          Page {pageIndex + 1}
        </span>

        <Button
          variant="outline"
          disabled={courseList.length < PAGE_SIZE}
          onClick={() => setPageIndex((p) => p + 1)}
          className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 gap-2 text-xs font-semibold"
        >
          <span>Next Page</span>
          <HiOutlineArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default Explore;