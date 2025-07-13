<template>
    <div class="chat-container">
        <el-container style="height: 100%;">
            <!-- 侧边栏 -->
            <el-aside width="300px" class="chat-sidebar">
                <div class="sidebar-header">
                    <div class="user-info">
                        <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        <div class="user-details">
                            <div class="username">用户名</div>
                            <div class="status">在线</div>
                        </div>
                    </div>
                    <el-button type="primary" :icon="Plus" circle @click="handleLogout" />
                </div>

                <div class="chat-list">
                    <div class="search-box">
                        <el-input
                            v-model="searchText"
                            placeholder="搜索聊天"
                            :prefix-icon="Search"
                            clearable
                        />
                    </div>

                    <div class="conversation-list">
                        <div
                            v-for="chat in filteredChats"
                            :key="chat.id"
                            class="conversation-item"
                            :class="{ active: currentChatId === chat.id }"
                            @click="selectChat(chat.id)"
                        >
                            <el-avatar :size="48" :src="chat.avatar" />
                            <div class="conversation-info">
                                <div class="conversation-header">
                                    <span class="name">{{ chat.name }}</span>
                                    <span class="time">{{ chat.lastTime }}</span>
                                </div>
                                <div class="last-message">{{ chat.lastMessage }}</div>
                            </div>
                            <el-badge v-if="chat.unread" :value="chat.unread" class="unread-badge" />
                        </div>
                    </div>
                </div>
            </el-aside>

            <!-- 主聊天区域 -->
            <el-main class="chat-main">
                <div v-if="currentChatId" class="chat-content">
                    <!-- 聊天头部 -->
                    <div class="chat-header">
                        <div class="chat-info">
                            <el-avatar :size="40" :src="currentChat?.avatar" />
                            <div class="chat-details">
                                <div class="chat-name">{{ currentChat?.name }}</div>
                                <div class="chat-status">{{ currentChat?.status }}</div>
                            </div>
                        </div>
                        <div class="chat-actions">
                            <el-button :icon="VideoCamera" circle />
                            <el-button :icon="Phone" circle />
                            <el-button :icon="MoreFilled" circle />
                        </div>
                    </div>

                    <!-- 消息列表 -->
                    <div class="message-list" ref="messageListRef">
                        <div
                            v-for="message in messages"
                            :key="message.id"
                            class="message-item"
                            :class="{ 'is-own': message.isOwn }"
                        >
                            <el-avatar v-if="!message.isOwn" :size="32" :src="message.avatar" />
                            <div class="message-content">
                                <div class="message-bubble">{{ message.content }}</div>
                                <div class="message-time">{{ message.time }}</div>
                            </div>
                            <el-avatar v-if="message.isOwn" :size="32" :src="message.avatar" />
                        </div>
                    </div>

                    <!-- 输入区域 -->
                    <div class="message-input">
                        <div class="input-toolbar">
                            <el-button :icon="Picture" circle />
                            <el-button :icon="Paperclip" circle />
                            <el-button :icon="Microphone" circle />
                        </div>
                        <div class="input-area">
                            <el-input
                                v-model="messageText"
                                type="textarea"
                                :rows="3"
                                placeholder="输入消息..."
                                resize="none"
                                @keydown.enter.exact.prevent="sendMessage"
                                @keydown.enter.shift.exact="handleShiftEnter"
                            />
                            <el-button
                                type="primary"
                                :icon="Promotion"
                                @click="sendMessage"
                                :disabled="!messageText.trim()"
                            >
                                发送
                            </el-button>
                        </div>
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-else class="empty-state">
                    <el-empty description="选择一个聊天开始对话" />
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
    Plus, Search, VideoCamera, Phone, MoreFilled,
    Picture, Paperclip, Microphone, Promotion
} from '@element-plus/icons-vue'

// 定义组件名
defineOptions({
    name: 'ChatPage'
})

const router = useRouter()

// 响应式数据
const searchText = ref('')
const currentChatId = ref(null)
const messageText = ref('')
const messageListRef = ref()

// 模拟聊天数据
const chats = ref([
    {
        id: 1,
        name: '张三',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        lastMessage: '你好，最近怎么样？',
        lastTime: '10:30',
        unread: 2,
        status: '在线'
    },
    {
        id: 2,
        name: '李四',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        lastMessage: '明天见面聊',
        lastTime: '09:15',
        unread: 0,
        status: '离线'
    },
    {
        id: 3,
        name: '王五',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        lastMessage: '文件已发送',
        lastTime: '昨天',
        unread: 1,
        status: '在线'
    }
])

const messages = ref([
    {
        id: 1,
        content: '你好！',
        time: '10:25',
        isOwn: false,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    {
        id: 2,
        content: '你好，最近怎么样？',
        time: '10:26',
        isOwn: true,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
])

// 计算属性
const filteredChats = computed(() => {
    if (!searchText.value) return chats.value
    return chats.value.filter(chat =>
        chat.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
})

const currentChat = computed(() => {
    return chats.value.find(chat => chat.id === currentChatId.value)
})

// 方法
const selectChat = (chatId) => {
    currentChatId.value = chatId
    // 清除未读消息
    const chat = chats.value.find(c => c.id === chatId)
    if (chat) {
        chat.unread = 0
    }
}

const sendMessage = async () => {
    if (!messageText.value.trim()) return

    const newMessage = {
        id: Date.now(),
        content: messageText.value,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }

    messages.value.push(newMessage)
    messageText.value = ''

    // 滚动到底部
    await nextTick()
    scrollToBottom()

    ElMessage.success('消息发送成功')
}

const handleShiftEnter = (event) => {
    // Shift + Enter 换行
    const textarea = event.target
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    messageText.value = messageText.value.substring(0, start) + '\n' + messageText.value.substring(end)

    nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1
    })
}

const scrollToBottom = () => {
    if (messageListRef.value) {
        messageListRef.value.scrollTop = messageListRef.value.scrollHeight
    }
}

const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
    ElMessage.success('已退出登录')
}

// 初始化
selectChat(1)
</script>

<style lang="scss" scoped>
.chat-container {
    min-height: 100vh;
    height: 100vh;
    background: var(--color-bg-light);

    // 侧边栏
    .chat-sidebar {
        background: white;
        border-right: 1px solid var(--color-border-light);
        display: flex;
        flex-direction: column;

        // 侧边栏头部
        .sidebar-header {
            padding: var(--spacing-md);
            border-bottom: 1px solid var(--color-border-lighter);
            display: flex;
            align-items: center;
            justify-content: space-between;

            .user-info {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);

                .user-details {
                    .username {
                        font-weight: var(--font-weight-medium);
                        color: var(--color-text-primary);
                    }

                    .status {
                        font-size: var(--font-size-xs);
                        color: var(--color-success);
                    }
                }
            }
        }

        // 聊天列表区域
        .chat-list {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;

            .search-box {
                padding: var(--spacing-md);
                border-bottom: 1px solid var(--color-border-lighter);
            }

            .conversation-list {
                flex: 1;
                overflow-y: auto;

                .conversation-item {
                    display: flex;
                    align-items: center;
                    padding: var(--spacing-md);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    position: relative;

                    &:hover {
                        background: var(--color-bg-base);
                    }

                    &.active {
                        background: var(--color-primary);
                        color: white;
                    }

                    .conversation-info {
                        flex: 1;
                        margin-left: var(--spacing-sm);
                        min-width: 0;

                        .conversation-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 4px;

                            .name {
                                font-weight: var(--font-weight-medium);
                                font-size: var(--font-size-sm);
                            }

                            .time {
                                font-size: var(--font-size-xs);
                                opacity: 0.7;
                            }
                        }

                        .last-message {
                            font-size: var(--font-size-xs);
                            opacity: 0.8;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }

                    .unread-badge {
                        position: absolute;
                        top: var(--spacing-sm);
                        right: var(--spacing-sm);
                    }
                }
            }
        }
    }

    // 主聊天区域
    .chat-main {
        padding: 0;
        display: flex;
        flex-direction: column;

        .chat-content {
            height: 100%;
            display: flex;
            flex-direction: column;

            // 聊天头部
            .chat-header {
                padding: var(--spacing-md);
                border-bottom: 1px solid var(--color-border-light);
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: white;

                .chat-info {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);

                    .chat-details {
                        .chat-name {
                            font-weight: var(--font-weight-medium);
                            color: var(--color-text-primary);
                        }

                        .chat-status {
                            font-size: var(--font-size-xs);
                            color: var(--color-success);
                        }
                    }
                }

                .chat-actions {
                    display: flex;
                    gap: var(--spacing-sm);
                }
            }

            // 消息列表
            .message-list {
                flex: 1;
                padding: var(--spacing-md);
                overflow-y: auto;
                background: var(--color-bg-base);

                .message-item {
                    display: flex;
                    margin-bottom: var(--spacing-md);
                    gap: var(--spacing-sm);

                    &.is-own {
                        flex-direction: row-reverse;

                        .message-content .message-bubble {
                            background: var(--color-primary);
                            color: white;
                        }
                    }

                    .message-content {
                        max-width: 70%;

                        .message-bubble {
                            background: white;
                            padding: var(--spacing-sm) var(--spacing-md);
                            border-radius: var(--border-radius-lg);
                            box-shadow: var(--shadow-sm);
                            word-wrap: break-word;
                        }

                        .message-time {
                            font-size: var(--font-size-xs);
                            color: var(--color-text-placeholder);
                            margin-top: 4px;
                            text-align: center;
                        }
                    }
                }
            }

            // 消息输入区域
            .message-input {
                background: white;
                border-top: 1px solid var(--color-border-light);
                padding: var(--spacing-md);

                .input-toolbar {
                    display: flex;
                    gap: var(--spacing-sm);
                    margin-bottom: var(--spacing-sm);
                }

                .input-area {
                    display: flex;
                    gap: var(--spacing-sm);
                    align-items: flex-end;

                    .el-textarea {
                        flex: 1;
                    }
                }
            }
        }

        // 空状态
        .empty-state {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    // 响应式设计
    @media (width <= 768px) {
        .chat-sidebar {
            width: 100% !important;
            position: absolute;
            z-index: 1000;
            height: 100%;
        }

        .chat-main .chat-content .message-list .message-item {
            .conversation-item {
                padding: var(--spacing-sm) var(--spacing-md);
            }

            .message-content {
                max-width: 85%;
            }
        }
    }
}
</style>
