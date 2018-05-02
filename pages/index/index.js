//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  
  },
  onLoad: function () {
    this.获取用户信息();
  },
  获取用户信息:function(){
    if (app.globalData.userInfo) {
      this.setData({  userInfo: app.globalData.userInfo })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({  userInfo: res.userInfo  })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({  userInfo: res.userInfo  })
        }
      })
    }
  },
  点击开门:function(e){
    wx.showModal({
      title: 'Open the door?',
      content: 'Please confirm whether to open the door and settle',
      confirmText:'Ok',
      cancelText:'Cancel',
      success:function(res){
        if(res.confirm){
          //用户点击确认
          wx.showToast({
            title: 'Welcome!',
          })
        }
      }
    })
  }
})
