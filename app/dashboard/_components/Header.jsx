"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { HiOutlineBars3, HiOutlineXMark, HiOutlinePlus } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import SideBar from './SideBar';

function Header() {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex justify-between items-center px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        {/* Mobile menu button & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open sidebar menu"
          >
            <HiOutlineBars3 className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-base font-semibold text-slate-800">
              Workspace Overview
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Manage your AI-crafted learning curriculum
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/create-course">
            <Button size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary-700 text-white gap-1.5 shadow-sm text-xs font-semibold rounded-lg">
              <HiOutlinePlus className="w-4 h-4" />
              <span>Create Course</span>
            </Button>
          </Link>
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-800">{user?.fullName || "Learner"}</div>
              <div className="text-[11px] text-slate-400">{user?.primaryEmailAddress?.emailAddress}</div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>
            <SideBar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;