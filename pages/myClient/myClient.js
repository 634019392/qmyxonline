import auth from '../../utils/Auth.js';
import cache from '../../utils/Cache.js';
import config from '../../config.js';

// pages/home/home.js

Page({
    /**
     * 页面的初始数据
     */
    data: {
        height: '',
        currentIndex: 0,
        "firstList": [],
        "secondList": [],
        "thirdList": [],
        "fourthList": [],
        "fifthList": [],
    },

    //swiper切换时会调用
    pagechange: function (e) {
        if ("touch" === e.detail.source) {
            let currentPageIndex = this.data.currentIndex
            currentPageIndex = (currentPageIndex + 1) % 3
            this.setData({
                currentIndex: currentPageIndex
            })
        }
    },
    //用户点击tab时调用
    titleClick: function (e) {
        let currentPageIndex =
            this.setData({
                //拿到当前索引并动态改变
                currentIndex: e.currentTarget.dataset.idx
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 页面切换的高度固定死了,更改为根据当前手机屏幕的高度来算
        let that = this;
        // 获取系统信息
        wx.getSystemInfo({
            success: function (res) {
                // 获取可使用窗口宽度
                let clientHeight = res.windowHeight;
                // 获取可使用窗口高度
                let clientWidth = res.windowWidth;
                // 算出比例
                let ratio = 750 / clientWidth;
                // 算出高度(单位rpx)
                let height = clientHeight * ratio;
                // 设置高度
                that.setData({
                    height: height + 400 // 多留点空间出来+了400
                });
            }
        });

        // 获取后台我的客户信息
        let openid = cache.get('openid');
        auth.authRequest(config.my_client, {openid}).then(res => {
            if (res.status === 1000) {
                res.data.map((res) => {
                    let buyer_id = res.buyer_id;
                    let truename = res.buyer_arr.truename;
                    let phone = res.buyer_arr.phone;
                    let house = res.house_arr.name;
                    let info = {
                        buyer_id,truename,phone,house
                    };
                    switch(res.status) {
                        case '1':
                            that.setData({
                                'firstList': [...that.data.firstList,info]
                            });
                            break;
                        case '2':
                            that.setData({
                                'secondList': [...that.data.secondList,info]
                            });
                            break;
                        case '3':
                            that.setData({
                                'thirdList': [...that.data.thirdList,info]
                            });
                            break;
                        case '4':
                            that.setData({
                                'fourthList': [...that.data.fourthList,info]
                            });
                            break;
                        case '5':
                            that.setData({
                                'fifthList': [...that.data.fifthList,info]
                            });
                            break;
                        default:

                    }
                });
            }
        });
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

    }


});