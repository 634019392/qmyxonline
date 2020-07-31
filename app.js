import cache from './utils/Cache.js';
import Http from './utils/Http.js';
import auth from './utils/Auth.js';

const http = new Http;
let config = require('./config');

App({
    // 生命周期 它是小程序中第1个执行方法
    onLaunch() {
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

    },
    globalData: {
        userInfo: {
            openid: '',
            session_id: '',
        }
    },
});