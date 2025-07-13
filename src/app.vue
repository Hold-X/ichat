<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<style lang="css">
#app {
    font-family: Arial, sans-serif;
    color: #2c3e50;
}

/* 临时测试导航样式 */
.test-nav {
    background: #f5f5f5;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.test-nav a {
    margin: 0 15px;
    padding: 8px 16px;
    text-decoration: none;
    color: #409eff;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.test-nav a:hover {
    background-color: #ecf5ff;
}

.test-nav a.router-link-active {
    background-color: #409eff;
    color: white;
}

.route-info {
    background: #e6f7ff;
    padding: 8px;
    text-align: center;
    font-size: 14px;
    color: #1890ff;
    border-bottom: 1px solid #91d5ff;
}
</style>