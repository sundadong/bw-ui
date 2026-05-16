import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import('../views/ButtonDemo.vue')
  },
  {
    path: '/cell',
    name: 'Cell',
    component: () => import('../views/CellDemo.vue')
  },
  {
    path: '/icon',
    name: 'Icon',
    component: () => import('../views/IconDemo.vue')
  },
  {
    path: '/tag',
    name: 'Tag',
    component: () => import('../views/TagDemo.vue')
  },
  {
    path: '/badge',
    name: 'Badge',
    component: () => import('../views/BadgeDemo.vue')
  },
  {
    path: '/empty',
    name: 'Empty',
    component: () => import('../views/EmptyDemo.vue')
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('../views/ProgressDemo.vue')
  },
  {
    path: '/switch',
    name: 'Switch',
    component: () => import('../views/SwitchDemo.vue')
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: () => import('../views/CheckboxDemo.vue')
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () => import('../views/RadioDemo.vue')
  },
  {
    path: '/field',
    name: 'Field',
    component: () => import('../views/FieldDemo.vue')
  },
  {
    path: '/textarea',
    name: 'Textarea',
    component: () => import('../views/TextareaDemo.vue')
  },
  {
    path: '/stepper',
    name: 'Stepper',
    component: () => import('../views/StepperDemo.vue')
  },
  {
    path: '/slider',
    name: 'Slider',
    component: () => import('../views/SliderDemo.vue')
  },
  {
    path: '/rate',
    name: 'Rate',
    component: () => import('../views/RateDemo.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchDemo.vue')
  },
  {
    path: '/picker',
    name: 'Picker',
    component: () => import('../views/PickerDemo.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/CalendarDemo.vue')
  },
  {
    path: '/date-picker',
    name: 'DatePicker',
    component: () => import('../views/DatePickerDemo.vue')
  },
  {
    path: '/area-picker',
    name: 'AreaPicker',
    component: () => import('../views/AreaPickerDemo.vue')
  },
  {
    path: '/popup',
    name: 'Popup',
    component: () => import('../views/PopupDemo.vue')
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: () => import('../views/DialogDemo.vue')
  },
  {
    path: '/toast',
    name: 'Toast',
    component: () => import('../views/ToastDemo.vue')
  },
  {
    path: '/overlay',
    name: 'Overlay',
    component: () => import('../views/OverlayDemo.vue')
  },
  {
    path: '/notify',
    name: 'Notify',
    component: () => import('../views/NotifyDemo.vue')
  },
  {
    path: '/action-sheet',
    name: 'ActionSheet',
    component: () => import('../views/ActionSheetDemo.vue')
  },
  {
    path: '/loading',
    name: 'Loading',
    component: () => import('../views/LoadingDemo.vue')
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import('../views/GridDemo.vue')
  },
  {
    path: '/space',
    name: 'Space',
    component: () => import('../views/SpaceDemo.vue')
  },
  {
    path: '/safe-area',
    name: 'SafeArea',
    component: () => import('../views/SafeAreaDemo.vue')
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: () => import('../views/TabsDemo.vue')
  },
  {
    path: '/navbar',
    name: 'Navbar',
    component: () => import('../views/NavbarDemo.vue')
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: () => import('../views/SidebarDemo.vue')
  },
  {
    path: '/tabbar',
    name: 'Tabbar',
    component: () => import('../views/TabbarDemo.vue')
  },
  {
    path: '/pagination',
    name: 'Pagination',
    component: () => import('../views/PaginationDemo.vue')
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: () => import('../views/AvatarDemo.vue')
  },
  {
    path: '/card',
    name: 'Card',
    component: () => import('../views/CardDemo.vue')
  },
  {
    path: '/skeleton',
    name: 'Skeleton',
    component: () => import('../views/SkeletonDemo.vue')
  },
  {
    path: '/collapse',
    name: 'Collapse',
    component: () => import('../views/CollapseDemo.vue')
  },
  {
    path: '/image',
    name: 'Image',
    component: () => import('../views/ImageDemo.vue')
  },
  {
    path: '/swipe',
    name: 'Swipe',
    component: () => import('../views/SwipeDemo.vue')
  },
  {
    path: '/notice-bar',
    name: 'NoticeBar',
    component: () => import('../views/NoticeBarDemo.vue')
  },
  {
    path: '/sticky',
    name: 'Sticky',
    component: () => import('../views/StickyDemo.vue')
  },
  {
    path: '/divider',
    name: 'Divider',
    component: () => import('../views/DividerDemo.vue')
  },
  {
    path: '/circle',
    name: 'Circle',
    component: () => import('../views/CircleDemo.vue')
  },
  {
    path: '/back-top',
    name: 'BackTop',
    component: () => import('../views/BackTopDemo.vue')
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/TimelineDemo.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/ArticleDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router