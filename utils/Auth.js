// 缓存类
import cache from './Cache.js';

let config = require('../config');

class Auth {
    // 构造方法 单位秒
    constructor() {
        // 当前时间
        this.time = new Date().getTime();
    }

    tt() {
        let time = new Date().getTime();
        console.log(time);
    }

    // 请求样板
    // auth.authRequest('user', {'code': 123}, 'GET').then((ret)=>{
    //     console.log(ret);
    // });
    authRequest(url, data, type = 'POST') {
        let accessToken = this.getToken();
        let that = this;
        this.showLoading('加载中');
        if (this.has_login()) {
            let request_url = config.api_host + url;
            let request_header = 'Bearer ' + accessToken;
            return new Promise((resolve, reject) => {
                return wx.request({
                    timeout: 8000,
                    method: type,
                    url: request_url,
                    data: data,
                    header: {'Authorization': request_header},
                    success: res => {
                        that.hideLoading();
                        resolve(res.data)
                    },
                    fail: ret => {
                        that.hideLoading();
                        reject(ret)
                    }
                });
            })
        }

    }

    // 获取 请求Token
    getRequestToken() {
        let time = new Date().getTime();
        // 从缓存中去除 Token
        let accessToken = cache.get('access_token');
        let expiredAt = cache.get('access_token_expired_at');
        // 如果 token 过期了， 则调用刷新方法
        if (accessToken && time > expiredAt) {
            this.login();
            accessToken = cache.get('access_token');
        }
        return 'Bearer ' + accessToken;
    }

    // 获取 Token
    getToken() {
        let time = new Date().getTime();
        // 从缓存中去除 Token
        let accessToken = cache.get('access_token');
        let expiredAt = cache.get('access_token_expired_at');
        // 如果 token 过期了， 则调用刷新方法
        if (accessToken && time > expiredAt) {
            this.login();
            accessToken = cache.get('access_token')
        }

        return accessToken
    }

    // 登录
    login() {
        let that = this;
        // 不存在给个错误数字
        let loginErrNum = cache.get('loginErrNum');
        if (!loginErrNum) {
            loginErrNum = 1;
            cache.set('loginErrNum', loginErrNum)
        }
        wx.login({
            success({code}) {
                if (code) {
                    that.loginFun(code).then((ret) => {
                        // console.log(ret);
                        // 认证的经纪人设置到cookie
                        if (ret.data.is_phone_auth == 1) {
                            cache.forever('config_param', {is_phone_auth: ret.data.is_phone_auth});
                        }

                        cache.forever('openid', ret.data.openid);
                        cache.forever('access_token', ret.data.token);
                        cache.forever('access_token_expired_at', ret.data.token_expires);
                        cache.forever('session_id', ret.data.session_id);
                        cache.del('loginErrNum');
                        return true;
                    }).catch((error) => {
                        console.log(error);
                        if (error.errMsg === 'request:fail timeout') {
                            // 错4次终止且重置错误数字
                            if (parseInt(loginErrNum) === 4) {
                                wx.showToast({
                                    title: '网络状态较差, 请刷新重试',
                                    icon: 'none',
                                    duration: 3000
                                });
                                cache.del('loginErrNum');
                                return false;
                            }

                            cache.set('loginErrNum', parseInt(loginErrNum) + 1);
                            that.login();
                        } else {
                            console.log(error);
                            wx.showToast({
                                title: '未知错误',
                                icon: 'none',
                                duration: 3000
                            });
                        }

                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            },
            fail(ret) {
                return false;
            }
        });
    }

    // 登录的请求函数
    loginFun(code) {
        let that = this;
        this.showLoading('加载中');
        return new Promise((resolve, reject) => {
            //发起网络请求
            wx.request({
                timeout: 8000,
                method: 'POST',
                url: config.api_host + config.login_url,
                data: {'code': code},
                success: ret => {
                    that.hideLoading();
                    resolve(ret)
                },
                fail: ret => {
                    that.hideLoading();
                    reject(ret)
                }
            })
        })
    }

    // 已经登录的用户或者token过期的用户
    has_login() {
        let time = new Date().getTime();
        // 此处不能使用构造函数中的值，不然第一次加载到缓存中但是构造中是空值
        let expiredAt = cache.get('access_token_expired_at');
        let accessToken = cache.get('access_token');
        let openid = cache.has('openid');
        if (accessToken && openid && time < expiredAt) {
            return true;
        } else {
            this.login();
            return false;
        }
    }

    // 显示加载框
    showLoading(message) {
        if (wx.showLoading) {
            // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
            wx.showLoading({
                title: message,
                mask: true
            });
        } else {
            // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
            wx.showToast({
                title: message,
                icon: 'loading',
                mask: true,
                duration: 20000
            });
        }
    }

    // 关闭加载框
    hideLoading() {
        if (wx.hideLoading) {
            // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
            wx.hideLoading();
        } else {
            wx.hideToast();
        }
    }


}

export default new Auth();