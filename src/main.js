import { createApp } from 'vue'
import App from '@/app.vue'
import ElementPlus from 'element-plus'
import router from '@/router'

// 样式导入 - 按顺序导入
import '@/assets/styles/reset.css'      // CSS 重置样式
import '@/assets/styles/global.css'     // 全局样式和工具类
import 'element-plus/dist/index.css'    // Element Plus 样式

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
