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
  { id: '1',  name: { ar: 'أ.أسماء',                  en: 'Ms. Asmaa'                  }, subject: { ar: 'مديرة المدرسة',       en: 'School Principal'       }, image: '/images/teachers/ms.asmaa.jpg' },
  { id: '2',  name: { ar: 'أ. طارق سنجر',              en: 'Mr. Tarek Singer'            }, subject: { ar: 'اللغة العربية',       en: 'Arabic Language'         }, image: '/images/teachers/mr.tarek-singer.jpg' },
  { id: '3',  name: { ar: 'أ. أحمد طارق',              en: 'Mr. Ahmed Tarek'             }, subject: { ar: 'اللغة العربية',       en: 'Arabic Language'         }, image: '/images/teachers/unknown.jpg' },
  { id: '4',  name: { ar: 'أ. ياسر حسين',              en: 'Mr. Yasser Hussein'          }, subject: { ar: 'اللغة العربية',       en: 'Arabic Language'         }, image: '/images/teachers/unknown.jpg' },
  { id: '5',  name: { ar: 'أ. ياسر عبدالعظيم',         en: 'Mr. Yasser Abdelazim'        }, subject: { ar: 'اللغة العربية',       en: 'Arabic Language'         }, image: '/images/teachers/unknown.jpg' },
  { id: '6',  name: { ar: 'أ. راضي عبده الصيفي',       en: 'Mr. Rady Abda El-Saifi'      }, subject: { ar: 'اللغة العربية',       en: 'Arabic Language'         }, image: '/images/teachers/unknown.jpg' },
  { id: '7',  name: { ar: 'أ. ناصر عماره',             en: 'Mr. Nasser Amara'            }, subject: { ar: 'اللغة الإنجليزية',   en: 'English Language'        }, image: '/images/teachers/mr.nasser-amara.png' },
  { id: '8',  name: { ar: 'أ. عادل عبدالعظيم',         en: 'Mr. Adel Abdelazim'          }, subject: { ar: 'اللغة الإنجليزية',   en: 'English Language'        }, image: '/images/teachers/unknown.jpg' },
  { id: '9',  name: { ar: 'أ. خالد رشاد',              en: 'Mr. Khaled Rashad'           }, subject: { ar: 'اللغة الإنجليزية',   en: 'English Language'        }, image: '/images/teachers/mr.khaled-rashad.jpg' },
  { id: '10', name: { ar: 'أ. سيف الدين حسن',          en: 'Mr. Saif El-Din Hassan'      }, subject: { ar: 'اللغة الإنجليزية',   en: 'English Language'        }, image: '/images/teachers/unknown.jpg' },
  { id: '11', name: { ar: 'أ. محمد محفوظ',             en: 'Mr. Mohamed Mahfouz'         }, subject: { ar: 'اللغة الإنجليزية',   en: 'English Language'        }, image: '/images/teachers/unknown.jpg' },
  { id: '12', name: { ar: 'أ. أحمد حسن',               en: 'Mr. Ahmed Hassan'            }, subject: { ar: 'اللغة الإنجليزية',   en: 'English Language'        }, image: '/images/teachers/unknown.jpg' },
  { id: '13', name: { ar: 'أ. محمد سمير',              en: 'Mr. Mohamed Samir'           }, subject: { ar: 'اللغة الإنجليزية',   en: 'English Language'        }, image: '/images/teachers/unknown.jpg' },
  { id: '14', name: { ar: 'أ. مني زكريا',              en: 'Ms. Mona Zakaria'            }, subject: { ar: 'اللغة الإنجليزية',   en: 'English Language'        }, image: '/images/teachers/unknown.jpg' },
  { id: '15', name: { ar: 'أ. أحمد علي',               en: 'Mr. Ahmed Ali'               }, subject: { ar: 'الرياضيات',          en: 'Mathematics'             }, image: '/images/teachers/unknown.jpg' },
  { id: '16', name: { ar: 'أ. محمود طه',               en: 'Mr. Mahmoud Taha'            }, subject: { ar: 'الرياضيات',          en: 'Mathematics'             }, image: '/images/teachers/mr.mahmoud-taha.jpg' },
  { id: '17', name: { ar: 'أ. كمال الشيمي',            en: 'Mr. Kamal El-Shaimy'         }, subject: { ar: 'الرياضيات',          en: 'Mathematics'             }, image: '/images/teachers/unknown.jpg' },
  { id: '18', name: { ar: 'أ. كريم عبدالله',           en: 'Mr. Karim Abdullah'          }, subject: { ar: 'الرياضيات',          en: 'Mathematics'             }, image: '/images/teachers/unknown.jpg' },
  { id: '19', name: { ar: 'أ. سامح صقر',               en: 'Mr. Sameh Saqr'              }, subject: { ar: 'العلوم المتكاملة',   en: 'Integrated Sciences'     }, image: '/images/teachers/mr.sameh-saqr.jpg' },
  { id: '20', name: { ar: 'أ. سامح صقر',               en: 'Mr. Sameh Saqr'              }, subject: { ar: 'الفيزياء',           en: 'Physics'                 }, image: '/images/teachers/mr.sameh-saqr.jpg' },
  { id: '21', name: { ar: 'أ. فوزي صدقي',              en: 'Mr. Fawzy Sedky'             }, subject: { ar: 'الكيمياء',           en: 'Chemistry'               }, image: '/images/teachers/mr.fawzy-sedky.jpg' },
  { id: '22', name: { ar: '',                           en: ''                            }, subject: { ar: 'الأحياء',            en: 'Biology'                 }, image: '/images/teachers/unknown.jpg' },
  { id: '23', name: { ar: 'أ. حسام عبدالجواد',         en: 'Mr. Hossam Abdelgawad'       }, subject: { ar: 'التاريخ',            en: 'History'                 }, image: '/images/teachers/mr.hossam-abdelgawad.png' },
  { id: '24', name: { ar: 'أ. ابراهيم حسن',            en: 'Mr. Ibrahim Hassan'          }, subject: { ar: 'التاريخ',            en: 'History'                 }, image: '/images/teachers/unknown.jpg' },
  { id: '25', name: { ar: '',                           en: ''                            }, subject: { ar: 'الجغرافيا',          en: 'Geography'               }, image: '/images/teachers/unknown.jpg' },
  { id: '26', name: { ar: 'أ. عصام الكاشف',            en: 'Mr. Essam El-Kashef'         }, subject: { ar: 'الفلسفة',            en: 'Philosophy'              }, image: '/images/teachers/mr.essam-el-kashef.jpg' },
  { id: '27', name: { ar: 'أ. عبدالجواد افندينا',       en: 'Mr. Abdelgawad Afandina'     }, subject: { ar: 'الفلسفة',            en: 'Philosophy'              }, image: '/images/teachers/mr.abdelgawad-afandina.png' },
  { id: '28', name: { ar: 'أ. عصام الكاشف',            en: 'Mr. Essam El-Kashef'         }, subject: { ar: 'علم النفس',          en: 'Psychology'              }, image: '/images/teachers/mr.essam-el-kashef.jpg' },
  { id: '29', name: { ar: 'أ. عبدالجواد افندينا',       en: 'Mr. Abdelgawad Afandina'     }, subject: { ar: 'علم النفس',          en: 'Psychology'              }, image: '/images/teachers/mr.abdelgawad-afandina.png' },
  { id: '30', name: { ar: '',                           en: ''                            }, subject: { ar: 'علوم الحاسوب',       en: 'Computer Science'        }, image: '/images/teachers/unknown.jpg' },
  { id: '31', name: { ar: 'أ. محمد السيد',             en: 'Mr. Mohamed El-Sayed'        }, subject: { ar: 'اللغة الألمانية',    en: 'German Language'         }, image: '/images/teachers/mr.mohamed-el-sayed.jpg' },
  { id: '32', name: { ar: 'أ. حسام شرف',               en: 'Mr. Hossam Sharaf'           }, subject: { ar: 'اللغة الألمانية',    en: 'German Language'         }, image: '/images/teachers/mr.hossam-sharaf.jpg' },
  { id: '33', name: { ar: 'أ. أنور أحمد علي',          en: 'Mr. Anwar Ahmed Ali'         }, subject: { ar: 'اللغة الفرنسية',    en: 'French Language'         }, image: '/images/teachers/unknown.jpg' },
  { id: '34', name: { ar: 'أ. حسين عبد الحميد',        en: 'Mr. Hussein Abdel Hamid'     }, subject: { ar: 'اللغة الفرنسية',    en: 'French Language'         }, image: '/images/teachers/unknown.jpg' },
  { id: '35', name: { ar: 'أ. دعاء عبدالفتاح',         en: 'Ms. Doaa Abdel Fattah'       }, subject: { ar: 'اللغة الإيطالية',   en: 'Italian Language'        }, image: '/images/teachers/unknown.jpg' },
  { id: '36', name: { ar: '',                           en: ''                            }, subject: { ar: 'اللغة الإسبانية',   en: 'Spanish Language'        }, image: '/images/teachers/unknown.jpg' },
  { id: '37', name: { ar: '',                           en: ''                            }, subject: { ar: 'التربية الزراعية',  en: 'Agricultural Education'  }, image: '/images/teachers/unknown.jpg' },
  { id: '38', name: { ar: '',                           en: ''                            }, subject: { ar: 'التربية الصناعية',  en: 'Industrial Education'    }, image: '/images/teachers/unknown.jpg' },
  { id: '39', name: { ar: '',                           en: ''                            }, subject: { ar: 'التربية الرياضية',  en: 'Physical Education'      }, image: '/images/teachers/unknown.jpg' },
  { id: '40', name: { ar: '',                           en: ''                            }, subject: { ar: 'التربية العسكرية',  en: 'Military Education'      }, image: '/images/teachers/unknown.jpg' },
  { id: '41', name: { ar: '',                           en: ''                            }, subject: { ar: 'التربية الفنية',    en: 'Art Education'           }, image: '/images/teachers/unknown.jpg' },
  { id: '42', name: { ar: 'أ. طارق سنجر',              en: 'Mr. Tarek Singer'            }, subject: { ar: 'التربية الدينية',   en: 'Religious Education'     }, image: '/images/teachers/mr.tarek-singer.jpg' },
  { id: '43', name: { ar: 'أ. فاطمة الزهراء كامل',     en: 'Ms. Fatma El-Zahraa Kamel'  }, subject: { ar: 'إدارة المكتبة',     en: 'Library Management'      }, image: '/images/teachers/ms.fatma-el-zahraa-kamel.jpg' },
];