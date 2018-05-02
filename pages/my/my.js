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
      NiceName: app.globalData.userInfo.nickName
    })
  },
  onShow: function () {
    
  }
})