// src/features/admin/types.ts
import type { Branch, StudyPath } from '@/features/student/types/student.types';

export interface AdminStats {
  total: number;
  byGrade: { grade1: number; grade2: number; grade3: number };
  paths: Record<StudyPath, number>;
  pathChosen: number;
  pathNotChosen: number;
  branches: Record<Branch, number>;
}