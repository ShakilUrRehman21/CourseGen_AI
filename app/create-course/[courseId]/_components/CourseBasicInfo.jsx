"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HiOutlinePuzzlePiece,
  HiOutlinePhoto,
  HiOutlinePlay,
  HiOutlineSparkles,
} from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { storage } from "@/configs/fireBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState(course?.courseBanner || "/placeholder.jpg");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (course?.courseBanner) {
      setSelectedFile(course.courseBanner);
    }
  }, [course]);

  const onFileSelected = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      // Local preview
      setSelectedFile(URL.createObjectURL(file));

      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const storageRef = ref(storage, `ai-course-generator/${fileName}`);

      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      await db
        .update(CourseList)
        .set({ courseBanner: downloadUrl })
        .where(eq(CourseList.courseId, course?.courseId));

      if (refreshData) {
        refreshData();
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Failed to upload custom banner image.");
    } finally {
      setUploading(false);
    }
  };

  const courseTitle =
    course?.courseOutput?.course_name || course?.name || "AI Generated Course";
  const courseDescription =
    course?.courseOutput?.description ||
    "Curriculum designed and structured with artificial intelligence.";
  const category = course?.category || course?.courseOutput?.category || "General";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Course Meta & Description */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-semibold">
              <HiOutlinePuzzlePiece className="w-3.5 h-3.5" />
              <span>{category}</span>
            </span>

            {course?.publish && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200">
                Ready to Study
              </span>
            )}
          </div>

          <div className="flex items-start justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {courseTitle}
            </h2>
            {edit && (
              <div className="flex-none pt-1">
                <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {courseDescription}
          </p>

          {!edit && (
            <div className="pt-2">
              <Link href={`/course/${course?.courseId}/start`}>
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary-700 text-white font-semibold rounded-xl gap-2 shadow-lg shadow-indigo-500/25 px-8">
                  <HiOutlinePlay className="w-5 h-5" />
                  <span>Start Course Now</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Course Banner */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm group">
            <Image
              src={selectedFile || "/placeholder.jpg"}
              alt={courseTitle}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized={selectedFile?.startsWith("data:") || selectedFile?.startsWith("blob:")}
            />

            {edit && (
              <label
                htmlFor="upload-course-image"
                className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer backdrop-blur-[2px]"
              >
                <HiOutlinePhoto className="w-8 h-8 mb-1" />
                <span className="text-xs font-semibold">
                  {uploading ? "Uploading..." : "Change Course Banner"}
                </span>
              </label>
            )}
          </div>

          {edit && (
            <input
              type="file"
              id="upload-course-image"
              className="hidden"
              accept="image/*"
              onChange={onFileSelected}
              disabled={uploading}
            />
          )}
          {edit && (
            <p className="text-[11px] text-slate-400 mt-2">
              Hover to change course thumbnail (JPG, PNG)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
