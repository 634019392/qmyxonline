import cache from './utils/Cache.js';
import Http from './utils/Http.js';
import auth from './utils/Auth.js';

const http = new Http;
let config = require('./config');

App({
    // 生命周期 它是小程序中第1个执行方法
    onLaunch() {
        //隐藏系统tabbar
        wx.hideTabBar();
        //获取设备信息
        this.getSystemInfo();
        // 登录
        auth.has_login();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //隐藏系统tabbar
        wx.hideTabBar();
    },
    getSystemInfo: function () {
        let t = this;
        wx.getSystemInfo({
            success: function (res) {
                t.globalData.systemInfo = res;
            }
        });
    },
    editTabbar: function () {
        let tabbar = this.globalData.tabBar;
        let currentPages = getCurrentPages();
        let _this = currentPages[currentPages.length - 1];
        let pagePath = _this.route;
        (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
        for (let i in tabbar.list) {
            tabbar.list[i].selected = false;
            (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
        }
        _this.setData({
            tabbar: tabbar
        });
    },
    globalData: {
        systemInfo: null,//客户端设备信息
        userInfo: null,
        tabBar: {
            "backgroundColor": "#ffffff",
            "color": "#979795",
            "selectedColor": "#1c1c1b",
            "list": [
                {
                    "pagePath": "/pages/index/index",
                    "text": "首页",
                    "iconPath": "/images/index.png",
                    "selectedIconPath": "/images/index_active.png"
                },
                {
                    "pagePath": "/pages/reave/reave",
                    "iconPath": "icon/icon_release.png",
                    "isSpecial": true,
                    "text": "推荐"
                },
                {
                    "pagePath": "/pages/home/home",
                    "text": "我的",
                    "iconPath": "/images/home.png",
                    "selectedIconPath": "/images/home_active.png"
                }

            ]
        }
    }

});