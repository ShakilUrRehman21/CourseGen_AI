"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (course) {
      setName(course?.courseOutput?.course_name || course?.name || "");
      setDescription(course?.courseOutput?.description || "");
    }
  }, [course]);

  const onUpdateHandler = async () => {
    if (!course) return;

    try {
      const updatedOutput = {
        ...(course?.courseOutput || {}),
        course_name: name,
        description: description,
      };

      await db
        .update(CourseList)
        .set({
          name: name,
          courseOutput: updatedOutput,
        })
        .where(eq(CourseList.courseId, course?.courseId));

      setOpen(false);
      if (refreshData) {
        refreshData(true);
      }
    } catch (err) {
      console.error("Error updating course info:", err);
      alert("Failed to update course details.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-indigo-50 transition-colors"
          title="Edit Title & Description"
        >
          <HiOutlinePencilSquare className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Edit Course Information
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Customize the public title and overview description for this course.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Course Title
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 text-sm border-slate-200 rounded-xl focus-visible:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Course Description
            </label>
            <Textarea
              className="min-h-[140px] text-sm border-slate-200 rounded-xl focus-visible:ring-primary resize-none leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 mt-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-xl border-slate-200 text-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={onUpdateHandler}
            className="rounded-xl bg-primary hover:bg-primary-700 text-white font-semibold"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;
