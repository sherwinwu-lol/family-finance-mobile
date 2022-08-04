import {createRouter, createWebHashHistory} from 'vue-router'
import {defineAsyncComponent} from 'vue'
import store from "@/store";

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式
  routes: [
    {
      path: '/home',
      name: 'home',
      component: defineAsyncComponent(() => import(`../views/home.vue`)),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/user',
      name: 'user',
      component: defineAsyncComponent(() => import(`../views/user`)),
      meta: {
        title: '用户页',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: defineAsyncComponent(() => import("../views/login"))
    },
    {
      path: '/*',
      redirect: '/home',
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  if (to.meta.title) {
    document.title = `${to.meta.title}`
  }
  if (store.state.token || to.path == '/login') {
    next()
  } else {
    next({
      path: '/login',
      // 保存跳转前的参数,登录成功跳回该路由
      query: {redirect: to.fullPath}
    })
  }
  console.log("放行")
})

router.afterEach((to, from) => {
  console.log('afterEach')
})

export default router