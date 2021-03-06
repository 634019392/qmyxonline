import cache from '../../utils/Cache.js';
import auth from '../../utils/Auth.js';
//声明工具类对象
let util= require('../../utils/Util.js');
let config = require('../../config');
const app = getApp();
// pages/landlord/landlord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        columns: [
            // { text: '楼盘名称',house_ids: 0 },
            // { text: '楼盘名称1',house_ids: 1 }
        ],
        show: false,
        checked: true,
        truename: '',
        age: '',
        sex: '女',
        phone: '',
        card_alert_six: '',
        house: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 从楼盘详情页跳转过来设置选择楼盘
        let house = {house_ids: options.house_ids, name: options.name};
        this.setData({house});

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
                res.data.map((item, index) => {
                    let text = item.name+item.fee_text;
                    let house_ids = item.id;
                    let info = {text, house_ids};
                    that.setData({
                        'columns': [...that.data.columns, info]
                    });
                });
            }
        })
    },
    // 提交
    reaveSubmit: util.throttle(function(e) {
        let postData = this.data;
        // checkbox取值
        let house_ids = '';
        let data = {
            openid: cache.get('openid'),
            phone: postData.phone,
            card_alert_six: postData.card_alert_six,
            sex: postData.sex,
            age: postData.age,
            truename: postData.truename,
            house_ids: postData.house.house_ids,
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
    }, 1500),
    // 设置性别
    onChangeSex({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked: detail });
        if (detail) {
            this.setData({ sex: '女' });
        } else {
            this.setData({ sex: '男' });
        }
    },
    // 打开popup弹出层
    showPopup() {
        this.setData({ show: true });
    },
    // 关闭popup弹出层
    onClose() {
        this.setData({ show: false });
    },
    // popup弹出层中的确定按钮
    onConfirm(event) {
        let res = event.detail.value;
        let house_name = res.text;
        let house_ids = res.house_ids;
        let house_info = {name: house_name, house_ids};
        this.setData({house: house_info});
        this.onClose();
    },
    // popup弹出层中的取消按钮
    onCancel() {
        this.onClose();
    },
});