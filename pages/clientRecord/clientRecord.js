import auth from '../../utils/Auth.js';
import cache from '../../utils/Cache.js';
import config from '../../config.js';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        steps: [
            {
                text: '暂无跟进方式',
                desc: '暂无跟进动态描述信息',
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let myClient = JSON.parse(options.item);
        this.setData({
            myClient: myClient
        });
        this.client_records(myClient.recommender_id);
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

    client_records(recommender_id) {
        let that = this;
        auth.authRequest(config.client_records,{recommender_id:recommender_id}, 'POST').then(res => {
            if (res.status === 1000) {
                that.setData(res.data);
            } else {
                console.log('error');
            }
        })
    }


});