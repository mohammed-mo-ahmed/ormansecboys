// src/app/[locale]/teacher-login/admin/(panel)/students/[id]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getById } from '@/features/student/services/students.db';
import { StudentEditForm } from '@/features/admin/components/StudentEditForm';
import { AdminPagesShell } from '@/features/admin/components/AdminPagesShell';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const student = await getById(id);
  if (!student) notFound();

  return (
    <AdminPagesShell locale={locale}>
      <StudentEditForm student={student} locale={locale} />
    </AdminPagesShell>
  );
}