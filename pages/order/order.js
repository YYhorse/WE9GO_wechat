var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
    Order: "",
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: 'My Order' }),
    wx.showLoading({ title: 'Order loading', })
    this.获取订单列表();
  },
  获取订单列表:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetOrderListUrl,
      data: { "userId": getApp().globalData.user_id },
      method: 'GET',
      success: function (Ares) {
        wx.hideLoading();
        console.log(Ares.data);
        if (Ares.statusCode == 200) {
          that.setData({  Order:Ares.data.orders })
        }
        else {
          wx.showModal({
            title: 'Get order failure',
            content: 'Interface return：' + Ares.data,
          })
        }
      },
      fail: function () { 
        wx.hideLoading(); 
        wx.showModal({
          title: 'Get order failure',
          content: 'Service Failure',
        }) 
      }
    })
  },
  ClickOrderMethod:function(e){
    var that = this;
    var Index = e.currentTarget.dataset.numid;
    console.log("订单ID=" + that.data.Order[Index].orderId);
    wx.navigateTo({ url: '/pages/orderdetail/orderdetail?orderId=' + that.data.Order[Index].orderId})
  }
})