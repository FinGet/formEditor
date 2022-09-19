import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect:'/editor'
    },
    {
      path: '/editor',
      name:'editor',
      component:()=>import('@/views/editor/index.vue'),
    },
  ]
});

export default router;
