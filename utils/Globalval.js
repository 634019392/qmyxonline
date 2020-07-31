// 缓存类
import cache from './Cache.js';

let config = require('../config');
let app = getApp();

// 全局函数不可以在onLoad中执行
class Globalval {
    getCache() {
        app.globalData = {
            userInfo: {
                openid: cache.get('openid'),
                session_key: cache.get('session_id'),
            }
        }
    }
}

export default new Globalval();