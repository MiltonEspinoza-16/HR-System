import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'

import DashboardView from '../views/DashboardView.vue'
import EmployeesView from '../views/EmployeesView.vue'
import PayrollView from '../views/PayrollView.vue'
import VacationsView from '../views/VacationsView.vue'
import ReportsView from '../views/ReportsView.vue'
import UsersView from '../views/UsersView.vue'

import MainLayout from '../layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },

    {
      path: '/app',
      component: MainLayout,
      children: [
        {
          path: 'dashboard',
          component: DashboardView
        },
        {
          path: 'employees',
          component: EmployeesView
        },
        {
          path: 'vacations',
          component: VacationsView
        },
        {
          path: 'payroll',
          component: PayrollView
        },
        {
          path: 'reports',
          component: ReportsView
        },
        {
          path: 'users',
          component: UsersView
        }
      ]
    }
  ]
})

export default router 