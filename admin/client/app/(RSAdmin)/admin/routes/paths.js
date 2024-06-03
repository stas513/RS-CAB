// utils
import { paramCase } from '@/app/(RSAdmin)/admin/utils/change-case';
import { _id, _postTitles } from '@/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/admin/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/admin/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/kAYnYYdib0aQPNKZpgJT6J/%5BPreview%5D-Minimal-Web.v5.0.0?type=design&node-id=0%3A1&t=Al4jScQq97Aly0Mn-1',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
      verify: `${ROOTS.AUTH}/jwt/verify`,
      newPassword: `${ROOTS.AUTH}/jwt/new-password`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      register: `${ROOTS.AUTH}/firebase/register`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      changePassword: `${ROOTS.DASHBOARD}/new-password`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    drivers: {
      root: `${ROOTS.DASHBOARD}/drivers/list`,
      list: `${ROOTS.DASHBOARD}/drivers/list`,
      new: `${ROOTS.DASHBOARD}/drivers/new`,
      details: (id) => `${ROOTS.DASHBOARD}/drivers/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/drivers/${id}/edit`,
      carDetail: (driverId, id) => `${ROOTS.DASHBOARD}/drivers/${driverId}/cars/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/drivers/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/drivers/${MOCK_ID}/edit`,
      },
    },
    passengers: {
      root: `${ROOTS.DASHBOARD}/passengers/list`,
      list: `${ROOTS.DASHBOARD}/passengers/list`,
      new: `${ROOTS.DASHBOARD}/passengers/new`,
      details: (id) => `${ROOTS.DASHBOARD}/passengers/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/passengers/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    bookings: {
      root: `${ROOTS.DASHBOARD}/bookings/list`,
      new: `${ROOTS.DASHBOARD}/bookings/new`,
      list: `${ROOTS.DASHBOARD}/bookings/list`,
      // new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    packages: {
      root: `${ROOTS.DASHBOARD}/packages/list`,
      new: `${ROOTS.DASHBOARD}/packages/new`,
      list: `${ROOTS.DASHBOARD}/packages/list`,
      details: (id) => `${ROOTS.DASHBOARD}/package/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/package/${id}/edit`,
    }
  },
};