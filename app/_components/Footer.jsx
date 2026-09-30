import React from 'react';
import Link from 'next/link';
import { HiOutlineSparkles } from 'react-icons/hi2';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white">
            <HiOutlineSparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-sm">CourseGen AI</span>
          <span className="text-xs text-slate-400 ml-2">© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-500">
          <Link href="/dashboard/explore" className="hover:text-primary transition-colors">
            Explore
          </Link>
          <Link href="/dashboard/vision" className="hover:text-primary transition-colors">
            Vision
          </Link>
          <Link href="/dashboard/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
