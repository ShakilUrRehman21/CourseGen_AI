"use client";
import React, { useContext, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOptions() {
  const { UserCourseInput, setUserCourseInput } = useContext(UserInputContext);

  // Set default values if not yet set
  useEffect(() => {
    setUserCourseInput((prev) => ({
      level: prev?.level || "Beginner",
      duration: prev?.duration || "1-2 Hours",
      displayVideo: prev?.displayVideo || "Yes",
      noOfChapters: prev?.noOfChapters || 4,
      ...prev,
    }));
  }, []);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleChaptersChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 8) val = 8; // Sensible ceiling to avoid AI timeouts
    handleInputChange("noOfChapters", val);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Course Specifications
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize difficulty, pacing, multimedia, and chapter volume
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Difficulty Level */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <HiOutlineAdjustmentsHorizontal className="w-4 h-4 text-primary" />
              <span>Skill Level</span>
            </label>
            <Select
              value={UserCourseInput?.level || "Beginner"}
              onValueChange={(value) => handleInputChange("level", value)}
            >
              <SelectTrigger className="h-12 text-sm border-slate-200 rounded-xl focus:ring-primary">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 rounded-xl shadow-lg">
                <SelectItem value="Beginner">Beginner (Foundations & Basics)</SelectItem>
                <SelectItem value="Intermediate">Intermediate (Practical Application)</SelectItem>
                <SelectItem value="Advance">Advance (Architectural & In-depth)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Duration */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <HiOutlineClock className="w-4 h-4 text-primary" />
              <span>Target Duration</span>
            </label>
            <Select
              value={UserCourseInput?.duration || "1-2 Hours"}
              onValueChange={(value) => handleInputChange("duration", value)}
            >
              <SelectTrigger className="h-12 text-sm border-slate-200 rounded-xl focus:ring-primary">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 rounded-xl shadow-lg">
                <SelectItem value="30-45 Minutes">Quick Crash Course (30-45 Mins)</SelectItem>
                <SelectItem value="1-2 Hours">Standard Mastery (1-2 Hours)</SelectItem>
                <SelectItem value="3-5 Hours">Comprehensive Deep Dive (3-5 Hours)</SelectItem>
                <SelectItem value="5+ Hours">Masterclass Bootcamp (5+ Hours)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Video Option */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <HiOutlineVideoCamera className="w-4 h-4 text-primary" />
              <span>Include YouTube Video Sync?</span>
            </label>
            <Select
              value={UserCourseInput?.displayVideo || "Yes"}
              onValueChange={(value) => handleInputChange("displayVideo", value)}
            >
              <SelectTrigger className="h-12 text-sm border-slate-200 rounded-xl focus:ring-primary">
                <SelectValue placeholder="Include Video" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 rounded-xl shadow-lg">
                <SelectItem value="Yes">Yes (Auto-curate targeted video tutorials)</SelectItem>
                <SelectItem value="No">No (Text and code snippets only)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Chapters */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <HiOutlineBookOpen className="w-4 h-4 text-primary" />
              <span>Number of Chapters (1-8)</span>
            </label>
            <div className="relative">
              <Input
                type="number"
                min="1"
                max="8"
                className="h-12 text-sm border-slate-200 rounded-xl focus-visible:ring-primary"
                value={UserCourseInput?.noOfChapters || 4}
                onChange={handleChaptersChange}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                chapters
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectOptions;
