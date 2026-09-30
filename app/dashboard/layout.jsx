"use client";
import React, { useState } from 'react';
import SideBar from './_components/SideBar';
import Header from './_components/Header';
import { UserCourseListContext } from '../_context/UserCourseListContext';

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);

  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      <div className="min-h-screen bg-slate-50 flex text-slate-900">
        {/* Desktop Fixed Sidebar */}
        <aside className="w-64 hidden md:block fixed inset-y-0 left-0 z-40">
          <SideBar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-64 flex flex-col min-h-screen min-w-0">
          <Header />
          <main className="p-6 sm:p-8 lg:p-10 flex-1">
            {children}
          </main>
        </div>
      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;