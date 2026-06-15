import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'

import DashboardView from '../views/DashboardView.vue'
import EmployeesView from '../views/EmployeesView.vue'
import PayrollView from '../views/PayrollView.vue'
import VacationsView from '../views/VacationsView.vue'
import ReportsView from '../views/ReportsView.vue'
import UsersView from '../views/UsersView.vue'
import PermissionsView from '../views/PermissionsView.vue'

import AttendanceView from '../views/AttendanceView.vue'
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
          component: DashboardView,
           meta: {
            roles: ['ADMIN', 'RRHH', 'JEFE', 'EMPLEADO']
          }
        },
        {
          path: 'employees',
        component: EmployeesView,
        meta: {
          roles: ['ADMIN', 'RRHH', 'JEFE']
        }
        },
       
        {
          path: 'vacations',
          component: VacationsView,
          meta: {
            roles: ['ADMIN', 'RRHH', 'JEFE', 'EMPLEADO']
          }
        },
         {
          path: 'attendances',
          component: AttendanceView,
          meta: {
            roles: ['ADMIN', 'RRHH', 'JEFE']
          }
        },
        {
          path: 'payroll',
          component: PayrollView,
           meta: {
            roles: ['ADMIN', 'RRHH']
          }
        },
        {
          path: 'reports',
          component: ReportsView,
          meta: {
          roles: ['ADMIN', 'RRHH', 'JEFE']
        }
        },
        {
          path: 'users',
          component: UsersView,
           meta: {
            roles: ['ADMIN']
          }
        },
        {
        path: 'permissions',
        component: PermissionsView,
        meta: {
          roles: ['ADMIN', 'RRHH', 'JEFE']
        }
      },
        
        

      ]
    }
  ]
})
router.beforeEach((to, from, next) => {

  const user = JSON.parse(
    localStorage.getItem('user') || 'null'
  )

  if (!user && to.path !== '/') {
    return next('/')
  }

  const allowedRoles =
    to.meta.roles as string[]

  if (
    allowedRoles &&
    !allowedRoles.includes(user?.rol)
  ) {

    return next('/app/dashboard')
  }

  next()

})
export default router 