import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import('./views/ButtonDemo.vue')
  },
  {
    path: '/cell',
    name: 'Cell',
    component: () => import('./views/CellDemo.vue')
  },
  {
    path: '/icon',
    name: 'Icon',
    component: () => import('./views/IconDemo.vue')
  },
  {
    path: '/tag',
    name: 'Tag',
    component: () => import('./views/TagDemo.vue')
  },
  {
    path: '/badge',
    name: 'Badge',
    component: () => import('./views/BadgeDemo.vue')
  },
  {
    path: '/empty',
    name: 'Empty',
    component: () => import('./views/EmptyDemo.vue')
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('./views/ProgressDemo.vue')
  },
  {
    path: '/switch',
    name: 'Switch',
    component: () => import('./views/SwitchDemo.vue')
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: () => import('./views/CheckboxDemo.vue')
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () => import('./views/RadioDemo.vue')
  },
  {
    path: '/field',
    name: 'Field',
    component: () => import('./views/FieldDemo.vue')
  },
  {
    path: '/popup',
    name: 'Popup',
    component: () => import('./views/PopupDemo.vue')
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: () => import('./views/DialogDemo.vue')
  },
  {
    path: '/toast',
    name: 'Toast',
    component: () => import('./views/ToastDemo.vue')
  },
  {
    path: '/overlay',
    name: 'Overlay',
    component: () => import('./views/OverlayDemo.vue')
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: () => import('./views/TabsDemo.vue')
  },
  {
    path: '/navbar',
    name: 'Navbar',
    component: () => import('./views/NavbarDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
