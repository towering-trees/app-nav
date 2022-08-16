<template>
    <div class="home">
        <!-- 头部 -->
        <div class="header">{{ webInfo.title }}</div>
        <!-- 轮播 -->
        <van-swipe class="my-swipe" :autoplay="3000" lazy-render touchable>
            <van-swipe-item v-for="item in swiperArr" :key="item.id">
                <img :src="item.pic" alt="" style="width: 100%; height: 15rem;">
            </van-swipe-item>
        </van-swipe>
        <!-- 公告 -->
       <van-notice-bar
            scrollable
            mode="closeable"
            left-icon="volume-o"
            :text="webInfo.notice"
        />
        <!-- 主体区域 -->
        <div class="content-box">
            <!-- 应用导航 -->
            <main-nav></main-nav>
            <!-- 热门推荐 -->
            <home-slide :dataList="hotList"></home-slide>
            <!-- 站长推荐 -->
            <div class="tools-content">
                <Tools :dataList="allList" :dtitle="'站长推荐'"></Tools>
                <!-- 分页功能 -->
                <van-pagination 
                v-model="page_num" 
                :total-items="total" 
                :items-per-page="page_size" 
                force-ellipses
                @change="getAllList" 
                v-if="flag"/>
            </div>
        </div>
    </div>
</template>

<script>
import HomeSlide from "@/components/Slide.vue"
import Tools from "@/components/tools.vue"
import MainNav from "@/components/MainNav.vue"

export default {
    components: {
        MainNav,
        HomeSlide,
        Tools
    },
    data() {
        return {
            webInfo: {
                title: "网站标题",
                notice: "这里是公告,点击右侧 x 按钮可关闭哦"
            },
            swiperArr: [],
            hotList: [],
            allList: [
                { id: 1, pic: "", num: 9999, title: "名称", details: "应用介绍"}
            ],
            // 分页
            page_num: 1, // 页数
            page_size: 10, // 每页条数
            total: 10, // 总条数
            flag: true
        }
    },
    methods: {
        // 网站信息
        async getSet() {
            const { data: res } = await this.$http.get('/set')
            this.webInfo = res.data[0]
        },
        // 轮播
        async getSwiperList() {
            const { data: res } = await this.$http.get('/swiper_list')
            this.swiperArr = res.data
        },
        // 热门推荐
        async getHotList() {
            const { data: res } = await this.$http.get('/hot_list')
            this.hotList = res.data.slice(0,10) // 截取数组
        },
        // 站长推荐
        async getAllList() {
            const { data: res } = await this.$http.get('/getAll', {
                params: { page_num: this.page_num, page_size: this.page_size }
            })
            this.allList = res.data
            this.total = res.paging.total
            // 总页数小于1，则不显示分页
            if (this.total / this.page_size <= 1) {
                this.flag = false
            }
        },
    },
    created() {
        this.getSet()
        this.getSwiperList()
        this.getHotList()
        this.getAllList()
    }
}
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 3.5rem;
    background-color: #ff7575;
    text-align: center;
    line-height: 3.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    position: fixed;
    max-width: 750px;
    z-index: 99;
}
.my-swipe {
    width: 100%;
    height: 15rem;
    padding-top: 3.5rem;
}
// 公告
.van-notice-bar {
    border-radius: 0.5rem;
    color: #ff5a5e;
    font-size: 1.5rem;
    line-height: 1.5rem;
    height: 3.5rem;
    margin-top: 1rem;
}
.content-box {
    padding: 1rem 1rem 0 1rem;
}
.tools-content {
    margin-top: 1rem;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 0 10px #dedede;
}
// 分页
.van-pagination {
    padding: 2rem;
}
</style>