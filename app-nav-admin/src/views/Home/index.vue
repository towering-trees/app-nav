<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div class="header-l">
                <div class="logo" v-show="!isCollapse">后台管理系统</div>
                <!-- 侧边栏缩放 -->
                <div class="toggle-button" @click="toggleCollapse">
                    <span class="el-icon-s-unfold" v-if="isCollapse"></span>
                    <span class="el-icon-s-fold" v-else></span>
                </div>
            </div>
            <div class="header-r">
                <el-button type="info" @click="login_out">退出</el-button>
            </div>
        </el-header>
        <!-- 主体区域 -->
        <el-container class="content_box">
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <el-menu
                    router
                    unique-opened
                    background-color="#33373b"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                >
                    <!-- 一级菜单 -->
                    <el-submenu
                        :index="item.id + ''"
                        v-for="item in menulist"
                        :key="item.id"
                    >
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item
                            :index="'/' + subItem.path"
                            v-for="subItem of item.children"
                            :key="subItem.id"
                        >
                            <i class="el-icon-menu"></i>
                            <span>{{ subItem.authName }}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容 -->
            <el-main>
                <div class="menu_content">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            menulist: [
                // 组织机构
                {
                    id: 1,
                    authName: "用户管理",
                    path: null,
                    children: [
                        {
                            id: 1.1,
                            authName: "用户列表",
                            path: "users",
                        },
                    ],
                },
                {
                    id: 2,
                    authName: "应用管理",
                    path: null,
                    children: [
                        {
                            id: 2.1,
                            authName: "分类列表",
                            path: "classify",
                        },
                        {
                            id: 2.2,
                            authName: "应用列表",
                            path: "apps",
                        },
                    ],
                },
                {
                    id: 3,
                    authName: "广告管理",
                    path: null,
                    children: [
                        {
                            id: 3.1,
                            authName: "轮播设置",
                            path: "slides",
                        },
                    ],
                },
                {
                    id: 4,
                    authName: "网站管理",
                    path: null,
                    children: [
                        {
                            id: 4.1,
                            authName: "网站设置",
                            path: "setting",
                        },
                    ],
                },
            ],
            iconsObj: {
                1: "el-icon-user-solid",
                2: "el-icon-s-goods",
                3: "el-icon-s-order",
                4: "el-icon-s-tools",
            },
            // 是否折叠
            isCollapse: false,
        };
    },
    methods: {
        login_out() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        // 折叠与展开
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
    },
};
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}
.el-header {
    background-color: #2b2b2b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: #fff;
    font-size: 20px;
    .header-l {
        display: flex;
        align-items: center;
        line-height: 60px;
        .logo {
            width: 200px;
            height: 60px;
            text-align: center;
        }
        .toggle-button {
            width: 64px;
            text-align: center;
            cursor: pointer;
            span {
                font-size: 24px;
            }
        }
    }
}
.el-aside {
    background-color: #33373b;
    .el-menu {
        border-right: none;
    }
}
.el-footer {
    background-color: rgb(248, 250, 251);
    color: #606061;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
}
</style>