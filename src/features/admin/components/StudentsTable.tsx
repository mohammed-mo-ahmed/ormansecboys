'use client';
// src/features/admin/components/StudentsTable.tsx
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Search, Printer, ChevronUp, ChevronDown, Pencil, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import type { StudentProfile, Grade, StudyPath, Branch } from '@/features/student/types/student.types';
import { GRADES, STUDY_PATHS, BRANCHES } from '@/features/student/types/student.types';

export interface StudentsFilters {
  grade?: string;
  path?: string;
  branch?: string;
}

interface Props {
  students: StudentProfile[];
  locale: string;
  initialFilters?: StudentsFilters;
}

type SortKey = 'name' | 'code' | 'seatNumber' | 'classroom';
type SortState = { key: SortKey; dir: 'asc' | 'desc' };

const SortHeader = ({ label, k, sort, onSort }: { label: string; k: SortKey; sort: SortState; onSort: (k: SortKey) => void }) => (
  <button onClick={() => onSort(k)} className="inline-flex items-center gap-1 hover:text-[#0652ba] transition-colors">
    {label}
    {sort.key === k ? (
      sort.dir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
    ) : (
      <ChevronUp className="w-4 h-4 opacity-20" />
    )}
  </button>
);

export const StudentsTable = ({ students, locale, initialFilters = {} }: Props) => {
  const t = useTranslations('admin');
  const ts = useTranslations('student');
  const tp = useTranslations('paths');
  const isAr = locale === 'ar';

  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState<string>(initialFilters.grade ?? '');
  const [path, setPath] = useState<string>(initialFilters.path ?? '');
  const [branch, setBranch] = useState<string>(initialFilters.branch ?? '');
  const [sort, setSort] = useState<SortState>({ key: 'name', dir: 'asc' });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = students.filter(s => {
      if (grade && s.grade !== grade) return false;
      if (path && s.path !== path) return false;
      if (branch && s.branch !== branch) return false;
      if (q) {
        const hay = [s.name, s.code, s.seatNumber, s.classroom, s.nationalId]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const dir = sort.dir === 'asc' ? 1 : -1;
    list.sort((a, b) => {
      const av = (a[sort.key] ?? '').toString();
      const bv = (b[sort.key] ?? '').toString();
      return av.localeCompare(bv, isAr ? 'ar' : 'en') * dir;
    });
    return list;
  }, [students, search, grade, path, branch, sort, isAr]);

  const toggleSort = (key: SortKey) => {
    setSort(prev => (prev.key === key
      ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
      : { key, dir: 'asc' }));
  };

  const gradeLabel = (g: Grade) => ts(g);

  const pathBranchLabel = (s: StudentProfile): string => {
    if (s.grade === 'grade2') {
      if (s.path) {
        const subj = s.specialtySubject ? ` — ${ts(`specialtySubjects.${s.specialtySubject}`)}` : '';
        return `${tp(`${s.path}.name`)}${subj}`;
      }
      return t('notAssigned');
    }
    if (s.grade === 'grade3') return s.branch ? ts(`branches.${s.branch}`) : t('notAssigned');
    return '—';
  };

  const selectCls =
    'px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0652ba]';

  const exportToExcel = () => {
    const data = filtered.map((s, i) => ({
      '#': i + 1,
      [t('nameCol')]: s.name ?? '',
      [t('codeCol')]: s.code ?? '',
      [t('seatCol')]: s.seatNumber ?? '',
      [ts('grade')]: gradeLabel(s.grade),
      [t('pathCol')]: pathBranchLabel(s),
      [ts('classroom')]: s.classroom ?? '',
      [ts('nationalId')]: s.nationalId ?? '',
      [ts('phone')]: s.phone ?? '',
      [ts('parentPhone')]: s.parentPhone ?? '',
      [ts('studentType')]: s.studentType ?? '',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, t('printNote'));
    XLSX.writeFile(wb, `${t('printNote')}.xlsx`);
  };

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      {/* Filters toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('search')}
              className="w-full ps-9 pe-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0652ba]"
            />
          </div>
          <select value={grade} onChange={e => setGrade(e.target.value)} className={selectCls}>
            <option value="">{`${t('filterGrade')}: ${t('all')}`}</option>
            {GRADES.map(g => <option key={g} value={g}>{gradeLabel(g)}</option>)}
          </select>
          <select value={path} onChange={e => setPath(e.target.value)} className={selectCls}>
            <option value="">{`${t('filterPath')}: ${t('all')}`}</option>
            {STUDY_PATHS.map(p => <option key={p} value={p}>{tp(`${p}.name`)}</option>)}
          </select>
          <select value={branch} onChange={e => setBranch(e.target.value)} className={selectCls}>
            <option value="">{`${t('filterBranch')}: ${t('all')}`}</option>
            {BRANCHES.map(b => <option key={b} value={b}>{ts(`branches.${b}`)}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-600">{t('studentsCount')}: {filtered.length}</p>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-[#0652ba] text-white rounded-xl text-sm font-bold hover:bg-[#0541a5] transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            {t('printSheet')}
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-500 font-semibold">
          {t('empty')}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto no-print">
          <table className="w-full text-sm min-w-max">
            <thead className="bg-gray-50">
              <tr className="text-gray-600">
                <th className="px-4 py-3 text-start font-semibold">
                  <SortHeader label={t('nameCol')} k="name" sort={sort} onSort={toggleSort} />
                </th>
                <th className="px-4 py-3 text-start font-semibold">
                  <SortHeader label={t('codeCol')} k="code" sort={sort} onSort={toggleSort} />
                </th>
                <th className="px-4 py-3 text-start font-semibold">
                  <SortHeader label={t('seatCol')} k="seatNumber" sort={sort} onSort={toggleSort} />
                </th>
                <th className="px-4 py-3 text-start font-semibold">{ts('grade')}</th>
                <th className="px-4 py-3 text-start font-semibold">{t('pathCol')}</th>
                <th className="px-4 py-3 text-start font-semibold">
                  <SortHeader label={ts('classroom')} k="classroom" sort={sort} onSort={toggleSort} />
                </th>
                <th className="px-4 py-3 text-center font-semibold">{t('edit')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-gray-600" dir="ltr">{s.code ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600" dir="ltr">{s.seatNumber ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{gradeLabel(s.grade)}</td>
                  <td className="px-4 py-3">
                    <span className="text-[#0652ba] font-semibold text-sm">{pathBranchLabel(s)}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{s.classroom ?? '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`/${locale}/teacher-login/admin/students/${s.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0652ba]/10 text-[#0652ba] rounded-lg text-xs font-bold hover:bg-[#0652ba]/20 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                      {t('edit')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Print sheet (only visible when printing) ===== */}
      <style jsx global>{`
        @media print {
          body { background: #fff !important; }
          .no-print { display: none !important; }
          .print-sheet { display: block !important; }
          @page { size: A4 landscape; margin: 10mm; }
        }
      `}</style>
      <div className="print-sheet hidden">
        <h1 className="font-bold text-lg mb-1">{t('printNote')}</h1>
        <p className="text-xs text-gray-500 mb-3">
          {!!search && `🔍 ${t('search')}: ${search}`}
          {grade && ` • ${t('filterGrade')}: ${gradeLabel(grade as Grade)}`}
          {path && ` • ${t('filterPath')}: ${tp(`${path as StudyPath}.name`)}`}
          {branch && ` • ${t('filterBranch')}: ${ts(`branches.${branch as Branch}`)}`}
        </p>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="py-1.5 text-start px-1">#</th>
              <th className="py-1.5 text-start px-1">{t('nameCol')}</th>
              <th className="py-1.5 text-start px-1">{t('codeCol')}</th>
              <th className="py-1.5 text-start px-1">{t('seatCol')}</th>
              <th className="py-1.5 text-start px-1">{ts('grade')}</th>
              <th className="py-1.5 text-start px-1">{ts('classroom')}</th>
              <th className="py-1.5 text-start px-1">{t('pathCol')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} className="border-b border-gray-300">
                <td className="py-1 px-1">{i + 1}</td>
                <td className="py-1 px-1">{s.name}</td>
                <td className="py-1 px-1">{s.code ?? ''}</td>
                <td className="py-1 px-1">{s.seatNumber ?? ''}</td>
                <td className="py-1 px-1">{gradeLabel(s.grade)}</td>
                <td className="py-1 px-1">{s.classroom ?? ''}</td>
                <td className="py-1 px-1">{pathBranchLabel(s)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};