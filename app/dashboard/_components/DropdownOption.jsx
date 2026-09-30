"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HiOutlineTrash } from "react-icons/hi2";

function DropdownOption({ children, handleOnDelete }) {
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">{children}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white p-1 rounded-xl shadow-lg border border-slate-200">
          <DropdownMenuItem
            onClick={() => setOpenAlert(true)}
            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 cursor-pointer rounded-lg text-xs font-semibold px-3 py-2"
          >
            <HiOutlineTrash className="w-4 h-4" />
            <span>Delete Course</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-slate-900">
              Delete this course?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-500">
              This action cannot be undone. This will permanently remove the course curriculum, generated chapters, and synced video notes from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-2">
            <AlertDialogCancel
              onClick={() => setOpenAlert(false)}
              className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleOnDelete();
                setOpenAlert(false);
              }}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DropdownOption;
