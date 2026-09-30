"use client";
import React, { useContext, useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineMagnifyingGlass, HiOutlineAcademicCap, HiOutlinePlus } from "react-icons/hi2";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { setUserCourseList } = useContext(UserCourseListContext);
  const { user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    try {
      setLoading(true);
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, email))
        .orderBy(desc(CourseList.id));

      setCourseList(result || []);
      setUserCourseList(result || []);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courseList.filter((course) => {
    const title = (course?.courseOutput?.course_name || course?.name || "").toLowerCase();
    const cat = (course?.category || "").toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || cat.includes(q);
  });

  return (
    <div className="mt-10">
      {/* Header and Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
            My Generated Courses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {courseList.length} course{courseList.length === 1 ? "" : "s"} crafted with AI
          </p>
        </div>

        {/* Search input */}
        {courseList.length > 0 && (
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Grid Content */}
      <div className="mt-6">
        {loading ? (
          /* Skeletons while loading */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4 animate-pulse"
              >
                <div className="w-full h-40 bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="pt-2 flex justify-between">
                  <div className="h-3 bg-slate-200 rounded w-1/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          /* Course Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                course={course}
                key={course.id || course.courseId}
                refreshData={getUserCourses}
              />
            ))}
          </div>
        ) : searchQuery.length > 0 ? (
          /* No search results */
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <p className="text-sm text-slate-500">
              No courses matching "{searchQuery}"
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs"
            >
              Clear Filter
            </Button>
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center mb-4">
              <HiOutlineAcademicCap className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No courses created yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6">
              Create your first interactive course with AI! Type a topic, pick your chapters, and get started in seconds.
            </p>
            <Link href="/create-course">
              <Button className="bg-primary hover:bg-primary-700 text-white font-semibold rounded-xl gap-2 shadow-md shadow-indigo-500/20">
                <HiOutlinePlus className="w-4 h-4" />
                <span>Create Your First Course</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
