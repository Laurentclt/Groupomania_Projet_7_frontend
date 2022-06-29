import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import MainApp from '../views/MainApp.vue'
import ErrorView from '../views/ErrorView.vue'

const routes = [
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/app',
    name: '/app',
    component: MainApp
  },
  {
    path: '/error',
    name: '/error',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
