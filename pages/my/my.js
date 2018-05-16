var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
    AvatarUrl: "",
    NiceName: "无",
    Point:"(0 points)"
  },
  onLoad: function (options) {
    this.setData({
      AvatarUrl: app.globalData.userInfo.avatarUrl,
      NiceName: app.globalData.userInfo.nickName,
      Point: "(" + app.globalData.integration +" points)"
    })
  },
  点击联系客服:function(e){
    wx.makePhoneCall({ phoneNumber: '98674625' })
  },
  点击意见反馈:function(e){
    wx.navigateTo({ url: '/pages/feedback/feedback' });
  }
})