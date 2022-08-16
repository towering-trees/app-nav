module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 添加以下代码
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
