import React from "react";
import { HiOutlineClock, HiCheck } from "react-icons/hi2";

function ChapterListCard({ chapter, index, isSelected, isCompleted = false }) {
  const title =
    chapter?.chapter_name ||
    chapter?.ChapterName ||
    chapter?.name ||
    `Chapter ${index + 1}`;
  const duration = chapter?.duration || chapter?.Duration || "15 Mins";

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl transition-all flex items-start gap-3 border ${
        isSelected
          ? "bg-indigo-50/90 border-primary text-primary shadow-sm"
          : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800"
      }`}
    >
      {/* Index Badge */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-none transition-colors ${
          isSelected
            ? "bg-primary text-white"
            : isCompleted
            ? "bg-emerald-500 text-white"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {isCompleted ? <HiCheck className="w-4 h-4 stroke-[2]" /> : index + 1}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-xs sm:text-sm line-clamp-2 leading-snug">
          {title}
        </h4>
        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
          <HiOutlineClock className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}

export default ChapterListCard;