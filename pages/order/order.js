// pages/order/order.js
var config_js = require('../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindDisabled: false,
    repairButton:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getButtonContent(serviceStatus){
    var repairButton=''
    if (serviceStatus == '待维修') {
      repairButton = '开始维修'
    } else if (serviceStatus == '维修中') {
      repairButton = '完成维修'
    } else if (serviceStatus == '维修完成') {
      repairButton = '返修'
    }
    console.log('repairButton:', repairButton, 'serviceStatus:', serviceStatus)
    return repairButton
  },
  order:function(orderID){
    var that = this;
    wx.request({
      url: config_js.basehost + config_js.urlpatterns.order,
      method: 'POST',
      header: { "++Content-type": config_js.requestHeader },
      data: {
        orderID: orderID,
        unionCode: app.globalData.unionCode,
        code: app.globalData.code,
      },
      success: function (res) {
        if (res.data.status) {
          var order = res.data.order,
            repairButton = that.data.repairButton
          console.log('order:data', order)
          repairButton = that.getButtonContent(order.serviceStatus)
          that.setData({
            order: res.data.order,
            bindDisabled: true,
            repairButton: repairButton
          })
        }
        if(that.orderCallback){
          console.log('函数回调')
          that.orderCallback(order)
        }
      },
    })
  },
  onLoad: function (options) {
    var that = this
    console.log('order:onLoad')
    var orderID = String(options.orderID)
    this.order(orderID)
    if(!this.data.order){
      this.orderCallback = order => {
        this.setData({
          order:order,
          bindDisabled: true
        })
      }
    }
  },
  onShow:function(){
    console.log('order:onShow')
  },
  repair:function(){
    var that = this,
      order = that.data.order,
      modelContent = ''
    if(order.serviceStatus=='待维修'){
      modelContent = '确认开始维修'
    }else if(order.serviceStatus=='维修中'){
      modelContent = '确认维修完成'
    }else if(order.serviceStatus=='维修完成'){
      modelContent = '确认返修'
    }
    wx.showModal({
      title: '订单维修',
      content: modelContent,
      success:function(res){
        wx.request({
          url: config_js.basehost + config_js.urlpatterns.repair,
          method: 'POST',
          header: { "Content-type": config_js.requestHeader },
          data: {
            orderID: that.data.order.orderID,
            unionCode: app.globalData.unionCode,
            code: app.globalData.code,
          },
          success: function (res) {
            if (res.data.status) {
              var repairButton = ''
              wx.showToast({
                title: res.data.serviceStatus,
                duration: 2000
              })
              order.serviceStatus = res.data.serviceStatus
              repairButton = that.getButtonContent(order.serviceStatus)
              that.setData({
                order: order,
                repairButton: repairButton
              })
            }
          }
        })
      }
    })
  }
})