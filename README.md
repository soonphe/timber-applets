# timber-applets

## 项目介绍（Project Introduction）

项目取名timber——`木材`，寓意人类从刀耕火种逐渐进化的源头，星星之火，可以燎原，愿这个项目也可以成为开发者入门的源头。

这是一个实现`0-1Learning`这个项目所有的知识点的实现项目，包括的Java backend(后端)，web frontend(前端)，Android App，ios App、小程序等一整套的项目合集，可以让你一次性接触到任何一端的项目开发流程是怎么样的（yes,so cool）

你可以选择从`0-1`实现任何一端开始学习项目开发，也可以先写好后端服务及接口、再写前端、和App等项目。

任何一端的项目都可以拷贝到本地直接运行，构建你自己的本地服务。

如果想搞懂更多的项目知识体系，更多项目所有技术文档都在 [0-1Learning](http://github.com/soonphe/0-1Learning) 中有完整介绍，欢迎前往阅读。

### 设备支持（Equipment support）

设备支持：`java`,`web`、`android`、`ios`、`小程序`

### 项目地址（Project Address）

- java backend：[timber](http://github.com/soonphe/timber)
- web frontend：[timber-web](http://github.com/soonphe/timber-web)
- android APP：[timber-android](http://github.com/soonphe/timber-android)
- ios App：[timber-ios](http://github.com/soonphe/timber-ios)
- 小程序：[timber-applets](http://github.com/soonphe/timber-applets)

### 业务支持（Business Support）

- 版本管理：版本管理，版本下发，设备更新
- 广告业务：支持广告智能投放，自动上架与下架，广告覆盖有效统计
- 用户业务：用户侧业务支持
- 电影业务：对接xx电影网，本地上传电影
- 视频业务：小视频点播
- 书吧小说：文件上传和爬虫抓取
- 音乐业务：音乐发布、播放、下载
- 游戏业务：html游戏
- 餐饮业务：餐品发布，购买订餐，财务结算
- 城市业务：城市个性化推荐，城市介绍，衣食住行
- 新闻文章：新闻富文本排版，下发阅读，定期抓取

### 业务功能模块（functional module）

```
├── 系统模块
    ├── 用户统一管理后台系统UUM，用户、登录、
    └── 权限系统模块
├── 业务模块
    ├── 广告模块
    ├── 电影模块
    ├── 视频模块
    ├── 小说模块
    ├── 新闻模块
    ├── 游戏模块
    └── 视频模块
├── 搜索模块
├── 三方功能模块
└── 数据模块
    ├── 埋点模块
    └── 统计模块
```

### 高可用分布式系统架构（Highly available distributed system architecture）

![高可用分布式系统架构](docs/static/architecture/highly_available_architecture.png "高可用分布式系统架构")

### 系统技术栈（System Technology Stack）

![系统技术栈](docs/static/architecture/system_technology_stack.png "系统技术栈")

### 项目结构（Project Structure）

```
timber-applets
├── apis                  // 网络请求封装*
  ├── app.js  
  ├── ...
  └── request.js          // get/post请求封装
├── assets                // 静态文件
├── component-demos       // 组件展示
├── components            // 可复用组件*
│   ├── async-button      // 异步按钮
│   ├── async-switch      // 异步切换器
│   ├── collapse          // 可折叠容器
│   ├── load-more         // 加载更多
│   ├── no-data           // 暂无数据
│   ├── panel             // 带导航标题的面板
│   ├── popup             // 底部弹出层
│   ├── rate              // 可评半星的评分组件
│   ├── search-bar        // 带遮罩的搜索框
│   ├── send-code         // 发送验证码按钮
│   ├── spinner           // 加载中动画
│   ├── sticky            // 固定页头
│   ├── sticky-2          // 固定页头的另一种实现
│   ├── tab-bar           // 标签页
│   ├── toast             // 弹出提示
│   └── toptip            // 顶部提示
├── docs                  // 文档
├── images                // 图标
├── pages                 // 页面，子页面在父页面的children文件夹中
│   ├── ...               // 页面...
│   └─components          // 与业务相关的特殊组件
├── styles                // 样式
├── templates             // 模板
│   ├── library-list      // 图书馆列表
│   ├── page-status-indicator // 页面加载状态，带有一个“重新加载”按钮
│   └── showcase          // 图书项目
└── utils                 // 辅助模块
    ├── biz-helper.wxs    // 业务相关辅助函数，用于wxml中
    ├── constant.js       // 业务常量
    ├── constant.wxs      // 业务常量，用于wxml中
    ├── es6-promise.js    // Promise语法支持
    ├── event.js          // 全局事件
    ├── permission.js     // 登录鉴权
    ├── promise-polyfill.js // Promise.finally()语法
    ├── promisify.js      // 微信小程序API Promise化
    ├── qrcode.js         // 二维码生成
    ├── tip.js            // 使用帮助
    ├── utils.js          // 辅助函数
    ├── validator.js      // 正则校验器
    └── fundebug.js       // 错误监控
├── app.js -- app入口
├── app.json -- 全局配置
├── app.wxss -- 全局css
├── project.config.json -- 项目配置文件
├── project.private.config.json -- 项目私有配置文件。此文件中的内容将覆盖 project.config.json 中的相同字段
├── sitemap.json
└── README.md -- 说明

备注：标 * 的为重点模块
```

### 项目架构（System Architecture）

#### 1.基础项目架构（Base Framework）

- 基于微信基础库 2.25.3

#### 2.项目组件库（Project Widget Library）

![组件展示](./assets/component.png)

#### 3.工具库（Tools Library）

### 工作进度（Work Progress）

1. ## 公众号

`0-1Learning`项目全套学习教程连载中，关注公众号「**罗晓胜**」第一时间获取。

加微信群交流，公众号后台回复「**加群**」即可。

![公众号图片](docs/static/common/luoxiaosheng_wechat_common.jpg)
