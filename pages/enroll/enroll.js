// pages/changeVipUserInfo/changeVipUserInfo.js
var config_js = require('../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    console.log(app.globalData)
    if(app.globalData.enroll){
      this.setData({
        'enroll': app.globalData.enroll,
        'vipUserTypes': app.globalData.vipUserTypes,
        'unionCode': app.globalData.unionCode,
        'name': app.globalData.userInfoP.name,
        'tel': app.globalData.userInfoP.tel,
        'addr': app.globalData.userInfoP.address,
        'vipUserType':app.globalData.userInfoP.typ
      })
    }else{
      this.setData({
        'enroll': app.globalData.enroll,
        'vipUserTypes': app.globalData.vipUserTypes,
        'unionCode': app.globalData.unionCode,
        'userInfoP': app.globalData.userInfoP,
        'name': '',
        'tel': '',
        'addr': '',
        'vipUserType':''
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  choiceVipUserType: function(e) {
    this.setData({
      vipUserType:this.data.vipUserTypes[e.detail.value]
    })
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputTel:function(e){
    this.setData({
      tel: e.detail.value
    })
  },
  inputAddr: function (e) {
    this.setData({
      addr: e.detail.value
    })
  },
  checkInfo: function () {
    var that = this;
    if (!that.data.name) {
      that.toast('姓名');
      return 0;
    } else if (!that.data.tel) {
      that.toast('电话');
      return 0;
    } else if (!that.data.addr) {
      that.toast('地址');
      return 0;
    } else if (!that.data.vipUserType) {
      that.toast('用户类别');
      return 0;
    }
    return 1;
  },
  submit: function (e) {
    const app = getApp();
    var that = this;
    if (that.checkInfo()) {
      that.submitInfo();
      app.globalData.haveNewOrder = true;
      wx.navigateBack({})
    }
  },
  toast: function (title) {
    wx.showToast({
      title: title + '为空',
      duration: 1000,
      icon: 'none'
    })
  },
  //提交订单信息
  submitInfo() {
    wx.request({
      url: config_js.basehost + config_js.urlpatterns.enroll,
      data: {
        name:this.data.name,
        tel:this.data.tel,
        addr:this.data.addr,
        vipUserType: this.data.vipUserType,
        unionCode: this.data.unionCode
      },
      method: 'POST',
      header: { "Content-type": config_js.requestHeader },
      success: function (res) {
        if (res.data.status) {
          wx.showToast({
            title: '提交成功，等待审核',
            duration: 2000
          })
        }
      }
    })
  },
})