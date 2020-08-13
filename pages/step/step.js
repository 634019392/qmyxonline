// pages/index/getUser.js
import cache from "../../utils/Cache";
import auth from "../../utils/Auth";
import config from "../../config";

const app = getApp();  // 引入app

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    imgH: function (e) {
        var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
        var imgh = e.detail.height;　　　　　　　　　　　　　　　　//图片高度
        var imgw = e.detail.width;
        var swiperH = winWid * imgh / imgw + "px"　　　　　　　　　　//等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
        this.setData({
            Hei: swiperH　　　　　　　//设置高度
        })
    },

});