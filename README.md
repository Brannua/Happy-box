# 开心盒子

> Author: 东北农业大学 微机1705 刘培杰

> 一个包含电影票预定、音乐播放、个人相册的移动端webApp

- 快速启动项目

  ```shell
    npm install     // Project setup
    npm run serve   // Compiles and hot-reloads for development
    npm run build   // Compiles and minifies for production
    npm run lint    // Lints and fixes files
  ```

- 项目预览

![](https://s1.ax1x.com/2020/04/29/J7QbPe.jpg)

- 项目文件结构

  ```
    .
    ├── babel.config.js             // babel配置，es6 -> es5
    ├── LICENSE                     // 开源协议
    ├── package.json                // 项目配置，依赖
    ├── public
    │   ├── data                    // 项目模拟数据
    │   ├── favicon.ico
    │   ├── img                     // 项目模拟数据
    │   ├── index.html
    │   └── lrc                     // 项目模拟数据
    ├── README.md                   // 说明书
    └── src                         // 项目源码
        ├── App.vue                 // 根组件
        ├── assets                  // 项目静态资源
        │   ├── css
        │   │   └── reset.css
        │   ├── img
        │   │   └── loading.gif
        │   └── js
        │       ├── debounce.js
        │       └── rem.js
        ├── components              // 公共组件
        │   ├── Footer.vue
        │   └── Header.vue
        ├── main.js                 // js入口文件
        ├── router                  // 路由
        │   └── index.js
        ├── store                   // 状态管理
        │   └── index.js
        └── views                   // 页面组件
            ├── movie
            │   ├── MovieDetail.vue // 电影详情
            │   └── Movie.vue       // 电影列表
            ├── music
            │   ├── MusicList.vue   // 音乐列表
            │   └── Music.vue       // 音乐分类
            └── photo
                ├── PhotoDetail.vue // 相册大图
                └── Photo.vue       // 相册缩略图
  ```

----------------------

## 开发过程踩的坑 & 解决办法

- [路由传参总结移动到了此处](https://blog.csdn.net/Brannua/article/details/105837015)

- [$route & $router总结移动到了此处](https://blog.csdn.net/Brannua/article/details/105836895)

- 上拉加载功能

  - 由于事件监听绑定到了window上，造成无论哪一个组件滚动，都会导致ajax请求的发送，所以在钩子函数beforeDestory中及时取消事件监听

  - 还有监听滚动条滚动的时候，发现下拉一次就发送多个ajax请求，所以我使用函数防抖，解决bug

- header，footer刷新页面或手动改路由造成的状态失效问题

  - 用localStorage缓存

- 用watch和v-if来决定当前页面组件的顶部返回按钮是否显示

- 注意，为了练习vuex，相册数据存到了vuex，页面一刷新数据就没了
