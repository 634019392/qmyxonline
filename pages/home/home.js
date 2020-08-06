import auth from '../../utils/Auth.js';
import cache from '../../utils/Cache.js';
const app = getApp();
// pages/home/home.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //tabbar
        tabbar: {},
        is_phone_auth: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.editTabbar();// 自定义toBar
        this.getUserInfo()
        if (auth.isBroker()) {
            this.setData({
                is_phone_auth: 1
            })
        }
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 不存在userInfo跳转授权页面
    getUserInfo() {
        let that = this;
        let userInfo = cache.get('userInfo');

        if (!userInfo) {
            wx.redirectTo({
                url: '/pages/getUser/getUser',
            })
        } else {
            that.setData({
                userInfo: userInfo
            })
        }
    }


})