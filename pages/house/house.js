import cache from '../../utils/Cache.js';
import auth from '../../utils/Auth.js';

let config = require('../../config');
const app = getApp();
Page({

    data: {
        Hei: "",          //这是swiper要动态设置的高度属性
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        /*
         * 查询楼盘详情
         */
        let house_id = options.house_id;
        if (house_id) {
            auth.authRequest(config.house_show,{house_id:house_id}, 'GET').then(res => {
                if (res.status === 1000) {
                    let data = res.data;

                    that.setData({
                        name: data.name,
                        address: data.address,
                        img: data.img,
                        phone: data.phone,
                        reference: data.reference,
                        open_time: data.mating.open_time,
                        feature: data.mating.feature,
                        type: data.mating.type,
                        decor: data.mating.decor,
                        floor_space: data.mating.floor_space,
                        property_right: data.mating.property_right,
                        property_name: data.mating.property_name,
                        greening: data.mating.greening,
                        plot: data.mating.plot,
                        delivery_time: data.mating.delivery_time,
                        traffic: data.mating.traffic,
                        education: data.mating.education,
                        medical: data.mating.medical,
                        business: data.mating.business,
                        other: data.mating.other,
                        house_floors: data.house_floors
                    });
                } else {
                    console.log('error');
                }
            })
        } else {
            wx.showToast({
                title: '楼盘信息未查询到,3秒后返回首页',
                icon: 'none',
                duration: 3000,
                success: (ret) => {
                    setTimeout(() => {
                        wx.switchTab({
                            url: '/pages/index/index',
                        });
                    }, 3000)
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    scroll(e) {
        // console.log(e)
    },
    scroTop: () => {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
    },
    imgH: function (e) {
        var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
        var imgh = e.detail.height;　　　　　　　　　　　　　　　　//图片高度
        var imgw = e.detail.width;
        var swiperH = winWid * imgh / imgw + "px";　　　　　　　　　　//等fang.1314000.cn/zfw/page-my-back.png比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
        this.setData({
            Hei: swiperH　　　　　　　//设置高度
        })
    },
    reaveBuyer: function (ret) {
        wx.navigateTo({
            url: '/pages/reave/reave'
        })
    }
});