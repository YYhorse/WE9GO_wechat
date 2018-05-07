//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    AvatarUrl: "",
    NiceName: "Login...",
  },
  onLoad: function () {
    this.获取用户信息();
  },
  获取用户信息: function () {
    var that = this;
    wx.showLoading({ title: '正在登录中' })
    wx.login({
      success: function (res) {
        if (res.code) {
          getApp().globalData.code = res.code;
          console.log('Code=' + res.code);
          wx.getUserInfo({
            success: function (res) {
              getApp().globalData.userInfo = res.userInfo
              if(that.userInfoReadyCallback)  that.userInfoReadyCallback(res)
              console.log(res.userInfo);
              that.setData({
                AvatarUrl: app.globalData.userInfo.avatarUrl,
                NiceName: app.globalData.userInfo.nickName
              })
              wx.hideLoading();
              //that.AutoLogin(res);      //自动登陆
            },
            fail: function () { wx.showToast({ title: "获取信息失败!", }) }
          })
        }
      }
    })
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
