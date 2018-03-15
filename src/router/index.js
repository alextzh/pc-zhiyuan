import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo} from 'common/js/storage'

// 懒加载路由模块导入
const Login = () => import('components/login/login')
const Management = () => import('components/management/management')
const PreviewContract = () => import('components/preview-contract/preview-contract')
const SignContract = () => import('components/sign-contract/sign-contract')
const NoFound = () => import('components/no-found/no-found')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      meta: {
        requireAuth: true
      },
      component: Management
    },
    {
      path: '/preview-contract',
      meta: {
        requireAuth: true
      },
      component: PreviewContract
    },
    {
      path: '/sign-contract',
      meta: {
        requireAuth: true
      },
      component: SignContract
    },
    {
      path: '*',
      component: NoFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (getUserInfo().id) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
