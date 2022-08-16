<template>
    <div class="tools-container">
        <div class="dt">
            <span class="dt-title">{{ dtitle }}</span>
        </div>
        <!-- 推荐应用列表 -->
        <div class="tool" v-for="item in dataList" :key="item.id">
            <div class="pic" :style="`background-image: url(${item.pic})`"></div>
            <div class="info">
                <div class="title">{{ item.title }}</div>
                <span class="num">{{ item.num }}次下载</span>
                <span class="details">{{ item.details }}</span>
            </div>
            <a :href="item.url" class="download">
                <van-icon name="down" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ["dataList", "dtitle"],
};
</script>

<style lang="less" scoped>
.tools-container {
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
}
.tool {
    position: relative;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    .pic {
        width: 6rem;
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
            position: relative;
            font-size: 1.5rem;
            font-weight: 700;
            &::after {
                content: "推荐";
                position: absolute;
                top: 6px;
                font-size: 12px;
                font-weight: normal;
                color: rgb(255, 255, 255);
                height: 20px;
                line-height: 20px;
                padding: 0px 10px;
                margin: 0px 0px 0px 5px;
                background: rgb(255, 117, 117);
                border-radius: 0px 30px 35px 50px;
            }
        }
        .num {
            font-size: 1.2rem;
        }
        .details {
            width: 15rem;
            font-size: 1rem;
            color: #909090;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .download {
        position: absolute;
        right: 1rem;
        width: 2rem;
        height: 2rem;
        background-color: rgba(0,0,0,0);
        border: 4px solid #ff5a5e;
        border-radius: 2rem;
        text-align: center;
        cursor: pointer;
        animation: tada 1s .2s ease both infinite;
        -webkit-animation: tada 1s .2s ease both infinite;
        -moz-animation: tada 1s .2s ease both infinite;
        .van-icon {
            color: #ff5a5e;
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 2rem;
        }
    }
    // 定义动画
    @keyframes tada{0%{-webkit-transform:scale(1)}10%,20%{-webkit-transform:scale(0.9) rotate(-3deg)}30%,50%,70%,90%{-webkit-transform:scale(1.1) rotate(3deg)}40%,60%,80%{-webkit-transform:scale(1.1) rotate(-3deg)}100%{-webkit-transform:scale(1) rotate(0)}}
    @-webkit-keyframes tada{0%{-webkit-transform:scale(1)}10%,20%{-webkit-transform:scale(0.9) rotate(-3deg)}30%,50%,70%,90%{-webkit-transform:scale(1.1) rotate(3deg)}40%,60%,80%{-webkit-transform:scale(1.1) rotate(-3deg)}100%{-webkit-transform:scale(1) rotate(0)}}
    @-moz-keyframes tada{0%{-moz-transform:scale(1)}10%,20%{-moz-transform:scale(0.9) rotate(-3deg)}30%,50%,70%,90%{-moz-transform:scale(1.1) rotate(3deg)}40%,60%,80%{-moz-transform:scale(1.1) rotate(-3deg)}100%{-moz-transform:scale(1) rotate(0)}}
}
</style>