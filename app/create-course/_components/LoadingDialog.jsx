"use client";
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HiOutlineSparkles } from 'react-icons/hi2';

function LoadingDialog({ loading, title = "Generating Your Course", message = "Please wait... AI is crafting curriculum and matching educational resources." }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-2xl max-w-md p-8">
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle>Loading</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <div className="flex flex-col items-center text-center py-4 space-y-5">
            {/* Ambient Animated Glow Icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-sky-400 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 animate-pulse">
                <HiOutlineSparkles className="w-8 h-8 animate-spin-slow" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 opacity-30 blur-lg animate-pulse" />
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs">
                {message}
              </p>
            </div>

            {/* Subtle progress indicator */}
            <div className="w-full max-w-[200px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-sky-400 rounded-full animate-indeterminate" />
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Powered by Google Gemini 1.5 Flash
            </p>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;