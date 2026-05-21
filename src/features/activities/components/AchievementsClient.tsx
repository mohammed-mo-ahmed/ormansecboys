'use client'; // ✅ فقط عشان useState للـ zoom
import { useState } from 'react';
import Image from 'next/image';
import { ImageZoomModal } from '@/shared/components/ui/ImageZoomModal';
import type { Achievement, TopStudentGrade } from '../services/achievements.service';

interface AchievementsClientProps {
  achievements: Achievement[];
  topStudents: TopStudentGrade[];
  locale: string;
  labels: {
    yearLabel: string;
    notDefined: string;
    noImage: string;
    clickToEnlarge: string;
    topStudents: string;
    topStudentsPlaceholder: string;
    closeLabel: string;
  };
}

export const AchievementsClient = ({
  achievements,
  topStudents,
  locale,
  labels,
}: AchievementsClientProps) => {
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const isAr = locale === 'ar';
  const lang = isAr ? 'ar' : 'en';

  return (
    <>
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map(ach => (
          <div
            key={ach.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all 
            transform hover:-translate-y-2 border border-gray-100"
          >
            <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              {ach.image ? (
                <Image src={ach.image} alt={ach.title[lang]} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              ) : (
                <span className="text-gray-500 text-lg">{labels.noImage}</span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{ach.title[lang]}</h3>
            <p className="text-gray-600">
              {labels.yearLabel}: {ach.year || labels.notDefined}
            </p>
          </div>
        ))}
      </div>

      {/* Top Students */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold mb-10 text-gray-900">{labels.topStudents}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topStudents.map(grade => (
            <div
              key={grade.id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#0652ba]">
                {grade.title[lang]}
              </h3>
              {grade.image ? (
                <button
                  onClick={() => setZoomSrc(grade.image)}
                  className="relative w-full h-72 rounded-lg overflow-hidden bg-gray-200 group 
                  focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:ring-offset-2"
                  aria-label={labels.clickToEnlarge}
                >
                  <Image
                    src={grade.image}
                    alt={grade.title[lang]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                  flex items-center justify-center text-white font-semibold transition-opacity">
                    {labels.clickToEnlarge}
                  </div>
                </button>
              ) : (
                <div className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  {labels.topStudentsPlaceholder}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Shared ImageZoomModal */}
      {zoomSrc && (
        <ImageZoomModal
          src={zoomSrc}
          closeLabel={labels.closeLabel}
          onClose={() => setZoomSrc(null)}
        />
      )}
    </>
  );
};