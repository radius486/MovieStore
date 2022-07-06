import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Homepage from '../views/homepage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "details" */ '../views/details.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
