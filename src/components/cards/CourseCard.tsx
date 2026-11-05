import React from 'react';
import type { Course } from '../../data/courseData';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container-highest/20 hover:border-primary/30 hover:bg-surface-container transition-all duration-300 shadow-sm flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-[11px] tracking-wider uppercase">
            TEKNIK INFORMATIKA
          </span>
          <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-semibold text-[11px]">
            Semester 2024I
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors">
          {course.name}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-col gap-1 text-sm text-on-surface-variant mt-1">
          <p>Kode: {course.code}</p>
          <p>Kelas: A</p>
        </div>

        {/* Lecturer Info */}
        <div className="flex items-center gap-2 mt-4 text-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px]">person</span>
          <span className="truncate">{course.lecturer}</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-8">
        <span className="text-2xl font-bold text-on-surface">{course.progress}%</span>
        <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden mt-2">
          <div 
            className="h-full bg-tertiary rounded-full transition-all duration-500" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}