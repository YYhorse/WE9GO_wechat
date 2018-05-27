var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
    AvatarUrl: "",
    NiceName: "无",
    Point:"(0 points)"
  },
  onShow:function(){
    if (app.globalData.userInfo == null) {
      wx.switchTab({ url: '/pages/index/index' })
    }
    else {
      this.setData({
        AvatarUrl: app.globalData.userInfo.avatarUrl,
        NiceName: app.globalData.userInfo.nickName,
        Point: "(" + app.globalData.integration + " points)"
      })
    }
  },
  点击联系客服:function(e){
    wx.makePhoneCall({ phoneNumber: '98674625' })
  },
  点击意见反馈:function(e){
    wx.navigateTo({ url: '/pages/feedback/feedback' });
  },
  点击我的订单:function(e){
    wx.navigateTo({ url: '/pages/order/order'});
  },
  点击我的面部:function(e){
    wx.navigateTo({ url: '/pages/myface/myface' });
  },
  点击积分商城:function(e){
    wx.showModal({
      title: 'Development',
      content: 'The function will be open immediately',
    })
  }
})