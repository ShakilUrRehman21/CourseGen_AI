import React from 'react';
import { HiOutlineClock, HiOutlineDocumentText } from 'react-icons/hi2';

function ChapterList({ course }) {
  const chapters = course?.courseOutput?.chapters;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 sm:p-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
            Curriculum Lessons & Outlines
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step learning modules mapped to this subject
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          {Array.isArray(chapters) ? `${chapters.length} Chapters` : '0 Chapters'}
        </span>
      </div>

      <div className="space-y-3">
        {Array.isArray(chapters) && chapters.length > 0 ? (
          chapters.map((chapter, index) => {
            const title =
              chapter?.chapter_name ||
              chapter?.ChapterName ||
              chapter?.name ||
              `Chapter ${index + 1}`;
            const duration =
              chapter?.duration || chapter?.Duration || '15 Mins';
            const about =
              chapter?.about || chapter?.description || '';

            return (
              <div
                key={index}
                className="group p-4 sm:p-5 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Circle */}
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-primary flex items-center justify-center font-bold text-sm flex-none group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                    {index + 1}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-primary transition-colors">
                      {title}
                    </h4>
                    {about && (
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-2xl">
                        {about}
                      </p>
                    )}
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="flex-none self-end sm:self-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">
                    <HiOutlineClock className="w-3.5 h-3.5 text-primary" />
                    <span>{duration}</span>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            No curriculum chapters found.
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterList;