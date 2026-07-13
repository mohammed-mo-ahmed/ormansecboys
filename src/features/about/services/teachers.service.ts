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
export const getTeachers = async (): Promise<Teacher[]> => [
  { id: '1',  name: { ar: 'أ. أسماء إسماعيل', en: 'Ms. Asmaa Esmail' }, subject: { ar: 'مديرة المدرسة', en: 'School Principal' }, image: '/images/teachers/ms.asmaa-esmail.webp' },

  // اللغة العربية
  { id: '2',  name: { ar: 'أ. طارق سنجر', en: 'Mr. Tarek Singer' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/mr.tarek-singer.webp' },
  { id: '3',  name: { ar: 'أ. أحمد فاروق محمد', en: 'Mr. Ahmed Farouk' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: '4',  name: { ar: 'أ. ياسر حسين', en: 'Mr. Yasser Hussein' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: '5',  name: { ar: 'أ. ياسر عبدالعظيم', en: 'Mr. Yasser Abdelazim' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: '6',  name: { ar: 'أ. راضي عبده الصيفي', en: 'Mr. Rady Abda El-Saifi' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: '44', name: { ar: 'أ. طارق عبد الهادي', en: 'Mr. Tarek Abdel Hady' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: '45', name: { ar: 'أ. حسين إبراهيم شلقامي', en: 'Mr. Hussein Ibrahim' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: '46', name: { ar: 'أ. مها علي قاسم', en: 'Ms. Maha Ali Qasim' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },
  { id: '47', name: { ar: 'أ. أشرف عبد العزيز', en: 'Mr. Ashraf Abdel Aziz' }, subject: { ar: 'اللغة العربية', en: 'Arabic Language' }, image: '/images/teachers/unknown.webp' },

  // اللغة الإنجليزية
  { id: '7',  name: { ar: 'أ. ناصر عماره', en: 'Mr. Nasser Amara' }, subject: { ar: 'اللغة الإنجليزية', en: 'English Language' }, image: '/images/teachers/mr.nasser-amara.webp' },
  { id: '8',  name: { ar: 'أ. عادل عبدالعظيم', en: 'Mr. Adel Abdelazim' }, subject: { ar: 'اللغة الإنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: '9',  name: { ar: 'أ. خالد رشاد', en: 'Mr. Khaled Rashad' }, subject: { ar: 'اللغة الإنجليزية', en: 'English Language' }, image: '/images/teachers/mr.khaled-rashad.webp' },
  { id: '10', name: { ar: 'أ. سيف الدين حسن', en: 'Mr. Saif El-Din Hassan' }, subject: { ar: 'اللغة الإنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: '11', name: { ar: 'أ. محمد محفوظ', en: 'Mr. Mohamed Mahfouz' }, subject: { ar: 'اللغة الإنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: '12', name: { ar: 'أ. أحمد حسن', en: 'Mr. Ahmed Hassan' }, subject: { ar: 'اللغة الإنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: '13', name: { ar: 'أ. محمد سمير', en: 'Mr. Mohamed Samir' }, subject: { ar: 'اللغة الإنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },
  { id: '14', name: { ar: 'أ. مني زكريا', en: 'Ms. Mona Zakaria' }, subject: { ar: 'اللغة الإنجليزية', en: 'English Language' }, image: '/images/teachers/unknown.webp' },

  // الرياضيات
  { id: '15', name: { ar: 'أ. أحمد علي', en: 'Mr. Ahmed Ali' }, subject: { ar: 'الرياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },
  { id: '16', name: { ar: 'أ. محمود طه', en: 'Mr. Mahmoud Taha' }, subject: { ar: 'الرياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },
  { id: '17', name: { ar: 'أ. كمال الشيمي', en: 'Mr. Kamal El-Shaimy' }, subject: { ar: 'الرياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },
  { id: '48', name: { ar: 'أ. سعد سعيد بسيوني', en: 'Mr. Saad Said Basyouni' }, subject: { ar: 'الرياضيات', en: 'Mathematics' }, image: '/images/teachers/unknown.webp' },

  // العلوم والفيزياء والكيمياء والأحياء
  { id: '18', name: { ar: 'أ. كريم عبدالله', en: 'Mr. Karim Abdullah' }, subject: { ar: 'العلوم', en: 'Sciences' }, image: '/images/teachers/unknown.webp' },
  { id: '19', name: { ar: 'أ. سامح صقر', en: 'Mr. Sameh Saqr' }, subject: { ar: 'العلوم المتكاملة', en: 'Integrated Sciences' }, image: '/images/teachers/mr.sameh-saqr.webp' },
  { id: '20', name: { ar: 'أ. سامح صقر', en: 'Mr. Sameh Saqr' }, subject: { ar: 'الفيزياء', en: 'Physics' }, image: '/images/teachers/mr.sameh-saqr.webp' },
  { id: '49', name: { ar: 'أ. طارق إبراهيم محمود', en: 'Mr. Tarek Ibrahim' }, subject: { ar: 'الفيزياء', en: 'Physics' }, image: '/images/teachers/unknown.webp' },
  { id: '21', name: { ar: 'أ. فوزي صدقي', en: 'Mr. Fawzy Sedky' }, subject: { ar: 'الكيمياء', en: 'Chemistry' }, image: '/images/teachers/unknown.webp' },
  { id: '50', name: { ar: 'أ. سامج صابر بختان', en: 'Mr. Sameh Saber' }, subject: { ar: 'العلوم', en: 'Sciences' }, image: '/images/teachers/unknown.webp' },
  { id: '51', name: { ar: 'أ. كريمة علي حسن', en: 'Ms. Karima Ali Hassan' }, subject: { ar: 'العلوم', en: 'Sciences' }, image: '/images/teachers/unknown.webp' },
  { id: '22', name: { ar: 'أ. حسام عبد الجواد أحمد', en: 'Mr. Hossam Abdelgawad' }, subject: { ar: 'الأحياء', en: 'Biology' }, image: '/images/teachers/unknown.webp' },

  // التاريخ والجغرافيا
  { id: '23', name: { ar: 'أ. حسام عبدالجواد', en: 'Mr. Hossam Abdelgawad' }, subject: { ar: 'التاريخ', en: 'History' }, image: '/images/teachers/mr.hossam-abdelgawad.webp' },
  { id: '24', name: { ar: 'أ. ابراهيم حسن', en: 'Mr. Ibrahim Hassan' }, subject: { ar: 'التاريخ', en: 'History' }, image: '/images/teachers/unknown.webp' },
  { id: '52', name: { ar: 'أ. محمد مبروك محمد', en: 'Mr. Mohamed Mabrouk' }, subject: { ar: 'التاريخ', en: 'History' }, image: '/images/teachers/unknown.webp' },
  { id: '25', name: { ar: 'أ. مصطفي إبراهيم سعيد', en: 'Mr. Mostafa Ibrahim' }, subject: { ar: 'الجغرافيا', en: 'Geography' }, image: '/images/teachers/unknown.webp' },
  { id: '53', name: { ar: 'أ. سيد خلف عبد العظيم', en: 'Mr. Sayed Khalaf' }, subject: { ar: 'الجغرافيا', en: 'Geography' }, image: '/images/teachers/unknown.webp' },

  // الفلسفة وعلم النفس
  { id: '26', name: { ar: 'أ. عصام الكاشف', en: 'Mr. Essam El-Kashef' }, subject: { ar: 'الفلسفة', en: 'Philosophy' }, image: '/images/teachers/mr.essam-el-kashef.webp' },
  { id: '27', name: { ar: 'أ. عبدالجواد افندينا', en: 'Mr. Abdelgawad Afandina' }, subject: { ar: 'الفلسفة', en: 'Philosophy' }, image: '/images/teachers/mr.abdelgawad-afandina.webp' },
  { id: '54', name: { ar: 'أ. سيد منصور جمعة', en: 'Mr. Sayed Mansour' }, subject: { ar: 'الفلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: '55', name: { ar: 'أ. رمضان محمد عبد الفتاح', en: 'Mr. Ramadan Mohamed' }, subject: { ar: 'الفلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: '56', name: { ar: 'أ. سامح توفيق عبد الحميد', en: 'Mr. Sameh Taufik' }, subject: { ar: 'الفلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: '57', name: { ar: 'أ. عصام محمد علي', en: 'Mr. Essam Mohamed' }, subject: { ar: 'الفلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: '58', name: { ar: 'أ. سالم عبد المجيد سالم', en: 'Mr. Salem Abdel Majeed' }, subject: { ar: 'الفلسفة', en: 'Philosophy' }, image: '/images/teachers/unknown.webp' },
  { id: '28', name: { ar: 'أ. عصام الكاشف', en: 'Mr. Essam El-Kashef' }, subject: { ar: 'علم النفس', en: 'Psychology' }, image: '/images/teachers/mr.essam-el-kashef.webp' },
  { id: '29', name: { ar: 'أ. عبدالجواد افندينا', en: 'Mr. Abdelgawad Afandina' }, subject: { ar: 'علم النفس', en: 'Psychology' }, image: '/images/teachers/mr.abdelgawad-afandina.webp' },
  { id: '59', name: { ar: 'أ. عزه عبد الفتاح', en: 'Ms. Azza Abdel Fattah' }, subject: { ar: 'علم النفس', en: 'Psychology' }, image: '/images/teachers/unknown.webp' },
  { id: '60', name: { ar: 'أ. ناصر علام عبود', en: 'Mr. Nasser Allam' }, subject: { ar: 'علم النفس', en: 'Psychology' }, image: '/images/teachers/unknown.webp' },
  { id: '61', name: { ar: 'أ. أحمد البدوي عبد الله', en: 'Mr. Ahmed El-Badawy' }, subject: { ar: 'علم النفس', en: 'Psychology' }, image: '/images/teachers/unknown.webp' },

  // علوم الحاسوب والتكنولوجيا
  { id: '30', name: { ar: 'أ. خالد شعبان محمود', en: 'Mr. Khaled Shaban' }, subject: { ar: 'علوم الحاسوب', en: 'Computer Science' }, image: '/images/teachers/unknown.webp' },
  { id: '62', name: { ar: 'أ. تامر محمود صبري', en: 'Mr. Tamer Mahmoud' }, subject: { ar: 'حاسب آلي', en: 'Computer Science' }, image: '/images/teachers/unknown.webp' },
  { id: '63', name: { ar: 'أ. فاطمة الزهراء احمد', en: 'Ms. Fatma El-Zahraa Ahmed' }, subject: { ar: 'حاسب آلي', en: 'Computer Science' }, image: '/images/teachers/unknown.webp' },

  // اللغات الأجنبية الثانية
  { id: '31', name: { ar: 'أ. محمد السيد', en: 'Mr. Mohamed El-Sayed' }, subject: { ar: 'اللغة الألمانية', en: 'German Language' }, image: '/images/teachers/mr.mohamed-el-sayed.webp' },
  { id: '32', name: { ar: 'أ. حسام شرف', en: 'Mr. Hossam Sharaf' }, subject: { ar: 'اللغة الألمانية', en: 'German Language' }, image: '/images/teachers/mr.hossam-sharaf.webp' },
  { id: '64', name: { ar: 'أ. منتصر محمد عبد الجواد', en: 'Mr. Montaser Mohamed' }, subject: { ar: 'اللغة الألمانية/الفرنسية', en: 'German/French' }, image: '/images/teachers/unknown.webp' },
  { id: '33', name: { ar: 'أ. أنور أحمد علي', en: 'Mr. Anwar Ahmed Ali' }, subject: { ar: 'اللغة الفرنسية', en: 'French Language' }, image: '/images/teachers/unknown.webp' },
  { id: '34', name: { ar: 'أ. حسين عبد الحميد', en: 'Mr. Hussein Abdel Hamid' }, subject: { ar: 'اللغة الفرنسية', en: 'French Language' }, image: '/images/teachers/unknown.webp' },
  { id: '65', name: { ar: 'أ. أسامه حسن حافظ', en: 'Mr. Osama Hassan' }, subject: { ar: 'فرنسي/أسباني', en: 'French/Spanish' }, image: '/images/teachers/unknown.webp' },
  { id: '35', name: { ar: 'أ. دعاء عبدالفتاح', en: 'Ms. Doaa Abdel Fattah' }, subject: { ar: 'اللغة الإيطالية', en: 'Italian Language' }, image: '/images/teachers/unknown.webp' },
  { id: '36', name: { ar: 'أ. حسين عبد الحميد الفاوي', en: 'Mr. Hussein El-Fawy' }, subject: { ar: 'اللغة الإسبانية', en: 'Spanish Language' }, image: '/images/teachers/unknown.webp' },

  // الأنشطة والتربية (زراعي، صناعي، رياضي، فني، موسيقي)
  { id: '37', name: { ar: 'أ. عمرو عبد المنعم رزق', en: 'Mr. Amr Abdel Moneim' }, subject: { ar: 'التربية الزراعية', en: 'Agricultural Education' }, image: '/images/teachers/unknown.webp' },
  { id: '66', name: { ar: 'أ. أماني عبد الرحمن محمود', en: 'Ms. Amany Abdel Rahman' }, subject: { ar: 'التربية الزراعية', en: 'Agricultural Education' }, image: '/images/teachers/unknown.webp' },
  { id: '67', name: { ar: 'أ. سلوي أبو اليزيد محمود', en: 'Ms. Salwa Abou El-Yazeed' }, subject: { ar: 'التربية الزراعية', en: 'Agricultural Education' }, image: '/images/teachers/unknown.webp' },
  
  { id: '38', name: { ar: 'أ. ميشيل منير بخيت', en: 'Mr. Michel Mounir' }, subject: { ar: 'التربية الصناعية', en: 'Industrial Education' }, image: '/images/teachers/unknown.webp' },
  { id: '68', name: { ar: 'أ. حسين محمد عبد العزيز', en: 'Mr. Hussein Mohamed' }, subject: { ar: 'التربية الصناعية', en: 'Industrial Education' }, image: '/images/teachers/unknown.webp' },

  { id: '39', name: { ar: 'أ. محمد حسن محمد السيد', en: 'Mr. Mohamed Hassan' }, subject: { ar: 'التربية الرياضية', en: 'Physical Education' }, image: '/images/teachers/unknown.webp' },
  { id: '69', name: { ar: 'أ. محمود حسن محمود', en: 'Mr. Mahmoud Hassan' }, subject: { ar: 'التربية الرياضية', en: 'Physical Education' }, image: '/images/teachers/unknown.webp' },
  { id: '70', name: { ar: 'أ. محمد محمد أحمد محسن', en: 'Mr. Mohamed Ahmed Mohsen' }, subject: { ar: 'التربية الرياضية', en: 'Physical Education' }, image: '/images/teachers/unknown.webp' },
  
  { id: '40', name: { ar: '', en: '' }, subject: { ar: 'التربية العسكرية', en: 'Military Education' }, image: '/images/teachers/unknown.webp' },
  
  { id: '41', name: { ar: 'أ. ايناس محمد محمود', en: 'Ms. Enas Mohamed' }, subject: { ar: 'التربية الفنية', en: 'Art Education' }, image: '/images/teachers/unknown.webp' },
  { id: '71', name: { ar: 'أ. سامية محمد الصغير', en: 'Ms. Samia Mohamed' }, subject: { ar: 'التربية الفنية', en: 'Art Education' }, image: '/images/teachers/unknown.webp' },
  { id: '72', name: { ar: 'أ. سماح محمد عبد المالك', en: 'Ms. Samah Mohamed' }, subject: { ar: 'التربية الفنية', en: 'Art Education' }, image: '/images/teachers/unknown.webp' },
  { id: '73', name: { ar: 'أ. نشوي محمود محمد', en: 'Ms. Nashwa Mahmoud' }, subject: { ar: 'التربية الفنية', en: 'Art Education' }, image: '/images/teachers/unknown.webp' },

  { id: '74', name: { ar: 'أ. مفيدة يوسف الجبروني', en: 'Ms. Mofida Youssef' }, subject: { ar: 'التربية الموسيقية', en: 'Music Education' }, image: '/images/teachers/unknown.webp' },

  // الإخصائيين والإدارة والخدمات
  { id: '42', name: { ar: 'أ. طارق سنجر', en: 'Mr. Tarek Singer' }, subject: { ar: 'التربية الدينية', en: 'Religious Education' }, image: '/images/teachers/mr.tarek-singer.webp' },
  { id: '43', name: { ar: 'أ. فاطمة الزهراء كامل', en: 'Ms. Fatma El-Zahraa Kamel' }, subject: { ar: 'إدارة المكتبة', en: 'Library Management' }, image: '/images/teachers/unknown.webp' },
  { id: '75', name: { ar: 'أ. جهاد حسن محمود', en: 'Ms. Jehad Hassan' }, subject: { ar: 'اخصائي مكتبة', en: 'Library Specialist' }, image: '/images/teachers/unknown.webp' },
  
  { id: '76', name: { ar: 'أ. سيد علي مرسي', en: 'Mr. Sayed Ali Morsy' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: '77', name: { ar: 'أ. محمود فضل محمود', en: 'Mr. Mahmoud Fadl' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: '78', name: { ar: 'أ. عماد أحمد محمد الفقي', en: 'Mr. Emad Ahmed El-Feqy' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: '79', name: { ar: 'أ. ريمون سامي جاد الله', en: 'Mr. Remon Sany' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },
  { id: '80', name: { ar: 'أ. علا علي فؤاد علي', en: 'Ms. Ola Ali Fouad' }, subject: { ar: 'اخصائي اجتماعي', en: 'Social Worker' }, image: '/images/teachers/unknown.webp' },

  { id: '81', name: { ar: 'أ. مصطفي أحمد محمد', en: 'Mr. Mostafa Ahmed' }, subject: { ar: 'اخصائي اعلام', en: 'Media Specialist' }, image: '/images/teachers/unknown.webp' },

  { id: '82', name: { ar: 'أ. ممدوح كمال حسن غنيم', en: 'Mr. Mamdouh Kamal' }, subject: { ar: 'اخصائي نفسي', en: 'Psychologist' }, image: '/images/teachers/unknown.webp' },
  { id: '83', name: { ar: 'أ. ياسر جمال شحاته', en: 'Mr. Yasser Gamal' }, subject: { ar: 'اخصائي نفسي', en: 'Psychologist' }, image: '/images/teachers/unknown.webp' }
];