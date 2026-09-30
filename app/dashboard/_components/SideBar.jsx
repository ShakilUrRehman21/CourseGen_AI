"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineLightBulb,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlinePlusCircle,
} from 'react-icons/hi2';
import { Progress } from '@/components/ui/progress';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';

function SideBar({ onClose }) {
  const { userCourseList } = useContext(UserCourseListContext);
  const pathname = usePathname();

  const menu = [
    {
      id: 1,
      name: 'Home',
      icon: <HiOutlineHome className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Explore Courses',
      icon: <HiOutlineSquares2X2 className="w-5 h-5" />,
      path: '/dashboard/explore',
    },
    {
      id: 3,
      name: 'Vision & Mission',
      icon: <HiOutlineLightBulb className="w-5 h-5" />,
      path: '/dashboard/vision',
    },
    {
      id: 4,
      name: 'Support & Contact',
      icon: <HiOutlinePhone className="w-5 h-5" />,
      path: '/dashboard/contact',
    },
  ];

  const courseCount = Array.isArray(userCourseList) ? userCourseList.length : 0;
  const progressPercent = Math.min((courseCount / 5) * 100, 100);

  return (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-200 p-5 select-none">
      <div>
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-2.5 px-2 py-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <HiOutlineSparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900">
              CourseGen <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-primary">AI</span>
            </span>
          </div>
        </Link>

        {/* Quick Action Button */}
        <div className="mt-6 mb-4">
          <Link href="/create-course" onClick={() => onClose && onClose()}>
            <Button className="w-full bg-primary hover:bg-primary-700 text-white font-medium shadow-md shadow-indigo-500/20 gap-2 rounded-xl">
              <HiOutlinePlusCircle className="w-5 h-5" />
              <span>Create Course</span>
            </Button>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="space-y-1.5 mt-4">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => onClose && onClose()}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50/80 text-primary font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className={`${isActive ? 'text-primary' : 'text-slate-400'}`}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Usage & Plan Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-white border border-indigo-100/80 shadow-sm mt-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
          <span>Free Plan Usage</span>
          <span className="text-primary font-bold">{courseCount} / 5</span>
        </div>
        <Progress value={progressPercent} className="h-2 bg-slate-200 [&>div]:bg-primary" />
        <p className="text-[11px] text-slate-500 mt-2.5 leading-relaxed">
          {courseCount >= 5
            ? 'Course limit reached on free plan.'
            : `${5 - courseCount} free course generation${5 - courseCount === 1 ? '' : 's'} remaining.`}
        </p>
      </div>
    </div>
  );
}

export default SideBar;
