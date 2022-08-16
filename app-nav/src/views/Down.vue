<template>
    <div class="down-container">
        <!-- 返回 -->
        <van-nav-bar
            :title="dataObj.title"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
        />
        <!-- 主体内容 -->
        <div class="box-content">
            <div class="tool">
                <div class="pic" :style="`background-image: url(${dataObj.pic})`"></div>
                <div class="info">
                    <span class="title">{{ dataObj.title }}</span>
                    <span class="num">{{ dataObj.num }}次下载</span>
                    <a :href="dataObj.url" class="download">极速下载</a>
                </div>
                <!-- 二维码 -->
                <div class="qrcode" ref="qrCodeUrl"></div>
            </div>
            <div class="dt">
                <span class="dt-title">应用描述</span>
            </div>
            <span class="details">{{ dataObj.details }}</span>
            <!-- 热门推荐 -->
            <div class="hot-tool">
                <Tools :dataList="hotList" :dtitle="'推荐应用'"></Tools>
            </div>
        </div>
    </div>
</template>

<script>
import Tools from "@/components/tools.vue";
// 二维码生成
import QRCode from 'qrcodejs2'

export default {
    components: {
        Tools,
    },
    data() {
        return {
            dataObj: "",
            hotList: [],
        };
    },
    methods: {
        // 二维码
        creatQrCode() {
            this.$refs.qrCodeUrl.innerHTML = ""//词句代码将之前的二维码清空了
            var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                text: this.dataObj.url, // 需要转换为二维码的内容
                width: 80,
                height: 80,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            })
        },
        // 热门推荐
        async getHotList() {
            const { data: res } = await this.$http.get('/list')
            let arr = res.data
            let randomArr = arr.sort(() => Math.random()-0.5) // 生成随机数组
            this.hotList = randomArr.slice(0,4) // 截取数组
        },
    },
    mounted() {
        this.creatQrCode();
    },
    created() {
        this.dataObj = JSON.parse(localStorage.getItem("rowData"));
        this.getHotList()
    },
};
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
.box-content {
    padding: 0 1rem;
    .dt {
        display: flex;
        align-items: center;
        padding-bottom: .5rem;
        .dt-title {
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-left: .5rem;
        }
        &::before {
            content: "";
            display: block;
            width: 0;
            height: .8rem;
            border: 2px solid #ff5a5e;
        }
    }
    .details {
        color: #666;
        font-size: 15px;
        line-height: 20px;
    }
}
//
.tool {
    position: relative;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    .pic {
        width: 8rem;
        height: 100%;
        background-size: cover;
        border-radius: 10px;
        overflow: hidden;
    }
    .info {
        flex: 1;
        height: 100%;
        padding-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
            font-size: 1.5rem;
            font-weight: 700;
        }
        .num {
            color: #909090;
            font-size: 16px;
        }
        .details {
            width: 15rem;
            font-size: 1rem;
            color: #909090;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .download {
            width: 8rem;
            height: 2.5rem;
            background-color: #ff7575;
            border-radius: 2.5rem;
            color: #fff;
            font-size: 14px;
            text-align: center;
            line-height: 2.5rem;
            cursor: pointer;
        }
    }
    .qrtitle {
        font-size: 12px;
        position: absolute;
        right: 0;
        bottom: 0;
    }
}
.hot-tool {
    margin-top: 2rem;
}
</style>