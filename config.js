// let host = "https://yxfdc.w20.top/";
// let api_host = "https://yxfdc.w20.top/api/v1/";

let host = "http://yxfdc.test/";
let api_host = "http://yxfdc.test/api/v1/";

// let host = "http://a8b8b726d7a1.ngrok.io/";
// let api_host = "http://a8b8b726d7a1.ngrok.io/api/v1/";
let config = {
    host,
    api_host,
    login_url: "swxlogin",
    user: "user", // 要带参数openid,type:post
    upfile: "users/upfile", // 要带参数openid,type:post
    bokers_send_code: "bokers/send_code", // 经纪人认证页面---获取验证码
    bokers_check: "bokers/check", // 经纪人认证页面---后台获取信息认证
    mysql_user: "users/mysql_user", // todo 前端存在bug(清除缓存后已认证经纪人的进入会看到认证经纪人的按钮存在,目前已简单解决)---后台没bug,获取mysql的用户信息---此请求尚未调用
    houses: "houses/index", // 首页楼盘列表信息---获取所有楼盘不管是否参与全民的
    reave: "bokers/reave", // 推荐用户页面
    boker_houses: "houses/boker_houses", // 参与全民经纪人楼盘
    my_client: "bokers/my_client", // 经纪人的客户
    house_show: "houses/show", // 楼盘页面详情
    advs_img: "advs/img", // 首页轮播图
};

module.exports=config;