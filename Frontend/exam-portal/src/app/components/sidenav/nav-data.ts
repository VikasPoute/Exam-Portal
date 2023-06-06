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
    routeLink: '',
    icon: 'logout',
    label: 'Log Out',
  },

];
