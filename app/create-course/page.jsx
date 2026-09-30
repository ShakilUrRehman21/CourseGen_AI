"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineAdjustmentsHorizontal,
  HiCheck,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOptions from "./_components/SelectOptions";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { safeJsonParse } from "@/lib/jsonHelper";

function CreateCourse() {
  const stepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiOutlineSquares2X2 className="w-5 h-5" />,
    },
    {
      id: 2,
      name: "Topic & Scope",
      icon: <HiOutlineDocumentText className="w-5 h-5" />,
    },
    {
      id: 3,
      name: "Configuration",
      icon: <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />,
    },
  ];

  const { user } = useUser();
  const router = useRouter();
  const { UserCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const checkStatus = () => {
    if (!UserCourseInput) return true;
    if (activeIndex === 0 && !UserCourseInput?.category) return true;
    if (activeIndex === 1 && (!UserCourseInput?.topic || UserCourseInput?.topic.trim().length === 0)) return true;
    if (
      activeIndex === 2 &&
      (!UserCourseInput?.level ||
        !UserCourseInput?.duration ||
        !UserCourseInput?.displayVideo ||
        !UserCourseInput?.noOfChapters)
    ) {
      return true;
    }
    return false;
  };

  const GenerateCourseLayout = async () => {
    if (!user) {
      alert("Please sign in before generating a course.");
      return;
    }

    setLoading(true);
    setLoadingMessage("Synthesizing curriculum layout & chapter outlines...");

    const topic = UserCourseInput?.topic?.trim();
    const category = UserCourseInput?.category;
    const level = UserCourseInput?.level || "Beginner";
    const duration = UserCourseInput?.duration || "1-2 Hours";
    const noOfChapters = Math.min(Math.max(Number(UserCourseInput?.noOfChapters) || 4, 1), 8);
    const extraDetails = UserCourseInput?.description ? `Specific requirements: ${UserCourseInput.description}` : "";

    const prompt = `Generate a detailed course curriculum layout based on the following specifications:
Category: "${category}"
Topic: "${topic}"
Level: "${level}"
Target Duration: "${duration}"
Number of Chapters: ${noOfChapters}
${extraDetails}

Return strictly a single JSON object with this exact structure:
{
  "course_name": "Concise Engaging Course Title",
  "description": "Comprehensive course overview explaining what will be learned (2-3 paragraphs)",
  "category": "${category}",
  "topic": "${topic}",
  "level": "${level}",
  "duration": "${duration}",
  "no_of_chapters": ${noOfChapters},
  "chapters": [
    {
      "chapter_name": "Clear Chapter Title",
      "about": "Detailed 2-3 sentence overview of this chapter's learning outcomes",
      "duration": "Duration (e.g. 15 minutes)"
    }
  ]
}`;

    try {
      const result = await GenerateCourseLayout_AI.sendMessage(prompt);
      const rawText = result.response?.text();
      const courseLayout = safeJsonParse(rawText);

      if (!courseLayout || !courseLayout.chapters || courseLayout.chapters.length === 0) {
        throw new Error("Invalid curriculum structure returned by AI.");
      }

      await SaveCourseLayoutInDb(courseLayout);
    } catch (error) {
      console.error("Error generating layout:", error);
      alert("Failed to generate course layout. Please verify your connection and try again.");
      setLoading(false);
    }
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    const courseId = uuid4();
    setLoadingMessage("Saving curriculum to your workspace...");

    try {
      await db.insert(CourseList).values({
        courseId: courseId,
        name: UserCourseInput?.topic || courseLayout?.course_name,
        level: UserCourseInput?.level || "Beginner",
        category: UserCourseInput?.category || "General",
        includeVideo: UserCourseInput?.displayVideo || "Yes",
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl,
      });

      router.replace(`/create-course/${courseId}`);
    } catch (dbError) {
      console.error("Database insert error:", dbError);
      alert("Failed to save course into database.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* Stepper Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-semibold mb-3">
            <HiOutlineSparkles className="w-4 h-4" />
            <span>AI Curriculum Designer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Create a New AI Course
          </h1>

          {/* Stepper Progress Bar */}
          <div className="mt-8 flex items-center justify-center max-w-xl mx-auto">
            {stepperOptions.map((item, index) => {
              const isCompleted = activeIndex > index;
              const isCurrent = activeIndex === index;

              return (
                <React.Fragment key={item.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 shadow-sm ${
                        isCompleted
                          ? "bg-emerald-500 text-white shadow-emerald-200"
                          : isCurrent
                          ? "bg-primary text-white shadow-indigo-300 ring-4 ring-indigo-100"
                          : "bg-white text-slate-400 border border-slate-200"
                      }`}
                    >
                      {isCompleted ? <HiCheck className="w-5 h-5 stroke-[2]" /> : item.icon}
                    </div>
                    <span
                      className={`mt-2 text-xs font-semibold hidden sm:block ${
                        isCurrent
                          ? "text-primary"
                          : isCompleted
                          ? "text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {index !== stepperOptions.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-all duration-300 ${
                        activeIndex > index ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Wizard Step Component */}
        <div className="my-8">
          {activeIndex === 0 ? (
            <SelectCategory />
          ) : activeIndex === 1 ? (
            <TopicDescription />
          ) : (
            <SelectOptions />
          )}
        </div>

        {/* Wizard Navigation Footer */}
        <div className="max-w-3xl mx-auto flex items-center justify-between pt-6 border-t border-slate-200">
          <Button
            disabled={activeIndex === 0}
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
            className="rounded-xl border-slate-200 text-slate-700 hover:bg-white gap-2 font-medium"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {activeIndex < 2 ? (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="rounded-xl bg-primary hover:bg-primary-700 text-white gap-2 font-semibold shadow-md shadow-indigo-500/20"
            >
              <span>Next Step</span>
              <HiOutlineArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              disabled={checkStatus() || loading}
              onClick={GenerateCourseLayout}
              className="rounded-xl bg-primary hover:bg-primary-700 text-white gap-2 font-semibold shadow-lg shadow-indigo-500/25 px-6"
            >
              <HiOutlineSparkles className="w-5 h-5" />
              <span>Generate Course Layout</span>
            </Button>
          )}
        </div>
      </div>

      <LoadingDialog
        loading={loading}
        title="Generating Course Curriculum"
        message={loadingMessage}
      />
    </div>
  );
}

export default CreateCourse;
