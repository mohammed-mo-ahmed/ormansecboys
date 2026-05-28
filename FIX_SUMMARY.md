# تحديث: إصلاح مشكلة إعادة التحميل في بوابة الطالب

## 🔍 تشخيص المشكلة

عند تسجيل دخول الطالب برقم قومي صحيح، كان يحدث **reload/bounce** لأن:

1. **LoginForm** يحفظ بيانات الطالب في `sessionStorage` ويعيد التوجيه إلى `/student`
2. **Dashboard Layout** يستخدم `AuthGuard` (مكون Firebase)
3. **AuthGuard** يتحقق من Firebase Auth فقط، وليس من `sessionStorage`
4. بما أن الطالب لم يسجل دخول عبر Firebase → يعيد التوجيه إلى `/login`
5. **النتيجة**: حلقة redirect مستمرة (reload)

## ✅ الحل المطبق

### 1. إنشاء `StudentAuthGuard` جديد
**الملف**: `src/features/auth/guards/StudentAuthGuard.tsx`

- يتحقق من وجود `student_data` في `sessionStorage` بدل Firebase Auth
- يعيد التوجيه إلى `/login` إذا لم توجد البيانات
- يسمح بدخول الطالب إذا كانت البيانات موجودة

### 2. تحديث Dashboard Layout
**الملف**: `src/app/[locale]/(dashboard)/layout.tsx`

```diff
- import { AuthGuard } from '@/features/auth/guards/AuthGuard';
+ import { StudentAuthGuard } from '@/features/auth/guards/StudentAuthGuard';

- <AuthGuard>
+ <StudentAuthGuard>
```

### 3. تبسيط StudentDashboard
**الملف**: `src/features/student/components/StudentDashboard.tsx`

- أزلنا الفحص المكرر للـ auth (كان يتم في `StudentAuthGuard`)
- أبقينا على قراءة `sessionStorage` لتحميل بيانات الطالب في الـ state
- تبسيط logic التحميل والـ redirect

## 🎯 النتيجة

✅ الطالب يسجل دخول برقم قومي صحيح → يدخل إلى لوحة التحكم مباشرة بدون reload
✅ إذا حاول الوصول مباشرة بدون تسجيل دخول → يعاد إلى صفحة تسجيل الدخول
✅ الخروج يمسح `sessionStorage` ويعيد إلى الصفحة الرئيسية

## 📝 الملفات المعدلة

1. ✨ **جديد**: `src/features/auth/guards/StudentAuthGuard.tsx`
2. 🔧 **معدل**: `src/app/[locale]/(dashboard)/layout.tsx`
3. 🔧 **معدل**: `src/features/student/components/StudentDashboard.tsx`
