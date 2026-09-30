"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser, UserButton } from '@clerk/nextjs';
import { HiOutlineSparkles } from 'react-icons/hi2';

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <HiOutlineSparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
              CourseGen <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-primary border border-indigo-200/60">AI</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/dashboard/explore" className="hover:text-primary transition-colors">
            Explore Courses
          </Link>
          <Link href="/dashboard/vision" className="hover:text-primary transition-colors">
            Vision
          </Link>
          <Link href="/dashboard/contact" className="hover:text-primary transition-colors">
            Support
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/create-course">
                <Button size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary-700 text-white shadow-sm font-medium">
                  + Create Course
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-700 hover:text-primary hover:bg-indigo-50/60 font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary-700 text-white shadow-md shadow-indigo-500/20 font-medium">
                  Get Started Free
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;