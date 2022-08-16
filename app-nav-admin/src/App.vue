<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style lang="less">
body {
    font-family: "PingFang SC", "Lantinghei SC", "Microsoft YaHei","Helvetica Neue", "Open Sans";
}
html,body,#app{
    height: 100%;
    margin: 0;
    padding: 0;
}
.el-breadcrumb{
    margin-bottom: 15px;
    font-size: 12px;
}
.el-card{
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-table{
    margin-top: 15px;
    font-size: 12px;
}
.el-pagination{
    margin-top: 15px;
}
</style>