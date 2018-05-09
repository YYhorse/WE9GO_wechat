var app = getApp()      // 获取入口文件app的应用实例
var tempData = { "status_code": 200, "order_list": [{ "order_id": "20180501001001", "created_at": "2018-05-01 10:00:00", "order_total": "2.6", "order_status": "Finish", "pay_type": "Wechat", "menu_info": [{ "goods_pic": "www.we9pay.com/xx/xx.jpg", "goods_name": "Sprite 250ml", "goods_number": "2", "goods_price": "1.6" }, { "goods_pic": "www.we9pay.com/xx/xx.jpg", "goods_name": "Custard pie", "goods_number": "1", "goods_price": "1.0" }] }, { "order_id": "20180502002002", "created_at": "2018-05-02 10:00:00", "order_total": "2.6", "order_status": "Finish", "pay_type": "Wechat", "menu_info": [{ "goods_pic": "www.we9pay.com/xx/xx.jpg", "goods_name": "Cool 250ml", "goods_number": "2", "goods_price": "1.6" }, { "goods_pic": "www.we9pay.com/xx/xx.jpg", "goods_name": "Custard pie", "goods_number": "1", "goods_price": "1.0" }] }] };
Page({
  data: {
    Order: "",
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: 'My Order' }),
    wx.showLoading({ title: 'Order loading', })

    wx.hideLoading();
    that.setData({ Order: tempData.order_list})
  }
})