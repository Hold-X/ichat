<template>
    <div class="login-container">
        <!-- 背景装饰 -->
        <div class="background-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
        </div>

        <!-- 登录卡片 -->
        <div class="login-card">
            <!-- 头部 -->
            <div class="login-header">
                <div class="logo">
                    <el-icon :size="32" color="#409eff">
                        <ChatDotRound />
                    </el-icon>
                </div>
                <h1 class="title">欢迎回来</h1>
                <p class="subtitle">登录您的 iChat 账户</p>
            </div>

            <!-- 登录表单 -->
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                size="large"
                @submit.prevent="handleLogin"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        placeholder="请输入用户名或邮箱"
                        :prefix-icon="User"
                        clearable
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                        show-password
                        clearable
                        @keyup.enter="handleLogin"
                    />
                </el-form-item>

                <el-form-item>
                    <div class="form-options">
                        <el-checkbox v-model="loginForm.remember">
                            记住我
                        </el-checkbox>
                        <el-link type="primary" :underline="false">
                            忘记密码？
                        </el-link>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button
                        type="primary"
                        class="login-button"
                        :loading="loading"
                        @click="handleLogin"
                    >
                        {{ loading ? '登录中...' : '登录' }}
                    </el-button>
                </el-form-item>
            </el-form>

            <!-- 分割线 -->
            <div class="divider">
                <span>或</span>
            </div>

            <!-- 第三方登录 -->
            <div class="social-login">
                <el-button class="social-button" circle>
                    <el-icon><Platform /></el-icon>
                </el-button>
                <el-button class="social-button" circle>
                    <el-icon><ChatDotRound /></el-icon>
                </el-button>
                <el-button class="social-button" circle>
                    <el-icon><Message /></el-icon>
                </el-button>
            </div>

            <!-- 注册链接 -->
            <div class="register-link">
                <span>还没有账户？</span>
                <el-link type="primary" :underline="false">
                    立即注册
                </el-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock, ChatDotRound, Platform, Message } from '@element-plus/icons-vue'

// 定义组件名
defineOptions({
    name: 'LoginPage'
})

// 响应式数据
const loginFormRef = ref()
const loading = ref(false)

// 表单数据
const loginForm = reactive({
    username: '',
    password: '',
    remember: false
})

// 表单验证规则
const loginRules = {
    username: [
        { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
        { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ]
}

// 登录处理
const handleLogin = async () => {
    if (!loginFormRef.value) return

    try {
        const valid = await loginFormRef.value.validate()
        if (!valid) return

        loading.value = true

        // 模拟登录请求
        await new Promise(resolve => setTimeout(resolve, 1500))

        ElMessage.success('登录成功！')

        // 这里可以添加路由跳转逻辑
        // router.push('/dashboard')

    } catch (error) {
        console.error('登录失败:', error)
        ElMessage.error('登录失败，请检查用户名和密码')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
}

/* 背景装饰 */
.background-decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.decoration-circle {
    position: absolute;
    border-radius: 50%;
    background: rgb(255 255 255 / 10%);
    animation: float 6s ease-in-out infinite;
}

.circle-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
}

.circle-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
}

.circle-3 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

/* 登录卡片 */
.login-card {
    width: 100%;
    max-width: 400px;
    background: rgb(255 255 255 / 95%);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 20px 40px rgb(0 0 0 / 10%);
    border: 1px solid rgb(255 255 255 / 20%);
}

/* 头部样式 */
.login-header {
    text-align: center;
    margin-bottom: 32px;
}

.logo {
    margin-bottom: 16px;
}

.title {
    font-size: 28px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0 0 8px;
}

.subtitle {
    font-size: 16px;
    color: var(--color-text-secondary);
    margin: 0;
}

/* 表单样式 */
.login-form {
    margin-bottom: 24px;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.login-button {
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
}

/* 分割线 */
.divider {
    position: relative;
    text-align: center;
    margin: 24px 0;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--color-border-light);
}

.divider span {
    background: rgb(255 255 255 / 95%);
    padding: 0 16px;
    color: var(--color-text-secondary);
    font-size: 14px;
}

/* 第三方登录 */
.social-login {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
}

.social-button {
    width: 48px;
    height: 48px;
    border: 1px solid var(--color-border-light);
    background: white;
    color: var(--color-text-secondary);
    transition: all var(--transition-base);
}

.social-button:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    transform: translateY(-2px);
}

/* 注册链接 */
.register-link {
    text-align: center;
    font-size: 14px;
    color: var(--color-text-secondary);
}

.register-link span {
    margin-right: 8px;
}

/* 响应式设计 */
@media (width <= 768px) {
    .login-card {
        margin: 20px;
        padding: 32px 24px;
    }

    .title {
        font-size: 24px;
    }

    .circle-1,
    .circle-2,
    .circle-3 {
        display: none;
    }
}

/* Element Plus 组件样式覆盖 */
:deep(.el-input__wrapper) {
    border-radius: 8px;
    box-shadow: 0 0 0 1px var(--color-border-light);
    transition: all var(--transition-base);
}

:deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 1px var(--color-border-base);
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 2px var(--color-primary);
}

:deep(.el-button--primary) {
    background: linear-gradient(135deg, #409eff 0%, #667eea 100%);
    border: none;
    transition: all var(--transition-base);
}

:deep(.el-button--primary:hover) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgb(64 158 255 / 30%);
}
</style>
