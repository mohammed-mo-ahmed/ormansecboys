export const ROUTES = {
  home: '/',
  news: '/news',
  gallery: '/gallery',
  contact: '/contact',
  faq: '/faq',
  resources: '/resources',
  alumni: '/alumni',
  about: {
    overview:     '/overview',
    vision:   '/vision',
    history:  '/history',
    teachers: '/teachers',
  },
  activities: {
    clubs:        '/clubs',
    competitions: '/competitions',
    library:      '/library',
    achievements: '/achievements',
    studentUnion: '/student-union',
  },
  auth: {
    login:          '/login',
    forgotPassword: '/forgot-password',
  },
  dashboard: {
    student: '/student',
    teacher: '/teacher',
    admin:   '/admin',
  },
} as const;

export interface NavigationItem {
  id: string;
  path?: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'about',
    children: [
      { id: 'overview',  path: ROUTES.about.overview     },
      { id: 'vision',    path: ROUTES.about.vision   },
      { id: 'history',   path: ROUTES.about.history  },
      { id: 'teachers',  path: ROUTES.about.teachers },
    ],
  },
  {
    id: 'activities',
    children: [
      { id: 'student-union', path: ROUTES.activities.studentUnion  },
      { id: 'clubs',         path: ROUTES.activities.clubs         },
      { id: 'competitions',  path: ROUTES.activities.competitions  },
      { id: 'library',       path: ROUTES.activities.library       },
      { id: 'achievements',  path: ROUTES.activities.achievements  },
    ],
  },
  { id: 'resources', path: ROUTES.resources },
  { id: 'news',      path: ROUTES.news      },
  { id: 'gallery',   path: ROUTES.gallery   },
  { id: 'alumni',    path: ROUTES.alumni    },
  { id: 'faq',       path: ROUTES.faq       },
  { id: 'contact',   path: ROUTES.contact   },
];