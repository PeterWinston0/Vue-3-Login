import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import Dashboard from '../views/Dashboard.vue';
import ProjectList from '../views/ProjectList.vue';
import CreateProject from '../views/CreateProject.vue';
import ProjectDetail from '../views/ProjectDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' // Redirect the root URL to the login page
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/projectlist',
      name: 'ProjectList',
      component: ProjectList,
      meta: { requiresAuth: true }
    },
    {
      path: '/createproject',
      name: 'CreateProject',
      component: CreateProject,
      meta: { requiresAuth: true }
    },
    {
      path: '/:id',
      name: 'detail',
      component: () => import('../views/ProjectDetail.vue'),
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if attempting to access a protected route without authentication
    next('/login');
  } else {
    next();
  }
});

export default router
