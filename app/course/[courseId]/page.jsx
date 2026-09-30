"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineArrowLeft, HiOutlinePlay } from "react-icons/hi2";

function Course({ params }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.courseId) {
      GetCourse();
    }
  }, [params]);

  const GetCourse = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, params?.courseId));

      if (result.length > 0) {
        setCourse(result[0]);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 gap-1.5 text-xs font-semibold">
                <HiOutlineArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>

            {course && (
              <Link href={`/course/${course?.courseId}/start`}>
                <Button className="bg-primary hover:bg-primary-700 text-white font-semibold rounded-xl gap-2 shadow-md shadow-indigo-500/20 text-xs sm:text-sm">
                  <HiOutlinePlay className="w-4 h-4" />
                  <span>Start Course</span>
                </Button>
              </Link>
            )}
          </div>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-64 bg-slate-200 rounded-2xl w-full" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-slate-200 rounded-xl" />
                ))}
              </div>
              <div className="h-48 bg-slate-200 rounded-2xl w-full" />
            </div>
          ) : course ? (
            <>
              {/* Basic Info */}
              <CourseBasicInfo course={course} edit={false} refreshData={() => {}} />

              {/* Course Detail Specifications */}
              <CourseDetail course={course} />

              {/* List of Curriculum Lessons */}
              <ChapterList course={course} />
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800">Course Not Found</h2>
              <p className="text-sm text-slate-500 mt-2">
                The requested course could not be located or may have been removed.
              </p>
              <Link href="/dashboard" className="inline-block mt-6">
                <Button className="rounded-xl">Go to Dashboard</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Course;