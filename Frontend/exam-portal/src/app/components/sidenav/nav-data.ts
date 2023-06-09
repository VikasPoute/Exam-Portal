import { INavbarData } from './helper';

export const beforeLoginData: INavbarData[] = [
  {
    routeLink: '/',
    icon: 'home',
    label: 'Home',
  },
  {
    routeLink: 'signup',
    icon: 'person_add',
    label: 'Sign Up',
    open: true,
  },
  {
    routeLink: 'login',
    icon: 'login',
    label: 'Login',
  },
];

export const afterLoginData: INavbarData[] = [
  {
    routeLink: '',
    icon: 'logout',
    label: 'Log Out',
  },
];

export const adminLoginData: INavbarData[] = [
  {
    routeLink: '/admin',
    icon: 'home',
    label: 'Home',
  },
  {
    routeLink: '/admin/categories',
    icon: 'category',
    label: 'Categories',
  },
  {
    routeLink: '/admin/add-category',
    icon: 'playlist_add_circle',
    label: 'Add Categories',
  },
  {
    routeLink: '/admin/quizzes',
    icon: 'quiz',
    label: 'Quizzes',
  },
  {
    routeLink: '/admin/add-quiz',
    icon: 'add_circle',
    label: 'Add Quiz',
  },
  {
    routeLink: '',
    icon: 'logout',
    label: 'Log Out',
  },

];
