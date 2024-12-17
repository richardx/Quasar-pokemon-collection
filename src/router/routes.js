const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'MyCollection',
        name: 'MyCollection',
        component: () => import('pages/MyCollection.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'loginUser',
        name: 'LoginUser',
        component: () => import('pages/LoginUser.vue'),
      },
      {
        path: 'registerUser',
        name: 'RegisterUser',
        component: () => import('pages/RegisterUser.vue'),
      },
      {
        path: 'cardDetail/:id/:source',
        name: 'CardDetail',
        component: () => import('pages/CardDetail.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: '/addCard',
        name: 'AddCard',
        component: () => import('pages/AddCard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/wishlist',
        name: 'WishlistUser',
        component: () => import('pages/WishlistUser.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('pages/ProfileUser.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/sets',
        name: 'Sets',
        component: () => import('pages/SetsUser.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/sets/:setId',
        name: 'SetDetail',
        component: () => import('pages/SetDetail.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: '/scan',
        name: 'ScanView',
        component: () => import('pages/ScanView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
