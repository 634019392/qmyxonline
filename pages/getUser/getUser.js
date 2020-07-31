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

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    getUserInfo(evt) {
        // console.log(app.globalData);
        if (evt.detail.errMsg != 'getUserInfo:ok') {
            return false;
        } else {
            let userData;
            userData = evt.detail.userInfo;
            cache.forever('userInfo', userData);
            let openid = cache.get('openid');
            let data = {
                openid: openid,
                user_info: userData,
                type: 'edit_user'
            };
            auth.authRequest(config.user, data, 'POST').then((ret) => {
                if (ret.status === 1000) {
                    wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000,
                        success: (ret) => {
                            // console.log(getCurrentPages());
                            wx.switchTab({
                                url: '/pages/home/home',
                            });
                        }
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    },

});