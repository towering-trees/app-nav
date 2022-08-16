<template>
    <div id="app">
        <router-view/>
        <div class="footer">
            <!-- 请尊重开发者劳动成果，建议保留开源信息 -->
            <span style="letter-spacing: 1px;">本程序完全开源,可前往 Github/Gitee 给予支持</span>
            <div class="down-url">
                <a href="https://gitee.com/lifeixue/app-nav" target="_blank" style="color: #c71d23">
                    <i class="iconfont icon-gitee"></i>
                    <span>GITEE</span>
                </a>
                <a href="https://github.com/towering-trees/app-nav" target="_blank" style="color: #3e75c3">
                    <i class="iconfont icon-github"></i>
                    <span>GITHUB</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
* {
    padding: 0;
    margin: 0;
}
body {
    font-family: "Microsoft Yahei", sans-serif;
    font-size: 1.5rem;
    color: #202020;
    background-color: #fff;
}
html,
body {
    height: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    // 禁止复制
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
a {
    text-decoration: none;
}
img {
    border: 0;
    vertical-align: middle;
}
em,
i {
    font-style: normal;
}
li {
    list-style: none;
}
button {
    cursor: pointer;
}
// 媒体查询
@media screen and (min-width: 320px)  {
    html {
        /* 当宽度大于等于320px时 html元素的字体大小为*/
        font-size:65%!important;
    }
}
@media screen and (min-width: 750px)  {
    html {
        /* 当宽度大于等于750px时 html元素的字体大小为*/
        font-size:100%!important;
    }
}
#app {
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
}
.footer {
    color: #909090; font-size: 14px; padding: 1rem; text-align: center;
    .down-url {
        padding-top: .5rem;
        a {
            padding: 1rem .5rem;
            font-weight: bold;
            span {
                padding-left: 5px;
            }
        }
    }
}
</style>