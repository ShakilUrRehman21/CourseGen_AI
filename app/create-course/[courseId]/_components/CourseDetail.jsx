import React from 'react';
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlineVideoCamera,
} from 'react-icons/hi2';

function CourseDetail({ course }) {
  const level = course?.level || course?.courseOutput?.level || 'Beginner';
  const duration = course?.courseOutput?.duration || '1-2 Hours';
  const noOfChapters =
    course?.courseOutput?.no_of_chapters ||
    course?.courseOutput?.chapters?.length ||
    0;
  const isVideo = course?.includeVideo || 'Yes';

  const specs = [
    {
      title: 'Skill Level',
      value: level,
      icon: <HiOutlineChartBar className="w-5 h-5 text-primary" />,
      bg: 'bg-indigo-50/80',
    },
    {
      title: 'Target Duration',
      value: duration,
      icon: <HiOutlineClock className="w-5 h-5 text-sky-600" />,
      bg: 'bg-sky-50/80',
    },
    {
      title: 'Chapters Count',
      value: `${noOfChapters} Lessons`,
      icon: <HiOutlineBookOpen className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50/80',
    },
    {
      title: 'Video Sync',
      value: isVideo === 'Yes' ? 'Active' : 'Disabled',
      icon: <HiOutlineVideoCamera className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50/80',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {specs.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-card flex items-center gap-3.5"
        >
          <div className={`p-3 rounded-xl ${item.bg} flex-none`}>
            {item.icon}
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block truncate">
              {item.title}
            </span>
            <span className="font-extrabold text-sm sm:text-base text-slate-800 block truncate mt-0.5">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseDetail;