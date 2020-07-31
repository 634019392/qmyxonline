// http请求类
export default class Http {
  /**
   * 发起请求
   * @param string url 请求的URL地址
   * @param object data 请求的参数
   * @param string method 请求的HTTP类型
   * @return promise对象  .then来后续操作
   */
  httpReq({ url, token = '', data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        header: {
          'Authorization': 'Bearer '+token
        },
        method,
        success: ret => resolve(ret)
      });
    })
  }
}