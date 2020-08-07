import cache from '../../utils/Cache.js';
import auth from '../../utils/Auth.js';

let config = require('../../config');
const app = getApp();

// pages/landlord/landlord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        truename: '',
        age: '',
        sex: '女',
        userinfo: '',
        phone: '',
        phone_node: '',
        id_card: '',
        id_card_img: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let config_param = cache.get('config_param');
        if (config_param) {
            let is_phone_auth = config_param.is_phone_auth;
            if (is_phone_auth == 1) {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
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
    onUnload: function (res) {
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
    // radio修改的情况
    radioChange(e) {
        let key = e.target.dataset.name;
        let val = e.detail.value;
        this.setData({
            [key]: val
        })
    },
    /*
    * input框中需要添加属性 data-name="为data中的key" bindinput="bindKeyInput"
    * 事实更新input框中数值
    */
    bindKeyInput(e) {
        let key = e.target.dataset.name;
        let val = e.detail.value;
        this.setData({
            [key]: val
        })
    },
    /**
     * 获取用户微信绑定手机号码
     */
    getPhoneNumber(e) {
        console.log(e);
        var msg = e.detail.errMsg;
        var that = this;
        var sessionID = cache.get('session_id'),
            encryptedDataStr = e.detail.encryptedData,
            iv = e.detail.iv;
        if (msg == 'getPhoneNumber:ok') {
            wx.checkSession({
                success: function () {
                    that.deciyption(sessionID, encryptedDataStr, iv);
                },
                fail: function () {
                    auth.login();
                    // wx.login({
                    //     success: res => {
                    //         console.log(res, 'sessionkey过期')
                    //         wx.request('url', {code: res.code}, function (res) {
                    //             var userinfo = res.data.data;
                    //             wx.setStorageSync('userinfo', userinfo);
                    //             that.setData({
                    //                 userinfo: userinfo
                    //             });
                    //             that.deciyption(userinfo.Session_key, encryptedDataStr, iv);
                    //         })
                    //     }
                    // })
                }
            })

        }
    },
    deciyption(sessionID, encryptedDataStr, iv) {
        let data = {
            sessionID: sessionID,
            encryptedDataStr: encryptedDataStr,
            iv: iv
        };
        auth.authRequest('check_data/phone_num', data).then(ret => {
            this.setData({
                phone: ret.phoneNumber
            });
        });
    },
    /**
     * 发送验证码
     */
    sendCode(ret) {
        let phone = this.data.phone;
        let info = {
            phone,
            openid: cache.get('openid')
        };
        if (phone === '') {
            wx.showToast({
                title: '手机号码不能为空',
                icon: 'none',
                duration: 1000
            });
            return false;
        }
        auth.authRequest(config.bokers_send_code, info).then(res => {
            if (res.status == 1000) {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                });
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                });
            }
        })
    },
    // // 上传图片
    // upFile() {
    //     let that = this;
    //     wx.chooseImage({
    //         count: 3,
    //         sizeType: ['original', 'compressed'],
    //         sourceType: ['album', 'camera'],
    //         success: res => {
    //             if (res.errMsg == 'chooseImage:ok') {
    //                 let token = auth.getRequestToken();
    //                 res.tempFilePaths.map(tempFile => {
    //                     wx.uploadFile({
    //                         url: config.api_host + config.upfile,
    //                         filePath: tempFile,
    //                         name: 'file',
    //                         header: {'Authorization': token},
    //                         timeout: 5000,
    //                         success (res){
    //                             // json字符串转为json对象
    //                             let json = JSON.parse(res.data);
    //                             that.setData({
    //                                 // ...参数的展开
    //                                 id_card_img: [...that.data.id_card_img, json.url]
    //                             })
    //                         }
    //                     })
    //                 });
    //             }
    //         }
    //     })
    // },
    // 提交
    brokerSubmit(e) {
        let data = e.detail.value;
        data.id_card_img = this.data.id_card_img;
        data.openid = cache.get('openid');
        auth.authRequest(config.bokers_check, data).then(res => {
            if (res.status === 1000) {
                if (res.data.is_phone_auth == 1)  {
                    cache.forever('config_param', {is_phone_auth: res.data.is_phone_auth});
                }
                wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    duration: 2000,
                    success: () => {
                        setTimeout(() => {
                            wx.reLaunch({
                                url: '/pages/index/index',
                            })
                        }, 2000);
                    }
                });
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000,
                });
            }
        })
    }
});