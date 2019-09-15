//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    bindDisabled: false,

  },
  onLoad: function () {
    var that = this;
    console.log('onload')
    if(app.globalData.userInfoP){
      console.log('success')
      this.setData({
        bindDisabled: true,
        userInfoP:app.globalData.userInfoP
      })
    }else{
      console.log('false')
      app.userInfoPCallback = userInfoP => {
        if (userInfoP){
          that.setData({
            bindDisabled: true,
            userInfoP: app.globalData.userInfoP
          })
          console.log('success')
        }
      }
    }
    if(app.globalData.userInfo){
      console.log('success')
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else{
      console.log('false')
      app.userInfoCallbackA = userInfo => {
        if (userInfo) {
          that.setData({
            userInfo: app.globalData.userInfo
          })
          console.log('success', userInfo)
        }
      }
    }
  },
  onShow:function(){
    console.log('onshow')
  },
  changeUser: function () {
    wx.navigateTo({
      url: '../enroll/enroll',
    })
  }
})
