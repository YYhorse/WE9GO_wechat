var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
    OrderId:"",
    OrderInfo: "",
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: 'My Order' })
    this.data.OrderId = options.orderId;
    wx.showLoading({ title: 'Order loading', })
    this.获取订单详情();
  },
  获取订单详情:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetOrderDetailUrl,
      data: { "orderId": that.data.OrderId},
      method: 'GET',
      success: function (Ares) {
        wx.hideLoading();
        console.log(Ares.data);
        if (Ares.statusCode == 200) {
          that.setData({ OrderInfo: Ares.data.order })
        }
        else {
          wx.showModal({
            title: 'Get order detail failure',
            content: 'Interface return：' + Ares.data,
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: 'Get order detail failure',
          content: 'Service Failure',
        })
      }
    })
  }
})