// src/app/[locale]/(dashboard)/student/choose-path/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { getStudentSession } from '@/lib/auth/session';
import { getById } from '@/features/student/services/students.db';
import { PathWizard } from '@/features/student/components/paths/PathWizard';

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getStudentSession();
  if (!session) redirect(`/${locale}/login`);

  const student = await getById(session.uid);
  if (!student) redirect(`/${locale}/login`);

  // اختيار المسار متاح لطلاب الصف الثاني الثانوي فقط
  if (student.grade !== 'grade2') redirect(`/${locale}/student`);

  return <PathWizard student={student} locale={locale} />;
}