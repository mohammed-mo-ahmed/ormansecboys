export type Role = 'student' | 'teacher' | 'admin';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: Role;
}