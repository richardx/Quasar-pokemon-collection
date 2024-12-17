import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '../stores'
import { watch } from 'vue'

export default route(function () {
  const createHistory = createWebHistory

  const Router = createRouter({
    history: createHistory(process.env.VUE_ROUTER_BASE),
    routes,
  })

  // Global navigation guard
  Router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (!userStore.isAuthReady) {
      const unwatch = watch(
        () => userStore.isAuthReady,
        (isAuthReady) => {
          if (isAuthReady) {
            unwatch()
            const isAuthenticated = userStore.user !== null

            if (requiresAuth && !isAuthenticated) {
              next({ name: 'LoginUser' })
            } else {
              next()
            }
          }
        },
      )
    } else {
      const isAuthenticated = userStore.user !== null

      if (requiresAuth && !isAuthenticated) {
        next({ name: 'LoginUser' })
      } else {
        next()
      }
    }
  })

  return Router
})
