const path = require("path");
const myTheme = path.resolve(__dirname, "src/assets/style/vant-theme/my-theme.less");
module.exports = {
    publicPath: '', // 项目打包发布上线
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import "${myTheme}";`
                }
            },
        }
    },
}