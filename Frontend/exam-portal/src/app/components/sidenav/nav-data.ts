import { INavbarData } from './helper';

export const beforeLoginData: INavbarData[] = [
  {
    routeLink: '/',
    icon: 'fal fa-home',
    label: 'Home',
  },
  {
    routeLink: 'signup',
    icon: 'fal fa-user-plus',
    label: 'Sign Up',
    open: true,
  },
  {
    routeLink: 'login',
    icon: 'fal fa-sign-in',
    label: 'Login',
  },
];

export const afterLoginData: INavbarData[] = [
  {
    routeLink: '',
    icon: 'fal fa-sign-out',
    label: 'Log Out',
  },
];
