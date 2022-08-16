<template>
    <div class="main-nav">
        <van-tabs
            swipeable
            lazy-render
            color="#ff5a5e"
            line-width="1rem"
            line-height="0.5rem"
            background="none"
            title-inactive-color="#666"
            title-active-color="#ff5a5e"
            @click="getListClass">
            <van-tab v-for="item in classArr" :title="item.classify" :key="item.id"></van-tab>
        </van-tabs>
        <!-- 应用列表 -->
        <van-grid :column-num="4" :gutter="10" :border="false">
            <van-grid-item v-for="item in dataList" :key="item.id">
                <div class="item-image" @click="toPath(item.id, item)">
                    <img :src="item.pic" alt="">
                </div>
                <span class="item-title">{{ item.title }}</span>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
export default {
    data() {
        return {
            classArr: [
                { id: 1, classify: "分类1" },
                { id: 2, classify: "分类2" },
                { id: 3, classify: "分类3" },
            ],
            dataList: "",
        }
    },
    methods: {
        // 获取分类
        async getSet() {
            const { data: res } = await this.$http.get('/classify')
            this.classArr = res.data
            this.getListClass("", res.data[0].classify)
        },
        // 获取对应分类的应用
        async getListClass(name, title) {
            const { data: res } = await this.$http.get('/list_class',{
                params: {class: title}
            })
            this.dataList = res.data
        },
        // 跳转至下载页
        toPath(id, itemInfo) {
            this.$router.push({
                name: "download",
                query: { id: id }
            })
            localStorage.setItem("rowData", JSON.stringify(itemInfo))
        }
    },
    created() {
        this.getSet()
    }
}
</script>

<style lang="less" scoped>
.main-nav {
    box-shadow: 0 0 10px #dedede;
    padding: 1rem 0;
    border-radius: 5px;
}
// 导航
/deep/ .van-tab {
    justify-content: none;
    -webkit-justify-content: none;
    flex: none;
    -webkit-box-flex: none;
    margin-right: 1.5rem;
    // padding: 0;
    padding-left: 10px;
}
/deep/ .van-tab--active {
    font-weight: bold;
}
/deep/ .van-tab__text--ellipsis {
    font-size: 16px;
    font-weight: bold;
    line-height: 2.5rem;
}
/deep/ .van-tabs__nav--line {
    box-sizing: content-box;
    height: auto;
    padding-bottom: 20px;
}
/deep/ .van-tabs__wrap {
    height: 4rem;
}
// 应用列表
/deep/ .van-grid-item__content {
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px #dedede;
}
.item-image {
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    overflow: hidden;
    border-radius: 1rem;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .5s;
        &:hover {
            transform: scale(1.2);
        }
    }
}
.item-title {
    color: #666;
    font-size: 1.2rem;
    padding-top: .5rem;
}
</style>