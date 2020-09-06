import cache from '../../utils/Cache.js';
import auth from '../../utils/Auth.js';

let config = require('../../config');
const app = getApp();
Page({

    data: {
        houseOutlines: [], // 项目概要图片
        imgList: [],
        tag: [],
        Hei: "",          //这是swiper要动态设置的高度属性
        floorstatus: false, // 回到顶部，默认不显示
        is_marketing: false, // 默认未开启全民营销
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
                    data.house_floors.map(ret => {
                        that.data.imgList = [...that.data.imgList, ret.floor_plan]
                    });
                    data.house_outlines.map(ret => {
                        that.data.houseOutlines = [...that.data.houseOutlines, ret.outline_pic]
                    });

                    // 属于全民营销楼盘的给与推荐按钮
                    if (data.is_marketing == '1') {
                        that.setData({
                            is_marketing: true
                        })
                    }

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
                        covered_area: data.mating.covered_area,
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
                        house_floors: data.house_floors,
                        tag: data.tag,
                        house_outlines: data.house_outlines
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
        // console.log(this.data);
    },
    // 回到顶部1：获取滚动条当前位置
    onPageScroll: function (e) {
        // console.log(e)
        if (e.scrollTop > 300) {
            this.setData({
                floorstatus: true
            });
        } else {
            this.setData({
                floorstatus: false
            });
        }
    },
    // 回到顶部2：点击到到顶部
    scroTop: () => {
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
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
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //预览图片，放大预览
    preview(event) {
        // console.log(event);
        let currentUrl = event.currentTarget.dataset.src;
        let tag = event.currentTarget.dataset.tag;
        let urls = '';
        if (tag == 'house_outlines') {
            urls = this.data.houseOutlines
        }
        if (tag == 'floor_plan') {
            urls = this.data.imgList
        }
        // console.log(urls);
        wx.previewImage({
            current: currentUrl, // 当前显示图片的http链接
            urls: urls, // 需要预览的图片http链接列表
            // complete: (ret) => {
            //     console.log(ret);
            // }
        })
    }

});