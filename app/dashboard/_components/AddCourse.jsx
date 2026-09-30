"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { HiOutlineSparkles, HiOutlinePlus } from 'react-icons/hi2';

function AddCourse() {
  const { user } = useUser();
  const { userCourseList } = useContext(UserCourseListContext);
  const courseCount = Array.isArray(userCourseList) ? userCourseList.length : 0;
  const isLimitReached = courseCount >= 5;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-primary p-6 sm:p-8 text-white shadow-card">
      {/* Background decorative glow */}
      <div className="absolute right-0 top-0 -mt-6 -mr-6 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-sm mb-3">
            <HiOutlineSparkles className="w-3.5 h-3.5" />
            <span>AI Curriculum Engine</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.firstName || user?.fullName || 'Creator'}!
          </h2>
          <p className="mt-2 text-indigo-100 text-sm max-w-xl leading-relaxed">
            Create high-quality, comprehensive courses with synchronized YouTube lessons and interactive code snippets in just a few clicks.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link href={isLimitReached ? '/dashboard/vision' : '/create-course'}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-primary hover:bg-indigo-50 font-bold shadow-lg shadow-black/10 rounded-xl px-6"
            >
              <HiOutlinePlus className="w-5 h-5 mr-1.5 text-primary" />
              <span>{isLimitReached ? 'Plan Limit Reached' : 'Create AI Course'}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;