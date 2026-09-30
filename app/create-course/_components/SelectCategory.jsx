"use client";
import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";
import { HiCheckCircle } from "react-icons/hi2";

function SelectCategory() {
  const { UserCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Choose a Course Category
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select the knowledge domain that best aligns with your target subject
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {CategoryList.map((item, index) => {
          const isSelected = UserCourseInput?.category === item.name;

          return (
            <div
              key={item.id || index}
              onClick={() => handleCategoryChange(item.name)}
              className={`relative flex flex-col p-5 rounded-2xl border cursor-pointer transition-all duration-200 select-none ${
                isSelected
                  ? "bg-indigo-50/70 border-primary ring-2 ring-primary/20 shadow-md shadow-indigo-100"
                  : "bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-card hover:-translate-y-0.5"
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 text-primary">
                  <HiCheckCircle className="w-5 h-5" />
                </div>
              )}

              {/* Tag / Badge */}
              {item.badge && (
                <div className="self-start mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="relative w-14 h-14 mb-3">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  sizes="56px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-slate-900 text-base">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectCategory;
