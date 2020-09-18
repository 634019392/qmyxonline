import cache from '../../utils/Cache.js';
import auth from '../../utils/Auth.js';
//声明工具类对象
let util= require('../../utils/Util.js')
let config = require('../../config');
const app = getApp();

// pages/landlord/landlord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        option1: [
            { text: '全部商品', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 },
        ],
        value1: 0,
        truename: '',
        age: '',
        sex: '女',
        phone: '',
        card_alert_six: '',
        houses: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!auth.isBroker()) {
            wx.showToast({
                title: '请先经纪人认证,2秒后跳转 我的',
                icon: 'none',
                duration: 5000,
                mask: true
            });
            setTimeout(ret => {
                wx.switchTab({
                    url: '/pages/home/home'
                })
            },3000);
            return false;
        }
        let that = this;
        auth.authRequest(config.boker_houses, '', 'GET').then(res => {
            if (res.status === 1000) {
                that.setData({
                    houses: res.data
                })
            }
        })
    },
    checkboxChange(e) {
        const houses = this.data.houses;
        const values = e.detail.value;
        for (let i = 0, lenI = houses.length; i < lenI; ++i) {
            houses[i].checked = false;

            for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                if (houses[i].id == values[j]) {
                    houses[i].checked = true;
                    break
                }
            }
        }

        this.setData({
            houses: houses
        })
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
    // 提交
    reaveSubmit: util.throttle(function(e) {
        console.log(e);return false;
        // checkbox取值
        let house_ids = '';
        if (this.data.houses.length > 0) {
            this.data.houses.map((item, index) => {
                if (item.checked == true) {
                    house_ids += item.id + ','
                }
            })
        }
        let data = {
            openid: cache.get('openid'),
            phone: e.detail.value.phone,
            card_alert_six: e.detail.value.card_alert_six,
            sex: e.detail.value.sex,
            age: e.detail.value.age,
            truename: e.detail.value.truename,
            house_ids: house_ids,
        };
        auth.authRequest(config.reave, data).then(res => {
            if (res.status === 1000) {
                wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    success: () => {
                        setTimeout(() => {
                            wx.switchTab({
                                url: '/pages/index/index',
                            })
                        }, 1000);
                    }
                });
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'none'
                })
            }
        })
    }, 3000),
});