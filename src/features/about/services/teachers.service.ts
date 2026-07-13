import type { Teacher } from '../types/about.types';

export type SubjectGroup = {
  subjectEn: string;
  subjectAr: string;
  teachers: Teacher[];
};

// ✅ بيجمع المعلمين حسب المادة — بيحصل على السيرفر
export const groupTeachersBySubject = (teachers: Teacher[]): SubjectGroup[] => {
  const map = new Map<string, SubjectGroup>();
  teachers.forEach(t => {
    const key = t.subject.en; // مفتاح ثابت (English)
    if (!map.has(key)) {
      map.set(key, { subjectEn: t.subject.en, subjectAr: t.subject.ar, teachers: [] });
    }
    map.get(key)!.teachers.push(t);
  });
  return Array.from(map.values());
};
export const getCustomTeachers = async (): Promise<Teacher[]> => [
  { id: 'c1', name: { ar: 'أ. أسماء اسماعيل محمد', en: 'Ms. Asmaa Esmail' }, subject: { ar: 'مديرة المدرسة', en: 'School Principal' }, image: '/images/teachers/ms.asmaa-esmail.webp' },

  // منتصر محمد عبد الجواد (ألماني/فرنسي) -> فصل اللغات
  { id: 'c2', name: { ar: 'أ. منتصر محمد عبد الجواد', en: 'Mr. Montaser Mohamed' }, subject: { ar: 'اللغة الألمانية', en: 'German Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c3', name: { ar: 'أ. منتصر محمد عبد الجواد', en: 'Mr. Montaser Mohamed' }, subject: { ar: 'اللغة الفرنسية', en: 'French Language' }, image: '/images/teachers/unknown.webp' },

  // محمد السيد عثمان الدسوقي (ألماني/فرنسي) -> فصل اللغات
  { id: 'c4', name: { ar: 'أ. محمد السيد عثمان', en: 'Mr. Mohamed El-Sayed' }, subject: { ar: 'اللغة الألمانية', en: 'German Language' }, image: '/images/teachers/mr.mohamed-el-sayed.webp' },
  { id: 'c5', name: { ar: 'أ. محمد السيد عثمان', en: 'Mr. Mohamed El-Sayed' }, subject: { ar: 'اللغة الفرنسية', en: 'French Language' }, image: '/images/teachers/mr.mohamed-el-sayed.webp' },

  // حسام محمد محمود شرف (ألماني/فرنسي) -> فصل اللغات
  { id: 'c6', name: { ar: 'أ. حسام محمد محمود شرف', en: 'Mr. Hossam Sharaf' }, subject: { ar: 'اللغة الألمانية', en: 'German Language' }, image: '/images/teachers/mr.hossam-sharaf.webp' },
  { id: 'c7', name: { ar: 'أ. حسام محمد محمود شرف', en: 'Mr. Hossam Sharaf' }, subject: { ar: 'اللغة الفرنسية', en: 'French Language' }, image: '/images/teachers/mr.hossam-sharaf.webp' },

  // أنور علي أحمد حسن (ألماني/فرنسي) -> فصل اللغات
  { id: 'c8', name: { ar: 'أ. أنور علي أحمد', en: 'Mr. Anwar Ali' }, subject: { ar: 'اللغة الألمانية', en: 'German Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c9', name: { ar: 'أ. أنور علي أحمد', en: 'Mr. Anwar Ali' }, subject: { ar: 'اللغة الفرنسية', en: 'French Language' }, image: '/images/teachers/unknown.webp' },

  { id: 'c10', name: { ar: 'أ. دعاء عبد الفتاح حسين', en: 'Ms. Doaa Abdel Fattah' }, subject: { ar: 'اللغة الإيطالية', en: 'Italian Language' }, image: '/images/teachers/unknown.webp' },
  
  // اخصائي اجتماعي ونفسي ومكتبة واعلام
  { id: 'c11', name: { ar: 'أ. سيد علي مرسي', en: 'Mr. Sayed Ali Morsy' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: 'c12', name: { ar: 'أ. محمود فضل محمود', en: 'Mr. Mahmoud Fadl' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: 'c13', name: { ar: 'أ. عماد أحمد محمد الفقي', en: 'Mr. Emad Ahmed El-Feqy' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: 'c14', name: { ar: 'أ. ريمون سامي جاد الله', en: 'Mr. Remon Sany' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: 'c15', name: { ar: 'أ. علا علي فؤاد علي', en: 'Ms. Ola Ali Fouad' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: 'c16', name: { ar: 'أ. مصطفي أحمد محمد', en: 'Mr. Mostafa Ahmed' }, subject: { ar: 'اخصائي اعلام', en: 'Media Specialist' }, image: '/images/teachers/unknown.webp' },
  { id: 'c17', name: { ar: 'أ. جهاد حسن محمود', en: 'Ms. Jehad Hassan' }, subject: { ar: 'اخصائي مكتبة', en: 'Library Specialist' }, image: '/images/teachers/unknown.webp' },
  { id: 'c18', name: { ar: 'أ. ممدوح كمال حسن غنيم', en: 'Mr. Mamdouh Kamal' }, subject: { ar: 'اخصائي نفسي', en: 'Psychologist' }, image: '/images/teachers/unknown.webp' },
  { id: 'c19', name: { ar: 'أ. ياسر جمال شحاته', en: 'Mr. Yasser Gamal' }, subject: { ar: 'اخصائي نفسي', en: 'Psychologist' }, image: '/images/teachers/unknown.webp' },

  // التاريخ والجغرافيا
  { id: 'c20', name: { ar: 'أ. إبراهيم محمد حسن', en: 'Mr. Ibrahim Mohamed' }, subject: { ar: 'التاريخ', en: 'History' }, image: '/images/teachers/unknown.webp' },
  { id: 'c21', name: { ar: 'أ. محمد مبروك محمد', en: 'Mr. Mohamed Mabrouk' }, subject: { ar: 'جغرافيا', en: 'Geography' }, image: '/images/teachers/unknown.webp' },
  { id: 'c22', name: { ar: 'أ. مصطفي إبراهيم محمد', en: 'Mr. Mostafa Ibrahim' }, subject: { ar: 'جغرافيا', en: 'Geography' }, image: '/images/teachers/unknown.webp' },
  { id: 'c23', name: { ar: 'أ. سيد خلف عبد العظيم', en: 'Mr. Sayed Khalaf' }, subject: { ar: 'جغرافيا', en: 'Geography' }, image: '/images/teachers/unknown.webp' },
  { id: 'c51', name: { ar: 'أ. حسام عبد الجواد أحمد', en: 'Mr. Hossam Abdelgawad' }, subject: { ar: 'التاريخ', en: 'History' }, image: '/images/teachers/unknown.webp' },

  // التربية الرياضية، الفنية والموسيقية
  { id: 'c24', name: { ar: 'أ. محمد حسن محمد السيد', en: 'Mr. Mohamed Hassan' }, subject: { ar: 'التربية الرياضية', en: 'Physical Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c25', name: { ar: 'أ. محمود حسن محمود', en: 'Mr. Mahmoud Hassan' }, subject: { ar: 'التربية الرياضية', en: 'Physical Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c26', name: { ar: 'أ. محمد محمد أحمد محسن', en: 'Mr. Mohamed Ahmed Mohsen' }, subject: { ar: 'التربية الرياضية', en: 'Physical Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c27', name: { ar: 'أ. ايناس محمد محمود', en: 'Ms. Enas Mohamed' }, subject: { ar: 'التربية الفنية', en: 'Art Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c28', name: { ar: 'أ. سامية محمد الصغير', en: 'Ms. Samia Mohamed' }, subject: { ar: 'التربية الفنية', en: 'Art Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c29', name: { ar: 'أ. سماح محمد عبد المالك', en: 'Ms. Samah Mohamed' }, subject: { ar: 'التربية الفنية', en: 'Art Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c30', name: { ar: 'أ. نشوي محمود محمد', en: 'Ms. Nashwa Mahmoud' }, subject: { ar: 'التربية الفنية', en: 'Art Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c31', name: { ar: 'أ. مفيدة يوسف الجبروني', en: 'Ms. Mofida Youssef' }, subject: { ar: 'التربية الموسيقية', en: 'Music Education' }, image: '/images/teachers/unknown.webp' },

  // حاسب آلي (علوم الحاسوب)
  { id: 'c32', name: { ar: 'أ. خالد شعبان محمود', en: 'Mr. Khaled Shaban' }, subject: { ar: 'حاسب آلي', en: 'Computer Science' }, image: '/images/teachers/unknown.webp' },
  { id: 'c33', name: { ar: 'أ. تامر محمود صبري', en: 'Mr. Tamer Mahmoud' }, subject: { ar: 'حاسب آلي', en: 'Computer Science' }, image: '/images/teachers/unknown.webp' },
  { id: 'c34', name: { ar: 'أ. فاطمة الزهراء احمد', en: 'Ms. Fatma El-Zahraa Ahmed' }, subject: { ar: 'حاسب آلي', en: 'Computer Science' }, image: '/images/teachers/unknown.webp' },

  // الرياضيات
  { id: 'c35', name: { ar: 'أ. أحمد علي محمد مصطفي', en: 'Mr. Ahmed Ali' }, subject: { ar: 'رياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },
  { id: 'c36', name: { ar: 'أ. كمال أحمد الشيمي', en: 'Mr. Kamal El-Shaimy' }, subject: { ar: 'رياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },
  { id: 'c37', name: { ar: 'أ. كريم عبد الله أحمد علوان', en: 'Mr. Karim Abdullah' }, subject: { ar: 'رياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },
  { id: 'c38', name: { ar: 'أ. محمود طه عبد الخالق', en: 'Mr. Mahmoud Taha' }, subject: { ar: 'رياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },
  { id: 'c39', name: { ar: 'أ. سعد سعيد بسيوني', en: 'Mr. Saad Said Basyouni' }, subject: { ar: 'رياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },

  // زراعة ومجال صناعي
  { id: 'c40', name: { ar: 'أ. عمرو عبد المنعم رزق', en: 'Mr. Amr Abdel Moneim' }, subject: { ar: 'زراعة', en: 'Agricultural Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c41', name: { ar: 'أ. أماني عبد الرحمن محمود', en: 'Ms. Amany Abdel Rahman' }, subject: { ar: 'زراعة', en: 'Agricultural Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c42', name: { ar: 'أ. سلوي أبو اليزيد محمود', en: 'Ms. Salwa Abou El-Yazeed' }, subject: { ar: 'زراعة', en: 'Agricultural Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c43', name: { ar: 'أ. ميشيل منير بخيت', en: 'Mr. Michel Mounir' }, subject: { ar: 'مجال صناعي', en: 'Industrial Education' }, image: '/images/teachers/unknown.webp' },
  { id: 'c44', name: { ar: 'أ. حسين محمد عبد العزيز', en: 'Mr. Hussein Mohamed' }, subject: { ar: 'مجال صناعي', en: 'Industrial Education' }, image: '/images/teachers/unknown.webp' },

  // علم النفس
  { id: 'c45', name: { ar: 'أ. عزه عبد الفتاح', en: 'Ms. Azza Abdel Fattah' }, subject: { ar: 'علم نفس', en: 'Psychology' }, image: '/images/teachers/unknown.webp' },
  { id: 'c46', name: { ar: 'أ. nasser علام عبود نصار', en: 'Mr. Nasser Allam' }, subject: { ar: 'علم نفس', en: 'Psychology' }, image: '/images/teachers/unknown.webp' },
  { id: 'c47', name: { ar: 'أ. أحمد البدوي عبد الله', en: 'Mr. Ahmed El-Badawy' }, subject: { ar: 'علم نفس', en: 'Psychology' }, image: '/images/teachers/unknown.webp' },

  // مادة العلوم والفيزياء
  { id: 'c48', name: { ar: 'أ. سامح صقر', en: 'Mr. Sameh Saqr' }, subject: { ar: 'علوم', en: 'Sciences' }, image: '/images/teachers/mr.sameh-saqr.webp' },
  { id: 'c49', name: { ar: 'أ. فوزي صدقي صليب بخيت', en: 'Mr. Fawzy Sedky' }, subject: { ar: 'علوم', en: 'Sciences' }, image: '/images/teachers/unknown.webp' },
  { id: 'c50', name: { ar: 'أ. كريمة علي حسن سعد', en: 'Ms. Karima Ali Hassan' }, subject: { ar: 'علوم', en: 'Sciences' }, image: '/images/teachers/unknown.webp' },
  { id: 'c52', name: { ar: 'أ. طارق إبراهيم محمود', en: 'Mr. Tarek Ibrahim' }, subject: { ar: 'فيزياء', en: 'Physics' }, image: '/images/teachers/unknown.webp' },

  // حسين عبد الحميد الفاوي (فرنسي/أسباني) -> فصل اللغات
  { id: 'c53', name: { ar: 'أ. حسين عبد الحميد الفاوي', en: 'Mr. Hussein El-Fawy' }, subject: { ar: 'فرنسي', en: 'French Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c54', name: { ar: 'أ. حسين عبد الحميد الفاوي', en: 'Mr. Hussein El-Fawy' }, subject: { ar: 'أسباني', en: 'Spanish Language' }, image: '/images/teachers/unknown.webp' },

  // أسامه حسن حافظ أبو العلا (فرنسي/أسباني) -> فصل اللغات
  { id: 'c55', name: { ar: 'أ. أسامه حسن حافظ', en: 'Mr. Osama Hassan' }, subject: { ar: 'فرنسي', en: 'French Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c56', name: { ar: 'أ. أسامه حسن حافظ', en: 'Mr. Osama Hassan' }, subject: { ar: 'أسباني', en: 'Spanish Language' }, image: '/images/teachers/unknown.webp' },

  // الفلسفة
  { id: 'c57', name: { ar: 'أ. سيد منصور جمعة', en: 'Mr. Sayed Mansour' }, subject: { ar: 'فلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: 'c58', name: { ar: 'أ. عبد الجواد صبحي', en: 'Mr. Abdelgawad Sobhy' }, subject: { ar: 'فلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: 'c59', name: { ar: 'أ. رمضان محمد عبد الفتاح', en: 'Mr. Ramadan Mohamed' }, subject: { ar: 'فلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: 'c60', name: { ar: 'أ. سامح توفيق عبد الحميد', en: 'Mr. Sameh Taufik' }, subject: { ar: 'فلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: 'c61', name: { ar: 'أ. عصام محمد علي محمد', en: 'Mr. Essam Mohamed' }, subject: { ar: 'فلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: 'c62', name: { ar: 'أ. سالم عبد المجيد سالم', en: 'Mr. Salem Abdel Majeed' }, subject: { ar: 'فلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },

  // اللغة الإنجليزية
  { id: 'c63', name: { ar: 'أ. أحمد حسن عبد السميع', en: 'Mr. Ahmed Hassan' }, subject: { ar: 'لغة إنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c64', name: { ar: 'أ. محمد سمير محمد علي', en: 'Mr. Mohamed Samir' }, subject: { ar: 'لغة إنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c65', name: { ar: 'أ. سيف الدين حسن إبراهيم', en: 'Mr. Saif El-Din Hassan' }, subject: { ar: 'لغة إنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c66', name: { ar: 'أ. ناصر سعيد حسين عمارة', en: 'Mr. Nasser Amara' }, subject: { ar: 'لغة إنجليزية', en: 'English Language' }, image: '/images/teachers/mr.nasser-amara.webp' },
  { id: 'c67', name: { ar: 'أ. محمد محمد أحمد محفوظ', en: 'Mr. Mohamed Mahfouz' }, subject: { ar: 'لغة إنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c68', name: { ar: 'أ. خالد رشاد عبد العزيز', en: 'Mr. Khaled Rashad' }, subject: { ar: 'لغة إنجليزية', en: 'English Language' }, image: '/images/teachers/mr.khaled-rashad.webp' },
  { id: 'c69', name: { ar: 'أ. عادل عبد العظيم', en: 'Mr. Adel Abdelazim' }, subject: { ar: 'لغة إنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c70', name: { ar: 'أ. مني زكريا فارس', en: 'Ms. Mona Zakaria' }, subject: { ar: 'لغة إنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },

  // اللغة العربية
  { id: 'c71', name: { ar: 'أ. طارق عبد الهادي محمد', en: 'Mr. Tarek Abdel Hady' }, subject: { ar: 'لغة عربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c72', name: { ar: 'أ. أحمد فاروق محمد سيد', en: 'Mr. Ahmed Farouk' }, subject: { ar: 'لغة عربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c73', name: { ar: 'أ. ياسر عبد العظيم أحمد', en: 'Mr. Yasser Abdelazim' }, subject: { ar: 'لغة عربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c74', name: { ar: 'أ. ياسر حسين إبراهيم', en: 'Mr. Yasser Hussein' }, subject: { ar: 'لغة عربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c75', name: { ar: 'أ. راضي عبده السيد الصيفي', en: 'Mr. Rady Abda El-Saifi' }, subject: { ar: 'لغة عربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c76', name: { ar: 'أ. حسين إبراهيم شلقامي', en: 'Mr. Hussein Ibrahim' }, subject: { ar: 'لغة عربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c77', name: { ar: 'أ. مها علي قاسم أحمد', en: 'Ms. Maha Ali Qasim' }, subject: { ar: 'لغة عربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: 'c78', name: { ar: 'أ. أشرف عبد العزيز أحمد', en: 'Mr. Ashraf Abdel Aziz' }, subject: { ar: 'لغة عربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' }
];