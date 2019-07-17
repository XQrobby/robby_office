//app.js
var config_js = require('./pages/config.js'),
  funcSeal = require('./pages/funcSeal.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res.code)
        const app = getApp();
        app.globalData.code = res.code;
        wx.request({
          url: config_js.basehost + config_js.urlpatterns.login,
          method: 'POST',
          header: { "Content-type": config_js.requestHeader },
          data: { code: res.code },
          success: function (res) {
            console.log('连接成功', res.data)
            app.globalData.unionCode = res.data.unionCode
            //检验返回信息，确认无误后将个人信息加入全局变量userInfoP
            if (res.data.status == 'none') {
              //确定注册
              app.globalData.vipUserTypes = res.data.vipUserTypes
              wx.showModal({
                title: '用户未注册',
                content: '确定注册?',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/enroll/enroll',
                    })
                  }
                }
              })
              //提交注册信息
            } else {
              app.globalData.userInfoP = res.data.userInfoP
              if (app.userInfoPCallback){
                app.userInfoPCallback(app.globalData.userInfoP)
              }
            }
          },
          fail: function () {
            funcSeal.toast('服务器连接失败')
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getclientInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getclientInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    vipUserTypes: null,
  }
})