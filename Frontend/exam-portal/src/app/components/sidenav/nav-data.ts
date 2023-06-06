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
    routeLink: '/admin',
    icon: 'category',
    label: 'Categories',
  },
  {
    routeLink: '/admin',
    icon: 'playlist_add_circle',
    label: 'Add Categories',
  },
  {
    routeLink: '/admin',
    icon: 'quiz',
    label: 'Quizzes',
  },
  {
    routeLink: '/admin',
    icon: 'add_circle',
    label: 'Add Quiz',
  },
  {
    routeLink: '',
    icon: 'logout',
    label: 'Log Out',
  },

];
