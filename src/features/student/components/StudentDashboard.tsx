'use client';
// src/features/student/components/StudentDashboard.tsx
import { useState, useEffect } from 'react';
import {
  BookOpen, Calendar, ClipboardList,
  MessageSquare, BarChart2, Bell,
  LogOut, Menu, X, GraduationCap,
  Hash, Users, CreditCard,
} from 'lucide-react';
import type { StudentData } from '../services/sheets.service';

type Tab = 'overview' | 'grades' | 'schedule' | 'assignments' | 'messages';

interface NavItem {
  id:      Tab;
  labelAr: string;
  labelEn: string;
  icon:    React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview',    labelAr: 'الرئيسية',  labelEn: 'Overview',    icon: BarChart2     },
  { id: 'grades',      labelAr: 'الدرجات',   labelEn: 'Grades',      icon: BookOpen      },
  { id: 'schedule',    labelAr: 'الجدول',    labelEn: 'Schedule',    icon: Calendar      },
  { id: 'assignments', labelAr: 'الواجبات',  labelEn: 'Assignments', icon: ClipboardList },
  { id: 'messages',    labelAr: 'الرسائل',   labelEn: 'Messages',    icon: MessageSquare },
];

const MOCK_SCHEDULE = [
  { day: 'الأحد',    dayEn: 'Sunday',    periods: ['رياضيات', 'فيزياء', 'عربي', 'إنجليزي'] },
  { day: 'الاثنين',  dayEn: 'Monday',    periods: ['كيمياء', 'تاريخ', 'رياضيات', 'ألماني']  },
  { day: 'الثلاثاء', dayEn: 'Tuesday',   periods: ['إنجليزي', 'أحياء', 'فلسفة', 'رياضيات'] },
  { day: 'الأربعاء', dayEn: 'Wednesday', periods: ['عربي', 'فيزياء', 'كيمياء', 'تاريخ']    },
  { day: 'الخميس',   dayEn: 'Thursday',  periods: ['رياضيات', 'إنجليزي', 'ألماني', 'أحياء'] },
];

// ── Tabs ────────────────────────────────────────────────
const OverviewTab = ({ student, isAr }: { student: StudentData; isAr: boolean }) => {
  const total    = student.subjects.reduce((s, g) => s + g.grade, 0);
  const maxTotal = student.subjects.reduce((s, g) => s + g.max,   0);
  const avg      = maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(1) : '—';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {isAr ? `مرحباً، ${student.name} 👋` : `Welcome, ${student.name} 👋`}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: isAr ? 'الصف'        : 'Grade',    value: student.grade,      Icon: Users,      bg: 'bg-[#0652ba]' },
          { label: isAr ? 'الفصل'       : 'Class',    value: student.classroom,  Icon: Hash,       bg: 'bg-purple-600' },
          { label: isAr ? 'رقم الجلوس'  : 'Seat No.', value: student.seatNumber, Icon: CreditCard, bg: 'bg-green-600'  },
        ].map(({ label, value, Icon, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">{isAr ? 'المتوسط العام' : 'Overall Average'}</h3>
          <span className="text-2xl font-bold text-[#0652ba]">{avg}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className="bg-[#0652ba] h-3 rounded-full transition-all duration-700" style={{ width: `${avg}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">{isAr ? 'آخر الدرجات' : 'Recent Grades'}</h3>
        <div className="space-y-3">
          {student.subjects.slice(0, 5).map(g => (
            <div key={g.subject} className="flex items-center gap-3">
              <span className="flex-1 text-gray-700 text-sm">{g.subject}</span>
              <div className="w-28 bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${g.grade / g.max >= 0.9 ? 'bg-green-500' : g.grade / g.max >= 0.75 ? 'bg-[#0652ba]' : 'bg-orange-400'}`}
                  style={{ width: `${(g.grade / g.max) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-900 w-14 text-end">{g.grade}/{g.max}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GradesTab = ({ student, isAr }: { student: StudentData; isAr: boolean }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">{isAr ? 'الدرجات' : 'Grades'}</h2>
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-600">{isAr ? 'المادة' : 'Subject'}</th>
            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-600">{isAr ? 'الدرجة' : 'Grade'}</th>
            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-600">{isAr ? 'التقدير' : 'Rating'}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {student.subjects.map(g => (
            <tr key={g.subject} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{g.subject}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-100 rounded-full h-2">
                    <div className="bg-[#0652ba] h-2 rounded-full" style={{ width: `${(g.grade / g.max) * 100}%` }} />
                  </div>
                  <span className="font-bold text-gray-900">{g.grade}/{g.max}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  g.grade / g.max >= 0.9  ? 'bg-green-100 text-green-700'   :
                  g.grade / g.max >= 0.75 ? 'bg-blue-100 text-blue-700'     :
                                            'bg-orange-100 text-orange-700'
                }`}>
                  {g.grade / g.max >= 0.9
                    ? (isAr ? 'ممتاز'    : 'Excellent')
                    : g.grade / g.max >= 0.75
                    ? (isAr ? 'جيد جداً' : 'Very Good')
                    : (isAr ? 'جيد'      : 'Good')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ScheduleTab = ({ isAr }: { isAr: boolean }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">{isAr ? 'الجدول الدراسي' : 'Schedule'}</h2>
    <div className="space-y-4">
      {MOCK_SCHEDULE.map(day => (
        <div key={day.day} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-[#0652ba] mb-3">{isAr ? day.day : day.dayEn}</h3>
          <div className="flex flex-wrap gap-2">
            {day.periods.map((p, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                {i + 1}. {p}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EmptyTab = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
    <MessageSquare className="w-16 h-16 mb-4 opacity-30" />
    <p className="text-lg">{label}</p>
  </div>
);

// ── Main ────────────────────────────────────────────────
interface StudentDashboardProps {
  locale: string;
}

export const StudentDashboard = ({ locale }: StudentDashboardProps) => {
  const isAr = locale === 'ar';

  const [student,     setStudent]     = useState<StudentData | null>(null);
  const [activeTab,   setActiveTab]   = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked,     setChecked]     = useState(false); // ✅ منع redirect مبكر

  useEffect(() => {
    // ✅ قرا من sessionStorage مرة واحدة بس
    const raw = sessionStorage.getItem('student_data');
    if (raw) {
      try {
        setStudent(JSON.parse(raw));
      } catch {
        sessionStorage.removeItem('student_data');
        window.location.href = `/${locale}/login`;
      }
    }
    // ✅ سجل إن الفحص خلص — بعد كده بس نقرر
    setChecked(true);
  }, []); // ✅ dependency array فاضي — يشتغل مرة واحدة بس

  // ✅ لو الفحص خلص ومفيش student → redirect
  useEffect(() => {
    if (checked && !student) {
      window.location.href = `/${locale}/login`;
    }
  }, [checked, student, locale]);

  const handleLogout = () => {
    sessionStorage.removeItem('student_data');
    window.location.href = `/${locale}`;
  };

  // Loading spinner لحد ما الفحص يخلص
  if (!checked || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#0652ba] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':    return <OverviewTab  student={student} isAr={isAr} />;
      case 'grades':      return <GradesTab    student={student} isAr={isAr} />;
      case 'schedule':    return <ScheduleTab  isAr={isAr} />;
      case 'assignments': return <EmptyTab label={isAr ? 'لا توجد واجبات حالياً' : 'No assignments yet'} />;
      case 'messages':    return <EmptyTab label={isAr ? 'لا توجد رسائل حالياً'  : 'No messages yet'}    />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir={isAr ? 'rtl' : 'ltr'}>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 z-30 w-64 bg-[#0652ba] text-white flex flex-col
        transition-transform duration-300
        ${isAr ? 'right-0' : 'left-0'}
        ${sidebarOpen ? 'translate-x-0' : (isAr ? 'translate-x-full' : '-translate-x-full')}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{student.name}</p>
              <p className="text-xs text-white/60">{student.grade} — {student.classroom}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ id, labelAr, labelEn, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                transition-all ${activeTab === id
                  ? 'bg-white text-[#0652ba] shadow'
                  : 'text-white/80 hover:bg-white/10'
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isAr ? labelAr : labelEn}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
              text-white/80 hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isAr ? 'الخروج' : 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="lg:hidden font-bold text-[#0652ba] text-sm">
            {isAr ? 'بوابة الطالب' : 'Student Portal'}
          </div>
          <div className="flex items-center gap-3 ms-auto">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <div className="w-8 h-8 bg-[#0652ba] rounded-full flex items-center justify-center text-white text-sm font-bold">
              {student.name[0]}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderTab()}
        </main>
      </div>
    </div>
  );
};