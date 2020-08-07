## 基础配置
#####1.配置config.js
host和api_host
微信公众号---小程序中配置开发服务器域名

#####2.配置project.config.json
"appid": "wxc5fe22aadc4a0c8e",
"projectname": "yftlocal",

#####3.新增自定义toBar
参考地址:`https://blog.csdn.net/ChibiMarukoChan/article/details/85232281?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param`
以index页面为例
1.app.json中的tabBar.list加入toBar地址
2.app.js中的globalData.tabBar.list加入toBar地址
3.index.json中加入
```javascript
{
  "usingComponents": {
    "tabbar": "../../tabbarComponent/tabbar"
  }
}
```
4.index.wxml中加入`<tabbar tabbar="{{tabbar}}"></tabbar>`
5.index.js中data加入tabbar:{}并onload方法中调用wx.hideTabBar();和app.editTabbar();
