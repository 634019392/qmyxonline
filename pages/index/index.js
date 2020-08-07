import cache from '../../utils/Cache.js';
import auth from '../../utils/Auth.js';

let config = require('../../config');
const app = getApp();
Page({

    data: {
        //tabbar
        tabbar: {},
        houses: [],
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500,
        Hei: "",          //这是swiper要动态设置的高度属性
    },

    /**
     * 页面的初始数据
     */
    // data: {
    //     show: ['', '', '', ''],
    //     showflag: [false, false, false, false],
    //     arrows: ['icon-xiangxia', 'icon-xiangxia', 'icon-xiangxia', 'icon-xiangxia']
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //隐藏系统tabbar
        wx.hideTabBar();
        app.editTabbar();// 自定义toBar

        let that = this;
        wx.request({
            timeout: 8000,
            method: 'get',
            url: config.api_host + config.houses,
            success: res => {
                if (res.data.status === 1000) {
                    that.setData({
                        houses: res.data.data
                    })
                }
            }
        });

        wx.request({
            timeout: 8000,
            method: 'get',
            url: config.api_host + config.advs_img,
            success: res => {
                if (res.data.status === 1000) {
                    that.setData({
                        slideshow: res.data.data
                    })
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let config_param = cache.get('config_param');
        if (config_param) {
            let is_phone_auth = config_param.is_phone_auth;
            if (is_phone_auth == 1) {
                this.setData({
                    'is_phone_auth': true
                })
            }
        }
        // else {
        //     this.setBroker();
        // }
    },
    // 遮罩
    onShadeDiv(evt) {
        let index = evt.currentTarget.dataset.index;
        let show = this.data.show;
        let showflag = this.data.showflag;
        let arrows = this.data.arrows;

        if (showflag[index]) { // 已显示，再次点击隐藏起来
            show[index] = '';
            showflag[index] = false;
            arrows[index] = 'icon-xiangxia';
        } else {
            for (let key in show) {
                if (key == index) {
                    show[key] = 'now';
                    showflag[key] = true;
                    arrows[key] = 'icon-xiangshang';
                } else {
                    show[key] = '';
                    showflag[key] = false;
                    arrows[key] = 'icon-xiangxia';
                }
            }
        }
        this.setData({
            show,
            showflag,
            arrows
        })
    },
    scroTop: () => {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
    },
    onShareAppMessage() {
        return {
            title: 'swiper',
            path: 'page/component/pages/swiper/swiper'
        }
    },
    changeIndicatorDots() {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },

    changeAutoplay() {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },

    intervalChange(e) {
        this.setData({
            interval: e.detail.value
        })
    },

    durationChange(e) {
        this.setData({
            duration: e.detail.value
        })
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
    bindtimeup() {
        wx.showToast({title: '倒计时结束', icon: 'none'})
    },
    /*设置认证经纪人存入cookie中
    * ps:清除缓存、刷新会报错，登录的时候与authRequest出现异步会报错
    * 已不完美解决：通过登录时候放cookie中，点击认证经纪人则跳转首页，此方法荒废*/
    setBroker() {
        auth.authRequest(config.mysql_user).then(res => {
            if (res.data.mysql_user.is_phone_auth == 1) {
                config_param = {is_phone_auth: res.data.mysql_user.is_phone_auth};
                cache.forever('config_param', config_param);
            }
        });
    }
});