import { createRouter, createWebHistory } from 'vue-router'

// 路由组件
const LoginPage = () => import('@/views/login/index.vue')
const ChatPage = () => import('@/views/chat/index.vue')

// 路由配置
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: {
            title: '登录 - iChat',
            requiresAuth: false
        }
    },
    {
        path: '/chat',
        name: 'Chat',
        component: ChatPage,
        meta: {
            title: '聊天 - iChat',
            requiresAuth: true
        }
    }
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('../views/404/index.vue'),
    //     meta: {
    //         title: '页面未找到 - iChat'
    //     }
    // }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 路由切换时的滚动行为
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 设置页面标题
    if (to.meta.title) {
        document.title = to.meta.title
    }

    // 暂时允许所有路由通过，后续可以添加认证逻辑
    next()

    // // 检查是否需要登录
    // const isAuthenticated = checkAuth()
    //
    // if (to.meta.requiresAuth && !isAuthenticated) {
    //     // 需要登录但未登录，跳转到登录页
    //     next({
    //         path: '/login',
    //         query: { redirect: to.fullPath }
    //     })
    // } else if (to.path === '/login' && isAuthenticated) {
    //     // 已登录用户访问登录页，跳转到聊天页
    //     next('/chat')
    // } else {
    //     next()
    // }
})

export default router
