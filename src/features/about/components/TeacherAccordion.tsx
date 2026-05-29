'use client'; // ✅ فقط عشان useState للـ accordion
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import type { SubjectGroup } from '../services/teachers.service';
import type { Locale } from '@/lib/i18n/config';

interface TeacherAccordionProps {
  groups: SubjectGroup[];
  locale: Locale;
}

export const TeacherAccordion = ({ groups, locale }: TeacherAccordionProps) => {
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const isAr = locale === 'ar';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {groups.map(group => {
        const subjectLabel = isAr ? group.subjectAr : group.subjectEn;
        const isOpen = openSubject === group.subjectEn;

        return (
          <div
            key={group.subjectEn}
            className="rounded-2xl flex flex-col overflow-hidden bg-white transition-all duration-300"
          >
            <button
              onClick={() => setOpenSubject(isOpen ? null : group.subjectEn)}
              className="w-full px-6 py-4 bg-[#0652ba] text-white font-semibold text-lg 
              flex justify-between items-center hover:bg-[#0541a5] transition-colors rounded-2xl"
              aria-expanded={isOpen}
            >
              <span>{subjectLabel}</span>
              {isOpen
                ? <ChevronUp className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                : <ChevronDown className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              }
            </button>

            {/* ✅ smooth CSS transition */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[999px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <div className="flex flex-col bg-white rounded-2xl">
                {group.teachers.map(teacher => (
                  <div key={teacher.id} className="flex items-center gap-4 px-6 py-4">
                    {/* ✅ next/image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
  <Image
    src={teacher.image}
    alt={teacher.name[isAr ? 'ar' : 'en'] || subjectLabel}
    width={48}
    height={48}
    className="object-cover w-12 h-12"
  />
</div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {teacher.name[isAr ? 'ar' : 'en'] || '—'}
                      </p>
                      <p className="text-gray-600 text-sm">{subjectLabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};