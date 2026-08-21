// src/app/[locale]/teacher-login/admin/(panel)/students/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { listAll } from '@/features/student/services/students.db';
import { StudentsTable } from '@/features/admin/components/StudentsTable';
import { AdminPagesShell } from '@/features/admin/components/AdminPagesShell';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ grade?: string; path?: string; branch?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;

  const students = await listAll();

  return (
    <AdminPagesShell locale={locale}>
      <StudentsTable
        students={students}
        locale={locale}
        initialFilters={{ grade: sp.grade, path: sp.path, branch: sp.branch }}
      />
    </AdminPagesShell>
  );
}